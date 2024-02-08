"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import { useScrollTop } from "@/hooks/use-scroll-top";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";
import { federatedLogout } from "@/app/actions";

export const Navbar = () => {
  const router = useRouter();
  const session = useSession();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/documents";
  const scrolled = useScrollTop();

  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6",
        scrolled && "border-b shadow-sm"
      )}
    >
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {session.status === "loading" && <Spinner />}
        {session.status === "unauthenticated" && (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => signIn("auth0", { callbackUrl, redirect: false })}
            >
              Log in
            </Button>
            <Button
              size="sm"
              onClick={() => signIn("auth0", { callbackUrl, redirect: false })}
            >
              Get NoteXpress free
            </Button>
          </>
        )}
        {session.status === "authenticated" && (
          <>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/documents">Enter NoteXpress</Link>
            </Button>
            <Button
              size="sm"
              onClick={async () => {
                const logoutUrl = await federatedLogout(session.data);
                await signOut({ callbackUrl: "/", redirect: false });
                router.push(logoutUrl || "/");
              }}
            >
              Sing Out
            </Button>
            {/* <UserButton
              afterSignOutUrl="/"
            /> */}
          </>
        )}
        <ModeToggle />
      </div>
    </div>
  );
};
