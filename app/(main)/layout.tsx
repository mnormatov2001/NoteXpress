"use client";

import { useEffect, useState } from "react";
import { Navigation } from "./_components/navigation";
import { Note, NotesClient } from "@/lib/notes-client";
import { NavigationContextProvider } from "@/contexts/navigation-context";
import { EditorContextProvider } from "@/contexts/editor-context";
import { useParams, useRouter } from "next/navigation";
import { CoverImageModal } from "@/components/modals/cover-image-modal";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [notesClient, setNotesClient] = useState<NotesClient>();
  const router = useRouter();
  const params = useParams();
  const activeDocumentId = params.documentId as string;
  const [navigationDocuments, setNavigationDocuments] = useState<Note[]>();
  const [activeDocument, setActiveDocument] = useState<Note>();

  useEffect(() => {
    setNotesClient(new NotesClient(process.env.NEXT_PUBLIC_API_URL));
  }, []);

  useEffect(() => {
    if (!activeDocumentId) {
      return;
    }

    notesClient?.getNote(activeDocumentId).then(setActiveDocument);
  }, [notesClient, activeDocumentId]);

  const refetchActiveDocument = () => {
    if (!notesClient || !activeDocumentId) return;
    
    notesClient.getNote(activeDocumentId).then((note) => {
      setActiveDocument(note);
      const items = navigationDocuments?.filter((d) => d.id !== note.id);
      setNavigationDocuments(items ? [...items, note] : [note]);
    });
  };

  const onSetActiveDocument = (note: Note) => {
    setActiveDocument(note);
    const items = navigationDocuments?.filter((item) => item.id !== note.id);
    setNavigationDocuments(items ? [...items, note] : [note]);
    notesClient?.debouncedUpdateNote(note);
  };

  const handleUpdateNavigationDocumentsItems = (
    id: string = "00000000-0000-0000-0000-000000000000"
  ) => {
    if (id === "00000000-0000-0000-0000-000000000000") {
      notesClient?.getAllNotes().then(setNavigationDocuments);
      return;
    }

    if (!navigationDocuments) return;

    const newDocuments = [...navigationDocuments];
    recursiveRemoveNotes(newDocuments, id);
    if (!notesClient) {
      setNavigationDocuments(newDocuments);
    } else {
      notesClient?.getNote(id).then((note) => {
        if (!note || note.isArchived === true) {
          setNavigationDocuments(newDocuments);
        } else {
          notesClient.getChildren(note.id).then((notes) => {
            setNavigationDocuments([...newDocuments, note, ...notes]);
          });
        }
      });
    }
  };

  const recursiveRemoveNotes = (items: Note[], idToDelete: string) => {
    const index = items.findIndex((n) => n.id === idToDelete);
    if (index < 0) return;

    items.splice(index, 1);
    const toDelete = items.filter((note) => note.parentNoteId === idToDelete);
    for (const note of toDelete) {
      recursiveRemoveNotes(items, note.id);
    }
  };

  const onChangeCoverImage = (url: string) => {
    if (!activeDocument) return;

    onSetActiveDocument({
      ...activeDocument,
      coverImage: url,
    });
  };

  return (
    <>
      {notesClient && activeDocument && (
        <CoverImageModal onChangeCoverImage={onChangeCoverImage} />
      )}
      <NavigationContextProvider
        value={{
          notesClient,
          navigationDocuments,
          setNavigationDocuments,
          onUpdateNavigationDocumentsItems:
            handleUpdateNavigationDocumentsItems,
        }}
      >
        <EditorContextProvider
          value={{
            activeDocument,
            setActiveDocument: onSetActiveDocument,
            refetchActiveDocument,
          }}
        >
          <div className="h-full flex dark:bg-[#1F1F1F]">
            <Navigation />
            <main className="flex-1 h-full overflow-y-auto">{children}</main>
          </div>
        </EditorContextProvider>
      </NavigationContextProvider>
    </>
  );
};

export default MainLayout;
