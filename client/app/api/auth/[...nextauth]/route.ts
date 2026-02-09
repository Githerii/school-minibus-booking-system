





export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

          if (
          credentials.email === "admin@test.com" &&
          credentials.password === "123456"
        ) {
          return { id: "1", name: "Admin", email: "admin@test.com" };
        }

        return null;
      },
    }),
  ],