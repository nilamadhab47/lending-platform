import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "siamoragra@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "admin",
        },
      },
      async authorize(credentials) {
        const user = { id: "01", name: "admin", password: "admin" };

        if (
          credentials?.username === user.name &&
          credentials?.password === user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],

   pages: {
    signIn: "/auth/login"
   }
};
