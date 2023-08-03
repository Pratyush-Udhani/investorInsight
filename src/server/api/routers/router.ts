import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { fetchDataFromSheet, populateDataToPrisma } from "./utils";

export const router = createTRPCRouter({
    getAppsByCategory: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
        const data = await fetchDataFromSheet(input);
        if (data && data.length > 0) {
            await populateDataToPrisma(data);
        }

        //  getAppsByCategory: publicProcedure
        //    .input(z.string()) 
        //    .query(async ({ input }) => {
        //      const apps = await prisma.category.findMany({
        //          where: { name: input }, 
        //          include: { genres: { include: { apps: true } } }
        //     })
        //      return apps; 
        //  }), 
    }), 
});
