"use client";

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
          <button
            onClick={() => signIn("auth0", { callbackUrl, redirect: true })}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign In
          </button>
          <button
            onClick={() => {
              router.push("/api/auth/federated-logout");
              signOut({ redirect: false, callbackUrl: "/" });
            }}
            className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign out
          </button>
        </div>
      </div>
    </>
  );
}
