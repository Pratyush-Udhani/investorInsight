/*
  Warnings:

  - You are about to drop the column `type` on the `App` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_App" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "reviews_number" INTEGER NOT NULL,
    "size" TEXT NOT NULL,
    "installs" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "content_rating" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "last_updating" TEXT NOT NULL,
    "genreId" INTEGER NOT NULL,
    CONSTRAINT "App_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_App" ("content_rating", "genreId", "id", "installs", "last_updating", "name", "price", "rating", "reviews_number", "size", "version") SELECT "content_rating", "genreId", "id", "installs", "last_updating", "name", "price", "rating", "reviews_number", "size", "version" FROM "App";
DROP TABLE "App";
ALTER TABLE "new_App" RENAME TO "App";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
