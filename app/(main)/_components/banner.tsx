"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { useNavigationContext } from "@/contexts/navigation-context";
import { useEditorContext } from "@/contexts/editor-context";


export const Banner = () => {
  const { notesClient, onUpdateNavigationDocumentsItems } = useNavigationContext();
  const { activeDocument, setActiveDocument } = useEditorContext();
  const router = useRouter();

  const onRemove = () => {
    if (!notesClient || !activeDocument) return;

    const promise = notesClient.deleteNote(activeDocument.id);
    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note deleted!",
      error: "Failed to delete note.",
    });

    router.push("/documents");
  };

  const onRestore = () => {
    if (!notesClient || !activeDocument) return;

    const promise = notesClient.restoreNote(activeDocument.id).then((id) => {
      onUpdateNavigationDocumentsItems(id);
      setActiveDocument({
        ...activeDocument,
        isArchived: false,
      });
    });
    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note restored!",
      error: "Failed to restore note.",
    });
  };

  return (
    <div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
      <p>This page is in the Trash.</p>
      <Button
        size="sm"
        onClick={onRestore}
        variant="outline"
        className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
      >
        Restore page
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button
          size="sm"
          variant="outline"
          className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
        >
          Delete forever
        </Button>
      </ConfirmModal>
    </div>
  );
};
