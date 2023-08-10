import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { fetchDataFromSheet, populateDataToPrisma } from "./utils";
import { prisma } from "~/server/db";
import { CategoryMapping, CategoryEnum } from "~/utils/categories";

export const router = createTRPCRouter({

    getAppsByCategory: publicProcedure
    .input(z.nativeEnum(CategoryEnum))
    .query(async ({ input }) => {
       
        let apps;
        const toAPI = await prisma.category.findFirst({
            where: { id: input + 1 }
        })

        if(toAPI === null) {
            console.log("doesnt exist in prisma")
            if(input == 1) {
                //first fetch
                console.log("first fetch")
                const data = await fetchDataFromSheet('custom');
                if (data && data.length > 0) {
                   await populateDataToPrisma(data);
                    apps = await prisma.category.findUnique({
                        where: { id: input + 1 }, 
                        include: { genres: { include: { apps: true } } }
                    })
                }
            } else {
                const data = await fetchDataFromSheet(CategoryMapping[input])
                if (data && data.length > 0) {
                    await populateDataToPrisma(data)
                    apps = await prisma.category.findUnique({
                        where: { id: input + 1 }, 
                        include: { genres: { include: { apps: true } } }
                    })
                }
            }
        } else {
            console.log("fetching from prisma")
            apps = await prisma.category.findUnique({
                where: { id: input + 1 }, 
                include: { genres: { include: { apps: true } } }
            })
            console.log(apps)
        }
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
