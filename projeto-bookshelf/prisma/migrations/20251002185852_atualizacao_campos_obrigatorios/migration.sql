/*
  Warnings:

  - You are about to drop the column `actualPage` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Book` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "pages" TEXT,
    "isbn" TEXT,
    "status" TEXT NOT NULL,
    "rating" TEXT,
    "synopsis" TEXT,
    "cover" TEXT,
    "year" INTEGER,
    "totalPaginasLidas" TEXT NOT NULL,
    "genreId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Book_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Book" ("author", "cover", "genreId", "id", "isbn", "pages", "rating", "status", "synopsis", "title", "totalPaginasLidas", "year") SELECT "author", "cover", "genreId", "id", "isbn", "pages", "rating", "status", "synopsis", "title", "totalPaginasLidas", "year" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
CREATE UNIQUE INDEX "Book_title_key" ON "Book"("title");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
