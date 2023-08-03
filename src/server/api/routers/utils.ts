import { prisma } from "~/server/db";
import { google } from 'googleapis';
import { env } from "~/env.mjs";

const sheets = google.sheets({ version: 'v4', auth: env.API_KEY });

export async function fetchDataFromSheet(categoryName: string) {
    const spreadsheetId = '13pqsh7-u-Ur7CnTIXwh5lwpkCYXFdanX3c5Tq-hiwVc';
    const range = 'Sheet1!A1:M';

    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId, 
            range, 
        }); 

        const data = response.data.values; 
        if (!data || data.length === 0) {
            console.log("no data found in range");
            return null; 
        }

        const headers = data.shift();
        const filteredData = data.filter(row => row[0] === categoryName);
        const formattedData = filteredData.map(row => {
            row.reduce((acc, value, index) => {
                if (headers) {
                    acc[headers[index]] = value
                    return acc; 
                } else {
                    return null;
                }
            }, {})
        }); 

        return formattedData; 
    } catch (error) {
        console.log("error fetching data from sheets")
        return null;
    }
}
export async function populateDataToPrisma(data: any[]) {
    for (const row of data) {
        const categoryName: string  = row['Category']
        const genreName: string = row['Genres']
        const appName: string = row['name']
        const rating: number = row['']
        const reviews_number: number = row['']
        const size: string = row['']
        const installs: string = row['']
        const price: number = row['']
        const content_rating: string = row['']
        const version: string = row['']
        const last_updated: string = row['']

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

        if (existingCategory) {
            category = await prisma.category.update({
                where: { id: existingCategory.id}, 
                data: { name: categoryName }
            });
            if (!existingGenre) {
                genre = await prisma.genre.create({
                    data: { name: genreName, categoryId: category.id }
                });

                app = await prisma.app.create({
                    data: {
                        name: appName, 
                        rating: rating,
                        reviews_number: reviews_number,
                        size: size,
                        installs: installs,
                        price: price, 
                        content_rating: content_rating,
                        version: version, 
                        last_updating: last_updated,
                        genreId: genre.id
                    }
                })
            } else {

                genre = await prisma.genre.update({
                    where: { id:existingGenre.id}, 
                    data: { name: genreName}
                });

                if (!existingApp) {
                    app = await prisma.app.create({
                        data: {
                            name: appName, 
                            rating: rating,
                            reviews_number: reviews_number,
                            size: size,
                            installs: installs,
                            price: price, 
                            content_rating: content_rating,
                            version: version, 
                            last_updating: last_updated,
                            genreId: genre.id
                        }
                    })
                }
            }
        } else {
            category = await prisma.category.create({
                data: { name: categoryName }
            });

            genre = await prisma.genre.create({
                data: { name: genreName, categoryId: category.id }
            });

            app = await prisma.app.create({
                data: {
                    name: appName, 
                    rating: rating,
                    reviews_number: reviews_number,
                    size: size,
                    installs: installs,
                    price: price, 
                    content_rating: content_rating,
                    version: version, 
                    last_updating: last_updated,
                    genreId: genre.id
                }
            })
        }
    }
}
