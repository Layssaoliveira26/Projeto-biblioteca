-- CreateTable
CREATE TABLE "Book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "pages" TEXT NOT NULL,
    "actualPage" TEXT NOT NULL,
    "isbn" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "rating" TEXT NOT NULL,
    "synopsis" TEXT NOT NULL,
    "cover" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "totalPaginasLidas" TEXT NOT NULL,
    "genreId" INTEGER NOT NULL,
    CONSTRAINT "Book_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "genero" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Book_title_key" ON "Book"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Genre_genero_key" ON "Genre"("genero");
