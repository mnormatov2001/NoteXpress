"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Search, Trash, Undo } from "lucide-react";
import { toast } from "sonner";

import { Spinner } from "@/components/spinner";
import { Input } from "@/components/ui/input";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Note } from '@/lib/notes-client'
import { useNavigationContext } from '@/contexts/navigation-context'

export const TrashBox = () => {
  const { notesClient, onUpdateNavigationDocumentsItems } = useNavigationContext();
  const [trashDocuments, setTrashDocuments] = useState<Note[]>();
  const router = useRouter();
  const params = useParams();
  const [search, setSearch] = useState("");

  const filteredDocuments = trashDocuments?.filter((document) => {
    return document.title.toLowerCase().includes(search.toLowerCase());
  });

  useEffect(() => {
    notesClient?.getNotesTrash().then(setTrashDocuments);
  }, [notesClient]);

  const onClick = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  const onRestore = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: string
  ) => {
    event.stopPropagation();
    if (!notesClient) return;

    const recursiveRemove = (items: Note[], idToDelete: string) => {
      const index = items.findIndex((n) => n.id === idToDelete);
      if (index < 0) return;

      items.splice(index, 1);
      const toDelete = items.filter((item) => item.parentNoteId === idToDelete);
      for (const note of toDelete) {
        recursiveRemove(items, note.id);
      }
    };

    const promise = notesClient.restoreNote(documentId).then((id) => {
      if (trashDocuments) {
        const newDocuments = [...trashDocuments];
        recursiveRemove(newDocuments, id);
        setTrashDocuments(newDocuments);
      }

      onUpdateNavigationDocumentsItems(id);
    });
    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note restored!",
      error: " Failed to restore note.",
    });
  };

  const onRemove = (documentId: string) => {
    if (!notesClient) return;

    const promise = notesClient.deleteNote(documentId).then((id) => {
      const newDocuments = trashDocuments?.filter((d) => d.id !== id);
      setTrashDocuments(newDocuments);
    });

    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note deleted!",
      error: " Failed to delete note.",
    });

    if (params.documentId === documentId) {
      router.push("/documents");
    }
  };

  if (trashDocuments === undefined) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="text-sm">
      <div className="flex items-center gap-x-1 p-2">
        <Search className="h-4 w-4" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
          placeholder="Filter by page title..."
        />
      </div>
      <div className="mt-2 px-1 pb-1">
        <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
          No documents found.
        </p>
        {filteredDocuments?.map((document) => (
          <div
            key={document.id}
            role="button"
            onClick={() => onClick(document.id)}
            className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between"
          >
            <span className="truncate pl-2">
              {document.title}
            </span>
            <div className="flex items-center">
              <div
                onClick={(e) => onRestore(e, document.id)}
                role="button"
                className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
              >
                <Undo className="h-4 w-4 text-muted-foreground" />
              </div>
              <ConfirmModal onConfirm={() => onRemove(document.id)}>
                <div
                  role="button"
                  className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                >
                  <Trash className="h-4 w-4 text-muted-foreground" />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
