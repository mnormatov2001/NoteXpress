import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (token?.refreshToken) {
      await fetch(process.env.TOKEN_REVOKATION_ENDPOINT!, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: process.env.CLIENT_ID!,
          token_type_hint: "refresh_token",
          token: token.refreshToken,
        }),
        method: "POST",
      });
    }

    if (!token?.idToken) {
      throw new Error(
        "Without an id_token the user won't be" +
        "redirected back from the IdP after logout."
      );
    } else if (token.idToken) {
      const url =
        process.env.END_SESSION_ENDPOINT +
        "?id_token_hint=" +
        token.idToken +
        "&post_logout_redirect_uri=" +
        process.env.POST_LOGOUT_REDIRECT_URI;

      return NextResponse.redirect(url);
    }
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(process.env.NEXTAUTH_URL!);
  }
}

export const dynamic = "force-dynamic";
