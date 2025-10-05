/*
  Warnings:

  - You are about to alter the column `pages` on the `Book` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "pages" INTEGER,
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
INSERT INTO "new_Book" ("author", "cover", "createdAt", "genreId", "id", "isbn", "pages", "rating", "status", "synopsis", "title", "totalPaginasLidas", "updatedAt", "year") SELECT "author", "cover", "createdAt", "genreId", "id", "isbn", "pages", "rating", "status", "synopsis", "title", "totalPaginasLidas", "updatedAt", "year" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
CREATE UNIQUE INDEX "Book_title_key" ON "Book"("title");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
