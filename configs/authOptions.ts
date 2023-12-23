import { AuthOptions } from "next-auth";
import Auth0 from "next-auth/providers/auth0";

export const authOptions: AuthOptions = {
  providers: [
    Auth0({
      clientId: "notes-app-client",
      clientSecret: "2RxPARYpxK3sVCws3CIS9vwgUpp3ImXWBjRT/OJJApc=",
      authorization: {
        params: {
          client_id: "notes-app-client",
          audience: "notes.app.webApi",
          scope: "notes.app.webApi offline_access openid profile",
          response_type: "code",
        },
      },
      name: "my_auth0",
      issuer: "https://localhost:7291",
    }),
  ],
  debug: true,
  callbacks: {
    jwt: async ({ token, account }) => {
      if (account) {
        token.id_token = account.id_token;
        token.refresh_token = account.refresh_token;
      }

      return token;
    },
  },
  pages: {
    signIn: "/",
    signOut: "/",
  }
};
