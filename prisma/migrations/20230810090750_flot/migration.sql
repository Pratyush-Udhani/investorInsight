/*
  Warnings:

  - You are about to alter the column `rating` on the `App` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_App" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "rating" REAL NOT NULL,
    "reviews_number" INTEGER NOT NULL,
    "size" TEXT NOT NULL,
    "installs" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "content_rating" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "last_updated" TEXT NOT NULL,
    "android_ver" TEXT NOT NULL,
    "genreId" INTEGER NOT NULL,
    CONSTRAINT "App_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_App" ("android_ver", "content_rating", "genreId", "id", "installs", "last_updated", "name", "price", "rating", "reviews_number", "size", "version") SELECT "android_ver", "content_rating", "genreId", "id", "installs", "last_updated", "name", "price", "rating", "reviews_number", "size", "version" FROM "App";
DROP TABLE "App";
ALTER TABLE "new_App" RENAME TO "App";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
