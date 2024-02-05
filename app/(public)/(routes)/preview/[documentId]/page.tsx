"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

import { Cover } from "@/components/cover";
import { Skeleton } from "@/components/ui/skeleton";
import { Note, NotesClient } from "@/lib/notes-client";
import { Toolbar } from "@/components/toolbar";

interface DocumentIdPageProps {
  params: {
    documentId: string;
  };
};

const DocumentIdPage = ({
  params
}: DocumentIdPageProps) => {
  const Editor = useMemo(() => dynamic(() => import("@/components/editor"), { ssr: false }) ,[]);
  const [notesClient, setNotesClient] = useState<NotesClient>();
  const [document, setDocument] = useState<Note | null | undefined>(undefined);

  useEffect(() => {
    setNotesClient(new NotesClient(process.env.NEXT_PUBLIC_API_URL));
  }, []);

  useEffect(() => {
    notesClient?.getPublicNote(params.documentId)
      .then(setDocument)
      .catch(() => setDocument(null));
  }, [notesClient, params.documentId]);

  if (document === undefined) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }

  if (document === null) {
    return <div>Not found</div>
  }

  return (
    <div className="pb-40">
      <Cover preview url={document.coverImage} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar
          preview
          initialData={document}
        />
        <Editor editable={false} initialContent={document.content} />
      </div>
    </div>
  );
};
 
export default DocumentIdPage;
