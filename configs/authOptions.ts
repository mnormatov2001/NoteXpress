import { AuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import Auth0 from "next-auth/providers/auth0";

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
      name: "my_auth0",
      issuer: "https://localhost:7291",
    }),
  ],
  debug: true,
  callbacks: {
    jwt: async ({ token, account, user }) => {
      if (account) {
        token.idToken = account.id_token!;
        token.accessToken = account.access_token!;
        token.refreshToken = account.refresh_token!;
        token.accessTokenExpires = account.expires_at! * 1000;
        token.user = user;
      }

      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      return await refreshAccessToken(token);
    },
    session: ({ session, user, token }) => {
      session.accessToken = token.accessToken;
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

    console.log("REFRESHED !!!");

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
