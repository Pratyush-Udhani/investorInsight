-- CreateTable
CREATE TABLE "App" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "reviews_number" INTEGER NOT NULL,
    "size" TEXT NOT NULL,
    "installs" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "type" INTEGER NOT NULL,
    "content_rating" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "last_updating" TEXT NOT NULL,
    "genreId" INTEGER NOT NULL,
    CONSTRAINT "App_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    CONSTRAINT "Genre_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
