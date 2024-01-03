"use client";

import type { Document } from "@/lib/data-models";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Item } from "./item";
import { FileIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDocuments } from "@/hooks/use-documents";

interface DocumentListProps {
  parentDocumentId?: string;
  level?: number;
  data?: Document;
}

export const DocumentsList = ({
  parentDocumentId,
  level = 0,
}: DocumentListProps) => {
  const params = useParams();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [status, getChildren] = useDocuments();
  const [documents, setDocuments] = useState<Document[]>();
  const [updated, setUpdated] = useState(false); // TODO: Implement updating documents list

  useEffect(() => {
    if (!documents && status === "ready") {
      getChildren(parentDocumentId).then(setDocuments);
    }
  }, [status, parentDocumentId]);

  const onExpand = (documentId: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }));
  };

  if (documents === undefined) {
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
      {documents.map((document) => (
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
            <DocumentsList parentDocumentId={document.id} level={level + 1} />
          )}
        </div>
      ))}
    </>
  );
};
