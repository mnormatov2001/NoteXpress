"use client";

import { useParams } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Item } from "./item";
import { FileIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Note, NotesClient } from "@/lib/notes-client";

interface DocumentListProps {
  parentDocumentId?: string;
  level?: number;
  data?: Document;
  client: NotesClient;
  items: Record<string, Note[]>;
  setItems: Dispatch<SetStateAction<Record<string, Note[]>>>;
}

export const DocumentsList = ({
  parentDocumentId = "00000000-0000-0000-0000-000000000000",
  level = 0,
  client,
  items,
  setItems,
}: DocumentListProps) => {
  const params = useParams();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [updated, setUpdated] = useState(false); // TODO: Implement updating documents list

  useEffect(() => {
    if (!items[parentDocumentId] && client) {
      client.getChildren(parentDocumentId).then((res) => {
        setItems((prevItems) => ({
          ...prevItems,
          [parentDocumentId]: res,
        }));
      });
    }
  }, []);

  const onExpand = (documentId: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }));
  };

  if (!items[parentDocumentId]) {
    return (
      <>
        <Item.Skeleton level={level} />
        {level === 0 && (
          <>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </>
        )}
      </>
    );
  }

  return (
    <>
      <p
        style={{
          paddingLeft: level ? `${level * 12 + 25}px` : undefined,
        }}
        className={cn(
          "hidden text-sm font-medium text-muted-foreground/80",
          expanded && "last:block",
          level === 0 && "hidden"
        )}
      >
        No pages inside
      </p>
      {items[parentDocumentId].map((document) => (
        <div key={document.id}>
          <Item
            id={document.id}
            onClick={() => {}} // TODO: Implement redirecting to document's page
            label={document.title}
            icon={FileIcon}
            documentIcon={document.icon}
            active={params.documentId === document.id}
            level={level}
            onExpand={() => onExpand(document.id)}
            expanded={expanded[document.id]}
          />
          {expanded[document.id] && (
            <DocumentsList
              items={items}
              setItems={setItems}
              client={client}
              parentDocumentId={document.id}
              level={level + 1}
            />
          )}
        </div>
      ))}
    </>
  );
};
