import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { fetchDataFromSheet, populateDataToPrisma } from "./utils";
import { prisma } from "~/server/db";

export const router = createTRPCRouter({
    getAppsByCategory: publicProcedure
    .input(z.number())
    .query(async ({ input }) => {
        const data = await fetchDataFromSheet(input);
        if (data && data.length > 0) {
            await populateDataToPrisma(data);
        }
        const apps = await prisma.category.findUnique({
            where: { id: input}, 
            include: { genres: { include: { apps: true } } }
        })
        return apps
    }), 
});
