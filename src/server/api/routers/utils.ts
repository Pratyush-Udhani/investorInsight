import { prisma } from "~/server/db";
import { google } from 'googleapis';
import { env } from "~/env.mjs";

export async function fetchDataFromSheet(categoryName: string) {
    const target = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
    const jwt = new google.auth.JWT(
        env.GOOGLE_SHEETS_CLIENT_EMAIL,
        undefined,
        (env.GOOGLE_SHEETS_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
        target
    );
    const sheets = google.sheets({ version: 'v4', auth: jwt });
    const range = 'Sheet1'
    try {
        console.log("trying")
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: env.SHEET_ID, 
            range: range, 
        }); 

        const data = response.data.values; 
        if (!data || data.length === 0) {
            console.log("no data found in range");
            return null; 
        }
        const headers = data.shift()
        return(data)
    } catch (error) {
        console.log("erroi")
        return null;
    }
}
export async function populateDataToPrisma(data: any[]) {
    for (const row of data) {
        const categoryName: string  = row[1]
        const genreName: string = row[9]
        const appName: string = row[0]
        const rating: number = row[2]
        const reviews_number: number = row[3]
        const size: string = row[4]
        const installs: string = row[5]
        const price: string = row[7]
        const content_rating: string = row[8]
        const version: string = row[11]
        const last_updated: string = row[10]
        const android_ver: string = row[12]

        const existingCategory = await prisma.category.findFirst({
            where: { name: categoryName }
        })
        const existingGenre = await prisma.genre.findFirst({
            where: { name: genreName}
        })
        const existingApp = await prisma.app.findFirst({
            where: { name: appName }
        })
        let category;
        let genre; 
        let app; 

        // TODO: category in genre check 

        if (existingCategory) {
            if (!existingGenre) {
                category = await prisma.category.update({
                    where: { id: existingCategory.id}, 
                    data: { name: categoryName, 
                        genres: {
                            create: [
                                {
                                    name: genreName, 
                                    apps: {
                                        create: [
                                            {
                                                name: appName, 
                                                rating: +rating,
                                                reviews_number: +reviews_number,
                                                size: size,
                                                installs: installs,
                                                price: price,
                                                content_rating: content_rating,
                                                version: version, 
                                                last_updated: last_updated,
                                                android_ver: android_ver,
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                });
            } else {
                category = await prisma.category.update({
                    where: { id: existingCategory.id },
                    data: {
                        name: categoryName,
                        genres: {
                            update: [
                                {
                                    where: { id: existingGenre.id },
                                    data: {
                                        name: genreName,
                                        apps: {
                                            create: [
                                                {
                                                    name: appName,
                                                    rating: +rating,
                                                    reviews_number: +reviews_number,
                                                    size: size,
                                                    installs: installs,
                                                    price: price,
                                                    content_rating: content_rating,
                                                    version: version,
                                                    last_updated: last_updated,
                                                    android_ver: android_ver,
                                                }
                                            ],
                                        },
                                    },
                                },
                            ],
                        },
                    },
                });
            }
        } else {
            category = await prisma.category.create({
                data: {
                    name: categoryName,
                    genres: {
                        create: [
                            {
                                name:genreName,
                                apps: {
                                    create: [
                                        {
                                            name: appName,
                                            rating: +rating,
                                            reviews_number: +reviews_number,
                                            size: size,
                                            installs: installs,
                                            price: price,
                                            content_rating: content_rating,
                                            version: version,
                                            last_updated: last_updated,
                                            android_ver: android_ver,
                                        }
                                    ],
                                },
                            },
                        ],
                    },
                },
            });
        }
    }
}
