import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    role?: "ADMIN" | "PATIENT" ; // add more if needed
  }

  interface Session {
    user?: {
      id: string;
      email?: string;
      name?: string;
      image?: string;
      role?: "ADMIN" | "PATIENT";
    };
  }

  interface JWT {
    id?: string;
    email?: string;
    role?: "ADMIN" | "PATIENT";
  }
}
