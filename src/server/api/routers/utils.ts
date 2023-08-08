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
        console.log("data in utils: ", JSON.stringify(response, null, 2));

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
        console.log("erroi")
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
