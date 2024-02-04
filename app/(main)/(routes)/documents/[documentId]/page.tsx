"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

import { Toolbar } from "@/components/toolbar";
import { Cover } from "@/components/cover";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigationContext } from "@/contexts/navigation-context";
import { useEditorContext } from "@/contexts/editor-context";
import { debouncedSetEditorKey } from "@/lib/utils";

interface DocumentIdPageProps {
  params: {
    documentId: string;
  };
};

const DocumentIdPage = ({
  params
}: DocumentIdPageProps) => {
  const { activeDocument, setActiveDocument } = useEditorContext();
  const [editorKey, setEditorKey] = useState(0);
  const Editor = useMemo(
    () => dynamic(() => import("@/components/editor"), { ssr: false }),
    [editorKey]
  );
  const { notesClient } = useNavigationContext();

  useEffect(() => {
    debouncedSetEditorKey(setEditorKey);
  }, [activeDocument?.icon, activeDocument?.title]);
  
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
  };

  const onIconSelect = (icon: string) => {
    if (!activeDocument) return;

    setActiveDocument({
      ...activeDocument,
      icon,
    });
  };

  const onRemoveIcon = () => {
    if (!activeDocument) return;

    setActiveDocument({
      ...activeDocument,
      icon: undefined,
    });
  };

  const onTitleChange = (title: string) => {
    if (!activeDocument) return;
    setActiveDocument({
      ...activeDocument,
      title,
    });
  };

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
      <Cover
        url={activeDocument.coverImage}
        onRemoveCoverImage={onRemoveCoverImage}
        preview={activeDocument.isArchived}
      />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar
          preview={activeDocument.isArchived}
          initialData={activeDocument}
          onIconSelect={onIconSelect}
          onRemoveIcon={onRemoveIcon}
          onTitleChange={onTitleChange}
        />
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
