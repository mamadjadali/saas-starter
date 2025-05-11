// lib/prisma.ts
import { PrismaClient } from "@prisma/client/edge.js"; // ✅ Use edge path

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export const prisma = client;
