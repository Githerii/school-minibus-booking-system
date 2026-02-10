import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import type { NextAuthOptions } from "next-auth"
// import GoogleProvider from "next-auth/providers/google";




export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        if (
          credentials.email === "admin@school.com" &&
          credentials.password === "Admin@123"
        ) {
          return { id: "1", name: "Admin", email: "admin@school.com" }
        }
        return null
      },
    }),

  //    GoogleProvider({
  //   clientId: process.env.GOOGLE_CLIENT_ID,
  //   clientSecret: process.env.GOOGLE_CLIENT_SECRET
  // })

  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET || "",
}