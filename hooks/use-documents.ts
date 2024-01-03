import { Document } from "@/lib/data-models";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function useDocuments(): [
  "loading" | "ready" | "failed",
  (parentDocumentId?: string) => Promise<Document[] | undefined>
] {
  const session = useSession();
  const [status, setStatus] = useState<"loading" | "ready" | "failed">(
    "loading"
  );

  useEffect(() => {
    if (session?.data?.accessToken) {
      setStatus("ready");
    } else if (session.status === "loading") {
      setStatus("loading");
    } else {
      setStatus("failed");
    }
  }, [session.status]);

  async function getChildren(parentDocumentId?: string) {
    if (!session?.data?.accessToken) {
      return undefined;
    }
    const param = parentDocumentId
      ? parentDocumentId
      : "00000000-0000-0000-0000-000000000000";
    const res = await fetch(
      `https://localhost:7090/notes/children?parentNoteId=${param}`,
      {
        headers: {
          Authorization: "Bearer " + session.data.accessToken,
        },
      }
    ); // TODO: Move to a separate api function
    const data = await res.json();
    console.log(data);
    return data as Document[];
  }

  console.log("STATUS: ", status);
  console.log("SESSION: ", session);

  return [status, getChildren];
}
