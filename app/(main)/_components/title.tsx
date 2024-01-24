"use client";

import { useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useEditorContext } from "@/contexts/editor-context";

export const Title = () => {
  const { activeDocument, setActiveDocument } = useEditorContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState(activeDocument?.title || "Untitled");
  const [isEditing, setIsEditing] = useState(false);

  const enableInput = () => {
    if (!activeDocument) return;

    if (activeDocument.isArchived) {
      setIsEditing(false);
      return;
    }

    if (isEditing) return;

    setTitle(activeDocument.title);
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    }, 0);
  };

  const disableInput = () => {
    setIsEditing(false);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!activeDocument) return;

    const value = event.target.value || "Untitled";
    setTitle(value);
    setActiveDocument({
      ...activeDocument,
      title: value,
    });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      disableInput();
    }
  };

  if (!activeDocument) {
    return <Title.Skeleton />;
  }

  return (
    <div className="flex items-center gap-x-1">
      {!!activeDocument.icon && <p>{activeDocument.icon}</p>}
      {isEditing ? (
        <Input
          ref={inputRef}
          onClick={enableInput}
          onBlur={disableInput}
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={title}
          className="h-7 px-2 focus-visible:ring-transparent"
        />
      ) : (
        <Button
          onClick={enableInput}
          variant="ghost"
          size="sm"
          className="font-normal h-auto p-1"
        >
          <span className="truncate">{activeDocument.title}</span>
        </Button>
      )}
    </div>
  );
};

Title.Skeleton = function TitleSkeleton() {
  return <Skeleton className="h-9 w-20 rounded-md" />;
};
