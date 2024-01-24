"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

import { Toolbar } from "@/components/toolbar";
import { Cover } from "@/components/cover";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigationContext } from "@/contexts/navigation-context";
import { useEditorContext } from "@/contexts/editor-context";

interface DocumentIdPageProps {
  params: {
    documentId: string;
  };
};

const DocumentIdPage = ({
  params
}: DocumentIdPageProps) => {
  const { activeDocument, setActiveDocument } = useEditorContext();
  const Editor = useMemo(() => dynamic(() => import("@/components/editor"), { ssr: false }) ,[]);
  const { notesClient } = useNavigationContext();
  
  const onChange = (content: string) => {
    if (!activeDocument) return;

    setActiveDocument({
      ...activeDocument,
      content,
    });
  };

  const onRemoveCoverImage = () => {
    if (!activeDocument) return;

    setActiveDocument({
      ...activeDocument,
      coverImage: undefined,
    });
  }

  if (!notesClient || activeDocument === undefined) {
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

  if (activeDocument === null) {
    return <div>Not found</div>
  }

  return (
    <div className="pb-40">
      <Cover url={activeDocument.coverImage} onRemoveCoverImage={onRemoveCoverImage} preview={activeDocument.isArchived} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar preview={activeDocument.isArchived} />
        <Editor
          editable={!activeDocument.isArchived}
          onChange={onChange}
          initialContent={activeDocument.content}
        />
      </div>
    </div>
   );
}
 
export default DocumentIdPage;
