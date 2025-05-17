// lib/auth.d.ts (or types/next-auth.d.ts)
import { DefaultSession } from "next-auth";
import {Role} from "@/lib/prisma" // Or manually define if not using Prisma enums

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role?: Role | "ADMIN" | "PATIENT" | string; // Your roles here
    } & DefaultSession["user"];
  }

  interface JWT {
    role?: Role | string;
    id: string;
  }
}

declare module "next/server" {
  interface NextRequest {
    auth: Session | null;
  }
}
