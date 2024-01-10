"use client";

import { useParams, useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Item } from "./item";
import { FileIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Note, NotesClient } from "@/lib/notes-client";

interface DocumentListProps {
  parentDocumentId?: string;
  level?: number;
  data?: Note;
  client: NotesClient;
  documents?: Note[];
  setDocuments: Dispatch<SetStateAction<Note[] | undefined>>;
  onUpdateItems?: (id: string) => void;
}

export const DocumentsList = ({
  parentDocumentId = "00000000-0000-0000-0000-000000000000",
  level = 0,
  client,
  documents,
  setDocuments,
  onUpdateItems,
}: DocumentListProps) => {
  const router = useRouter();
  const params = useParams();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [updated, setUpdated] = useState(false); // TODO: Implement updating documents list
  const [items, setItems] = useState<Note[]>();

  useEffect(() => {
    if (!documents?.some((d) => d.parentNoteId === parentDocumentId)) {
      client.getChildren(parentDocumentId).then((notes) => {
        setDocuments((prevDocuments) => (
          prevDocuments ? [...prevDocuments, ...notes] : notes
        ))
      })
    }
  }, []);

  useEffect(() => {
    const array = documents
      ?.filter((d) => d.parentNoteId === parentDocumentId)
      .sort((a, b) => (a.creationDate < b.creationDate ? -1 : 1));
    setItems(array);
  }, [documents]);

  const onExpand = (documentId: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }));
  };

  if (!items) {
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
      {items.map((document) => (
        <div key={document.id}>
          <Item
            id={document.id}
            onClick={() => {router.push(`/documents/${document.id}`)}}
            label={document.title}
            icon={FileIcon}
            documentIcon={document.icon}
            active={params.documentId === document.id}
            level={level}
            onExpand={() => onExpand(document.id)}
            expanded={expanded[document.id]}
            client={client}
            onUpdateItems={onUpdateItems}
          />
          {expanded[document.id] && (
            <DocumentsList
              client={client}
              parentDocumentId={document.id}
              level={level + 1}
              documents={documents}
              setDocuments={setDocuments}
              onUpdateItems={onUpdateItems}
            />
          )}
        </div>
      ))}
    </>
  );
};
