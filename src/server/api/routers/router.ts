import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { fetchDataFromSheet, populateDataToPrisma } from "./utils";
import { prisma } from "~/server/db";
import { CategoryMapping, CategoryEnum } from "~/utils/categories";

export const router = createTRPCRouter({
    getAppsByCategory: publicProcedure
    .input(z.nativeEnum(CategoryEnum))
    .query(async ({ input }) => {
        //const data = await fetchDataFromSheet(CategoryMapping[input]);
        //if (data && data.length > 0) {
        //    await populateDataToPrisma(data);
        //}
        const apps = await prisma.category.findUnique({
            where: { id: input }, 
            include: { genres: { include: { apps: true } } }
        })

        return apps;
    }), 
    routerTest: publicProcedure
    .input(z.string())
    .query(async (opts) => {
        const { input } = opts 
        const apps = {
            data: "this is the return data " + input
        }
        return apps
    }), 
});
