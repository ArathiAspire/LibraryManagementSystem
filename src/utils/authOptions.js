import Credentials from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username" },
        password: { label: "Password" },
      },
      authorize(credentials, req) {
        if (
          credentials?.username === "admin@gmail.com" &&
          credentials.password === "admin"
        ) {
          return {
            id: "1",
            username: "admin@gmail.com",
          };
        }
        return null;
      },
    }),
  ],
//   pages:{
//     signIn:'/signin'
//   }
};

