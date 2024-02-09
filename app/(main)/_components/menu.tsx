"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MoreHorizontal, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigationContext } from "@/contexts/navigation-context";
import { useEditorContext } from "@/contexts/editor-context";

export const Menu = () => {
  const { notesClient, navigationDocuments, setNavigationDocuments } = useNavigationContext();
  const { activeDocument } = useEditorContext();
  const router = useRouter();

  const onArchive = () => {
    if (!notesClient || !activeDocument) return;

    const promise = notesClient.archiveNote(activeDocument.id).then((id) => {
      setNavigationDocuments(navigationDocuments?.filter((item) => item.id !== id));
    });
    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Note moved to trash!",
      error: "Failed to archive note.",
    });

    router.push("/documents");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60"
        align="end"
        alignOffset={8}
        forceMount
      >
        <DropdownMenuItem onClick={onArchive}>
          <Trash className="h-4 w-4 mr-2" />
          Delete
        </DropdownMenuItem>
        {activeDocument?.creationDate && activeDocument.editDate && (
          <div>
            <DropdownMenuSeparator />
            <div className="text-xs text-muted-foreground px-2 pt-2 pb-1">
              Created:{" "}
              {new Date(activeDocument.creationDate).toLocaleString(
                undefined,
                {
                  dateStyle: "short",
                  timeStyle: "medium",
                }
              )}
            </div>
            <div className="text-xs text-muted-foreground px-2 pb-2">
              Last edited:{" "}
              {new Date(activeDocument.editDate).toLocaleString(undefined, {
                dateStyle: "short",
                timeStyle: "medium",
              })}
            </div>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

Menu.Skeleton = function MenuSkeleton() {
  return <Skeleton className="h-10 w-10" />;
};
