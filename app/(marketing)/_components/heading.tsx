"use client";

import { signIn, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Heading = () => {
  const session = useSession();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/documents";

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your Ideas, Documents, & Plans. Unified. Welcome to{" "}
        <span className="underline">NoteXpress</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Jotion is the connected workspace where <br />
        better, faster work happens.
      </h3>
      {session.status === "loading" && (
        <div className="w-full flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}
      {session.status === "authenticated" && (
        <Button asChild>
          <Link href="/documents">
            Enter NoteXpress
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      )}
      {session.status === "unauthenticated" && (
        <Button
          onClick={() => signIn("auth0", { callbackUrl, redirect: false })}
        >
          Get NoteXpress free
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      )}
    </div>
  );
};
