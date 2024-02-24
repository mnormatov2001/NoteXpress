import { AuthOptions } from "next-auth";
import type { JWT } from "next-auth/jwt";
import Auth0 from "next-auth/providers/auth0";
import { Mutex } from "async-mutex";

const mutex = new Mutex();
let lastRefreshedToken: JWT | undefined = undefined;

export const authOptions: AuthOptions = {
  providers: [
    Auth0({
      clientId: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
      authorization: {
        params: {
          client_id: process.env.CLIENT_ID,
          audience: process.env.AUDIENCE,
          scope: process.env.SCOPE,
          response_type: "code",
        },
      },
      issuer: process.env.IDP_URL,
      profile(profile, tokens) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.preferred_username,
        };
      },
    }),
  ],
  debug: false,
  callbacks: {
    jwt: async ({ token, account, user }) => {
      const release = await mutex.acquire();

      if (account) {
        token.idToken = account.id_token!;
        token.accessToken = account.access_token!;
        token.refreshToken = account.refresh_token!;
        token.accessTokenExpires = account.expires_at! * 1000;
        token.user = user;
      }

      if (Date.now() < token.accessTokenExpires) {
        console.log("RETURNED INCOMING TOKEN FROM JWT CALLBACK!");
        release();
        return token;
      }

      if (
        lastRefreshedToken &&
        (Date.now() < lastRefreshedToken.accessTokenExpires || lastRefreshedToken.error)
      ) {
        console.log("RETURNED LAST REFRESHED TOKEN FROM JWT CALLBACK!");
        release();
        return lastRefreshedToken;
      }

      lastRefreshedToken = await refreshAccessToken(token);
      release();
      return lastRefreshedToken;
    },
    session: ({ session, user, token }) => {
      session.accessToken = token.accessToken;
      session.idToken = token.idToken;
      session.refreshToken = token.refreshToken;
      session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: "/",
    signOut: "/",
  },
};

async function refreshAccessToken(token: JWT) {
  console.log("REFRESHING ACCESS TOKEN !!!");
  console.log("SENDING REFRESH TOKEN: ", token.refreshToken);
  try {
    const response = await fetch(process.env.TOKEN_ENDPOINT!, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.CLIENT_ID!,
        client_secret: process.env.CLIENT_SECRET!,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      }),
      method: "POST",
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    console.log("ACCESS TOKEN SUCCESSFULLY REFRESHED !!!");

    return {
      ...token,
      idToken: refreshedTokens.id_token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token,
    } as JWT;
  } catch (error) {
    console.log("FAILED TO REFRESH ACCESS TOKEN\n", error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    } as JWT;
  }
}
