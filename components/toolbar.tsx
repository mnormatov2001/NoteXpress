"use client";

import { ElementRef, useRef, useState } from "react";
import { ImageIcon, Smile, X } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";

import { useCoverImage } from "@/hooks/use-cover-image";
import { Button } from "@/components/ui/button";
import { IconPicker } from "./icon-picker";
import { useEditorContext } from "@/contexts/editor-context";

interface ToolbarProps {
  preview?: boolean;
}

export function Toolbar({ preview }: ToolbarProps) {
  const inputRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { activeDocument, setActiveDocument } = useEditorContext();
  const [title, setTitle] = useState(activeDocument?.title || "Untitled");
  const coverImage = useCoverImage();

  const enableInput = () => {
    if (preview) return;

    setIsEditing(true);
    setTimeout(() => {
      setTitle(activeDocument?.title || "Untitled");
      inputRef.current?.focus();
    }, 0);
  };

  const disableInput = () => setIsEditing(false);

  const onInputTitle = (value: string) => {
    if (!activeDocument) return;

    setTitle(value);
    setActiveDocument({
      ...activeDocument,
      title: value || "Untitled",
    });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      disableInput();
    }
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

  if (!activeDocument) {
    return;
  }

  return (
    <div className="pl-[54px] group relative">
      {!!activeDocument.icon && !preview && (
        <div className="flex items-center gap-x-2 group/icon pt-6">
          <IconPicker onChange={onIconSelect}>
            <p className="text-6xl hover:opacity-75 transition">
              {activeDocument.icon}
            </p>
          </IconPicker>
          <Button
            onClick={onRemoveIcon}
            className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs"
            variant="outline"
            size="icon"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      {!!activeDocument.icon && preview && (
        <p className="text-6xl pt-6">{activeDocument.icon}</p>
      )}
      <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
        {!activeDocument.icon && !preview && (
          <IconPicker asChild onChange={onIconSelect}>
            <Button
              className="text-muted-foreground text-xs"
              variant="outline"
              size="sm"
            >
              <Smile className="h-4 w-4 mr-2" />
              Add icon
            </Button>
          </IconPicker>
        )}
        {!activeDocument.coverImage && !preview && (
          <Button
            onClick={coverImage.onOpen}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Add cover
          </Button>
        )}
      </div>
      {isEditing && !preview ? (
        <TextareaAutosize
          ref={inputRef}
          onBlur={disableInput}
          onKeyDown={onKeyDown}
          value={title}
          onChange={(e) => onInputTitle(e.target.value)}
          className="text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none"
        />
      ) : (
        <div
          onClick={enableInput}
          className="pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF]"
        >
          {activeDocument.title}
        </div>
      )}
    </div>
  );
}
