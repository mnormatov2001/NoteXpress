"use client";

import { Button } from "@/components/ui/button";
import { signIn, useSession, signOut } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const session = useSession();
  console.log(session);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  return (
    <>
      <h1 className="text-4xl text-center p-4 m-4">Home Page</h1>
      <div className="container mx-auto">
        <div className="flex justify-center">
          <Button
            variant="default"
            onClick={() => signIn("auth0", { callbackUrl, redirect: true })}
            //className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign In
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              router.push("/api/auth/federated-logout");
              signOut({ redirect: false, callbackUrl: "/" });
            }}
            //className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign out
          </Button>
        </div>
      </div>
    </>
  );
}
