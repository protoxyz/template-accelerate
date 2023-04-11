import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as {
  p: PrismaClient | undefined;
};

export const p =
  globalForPrisma.p ??
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.p = p;
