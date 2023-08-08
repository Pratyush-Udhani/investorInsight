/*
  Warnings:

  - You are about to alter the column `installs` on the `App` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - Added the required column `android_ver` to the `App` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_App" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "reviews_number" INTEGER NOT NULL,
    "size" TEXT NOT NULL,
    "installs" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "content_rating" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "last_updated" TEXT NOT NULL,
    "android_ver" TEXT NOT NULL,
    "genreId" INTEGER NOT NULL,
    CONSTRAINT "App_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_App" ("content_rating", "genreId", "id", "installs", "last_updated", "name", "price", "rating", "reviews_number", "size", "version") SELECT "content_rating", "genreId", "id", "installs", "last_updated", "name", "price", "rating", "reviews_number", "size", "version" FROM "App";
DROP TABLE "App";
ALTER TABLE "new_App" RENAME TO "App";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
