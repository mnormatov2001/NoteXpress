"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useNavigationContext } from '@/contexts/navigation-context'


const DocumentsPage = () => {
  const router = useRouter();
  const { notesClient, onUpdateNavigationDocumentsItems } =
    useNavigationContext();

  const handleCreate = () => {
    if (!notesClient) return;
    const promise = notesClient.createNote({
        title: "Untitled",
      }).then((id) => {
        onUpdateNavigationDocumentsItems(id);
        router.push(`/documents/${id}`)
      });

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note.",
    });
  };

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src="/empty.png"
        height="300"
        width="300"
        alt="Empty"
        className="dark:hidden"
      />
      <Image
        src="/empty-dark.png"
        height="300"
        width="300"
        alt="Empty"
        className="hidden dark:block"
      />
      <h2 className="text-lg font-medium">
        Welcome to NoteXpress
      </h2>
      <Button onClick={handleCreate}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Create a note
      </Button>
    </div>
   );
};
 
export default DocumentsPage;
