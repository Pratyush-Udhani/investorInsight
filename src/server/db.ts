import { PrismaClient } from "@prisma/client";
import { env } from "~/env.mjs";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

interface App {
    id: number, 
    name: string, 
    rating: number, 
    reviews_number: number, 
    size: string, 
    installs: string, 
    price: number, 
    type: number | 'Free', 
    content_rating: string, 
    version: string, 
    last_update: string
}

interface Genre {
    name: string, 
    apps: App[]
}

interface Category {
    name: string,
    genres: Genre[]
}

const categories : Category[] = []
export const db = {
    category: {
        getCategoryList: async (name: string) => categories.find((category) => {
            category.name === name})
    }
}



