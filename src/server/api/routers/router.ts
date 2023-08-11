import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { fetchDataFromSheet, populateDataToPrismaAndFetch } from "./utils";
import { prisma } from "~/server/db";
import { CategoryMapping, CategoryEnum } from "~/utils/categories";

export const router = createTRPCRouter({

    getAppsByCategory: publicProcedure
    .input(z.nativeEnum(CategoryEnum))
    .query(async ({ input }) => {
        
        console.log("input: ", input)
        let apps;
        const toAPI = await prisma.category.findFirst({
            where: { id: input }
        })

        if(toAPI === null) {
            console.log("doesnt exist in prisma")
            if(input == CategoryEnum.ART_AND_DESIGN) {
                //first fetch
                console.log("first fetch")
                const data = await fetchDataFromSheet(CategoryMapping[input]);
                if (data && data.length > 0) {
                   apps = await populateDataToPrismaAndFetch(data, input);
                }
            } else {
                const data = await fetchDataFromSheet(CategoryMapping[input])
                console.log("AFTER FETCHFROM SHEET: ", data?.length)
                if (data && data.length > 0) {
                    apps = await populateDataToPrismaAndFetch(data, input);
                    console.log("complete prisma func: ", apps?.name)
                }
            }
        } else {
            console.log("fetching from prisma")
            apps = await prisma.category.findUnique({
                where: { id: input }, 
                include: { genres: { include: { apps: true } } }
            })
        }
        if (apps) {
            console.log("FETCHING COMPLETE!! SENDING DATA apps: ", apps?.name)
            return apps;
        }
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
