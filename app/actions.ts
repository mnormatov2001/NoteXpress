"use server";

import { Session } from "next-auth";

export async function federatedLogout(session: Session) {
  try {
    if (session.refreshToken) {
      await fetch(process.env.TOKEN_REVOKATION_ENDPOINT!, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: process.env.CLIENT_ID!,
          token_type_hint: "refresh_token",
          token: session.refreshToken,
        }),
        method: "POST",
      });
    }

    if (!session.idToken) {
      throw new Error(
        "Without an id_token the user won't be" +
        "redirected back from the IdP after logout."
      );
    } else if (session.idToken) {
      const url =
        process.env.END_SESSION_ENDPOINT +
        "?id_token_hint=" +
        session.idToken +
        "&post_logout_redirect_uri=" +
        process.env.POST_LOGOUT_REDIRECT_URI;
      
      return url;
    }
  } catch (error) {
    console.error(error);
  }
};
