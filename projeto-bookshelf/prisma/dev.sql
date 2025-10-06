PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
    "id"                    TEXT PRIMARY KEY NOT NULL,
    "checksum"              TEXT NOT NULL,
    "finished_at"           DATETIME,
    "migration_name"        TEXT NOT NULL,
    "logs"                  TEXT,
    "rolled_back_at"        DATETIME,
    "started_at"            DATETIME NOT NULL DEFAULT current_timestamp,
    "applied_steps_count"   INTEGER UNSIGNED NOT NULL DEFAULT 0
);
INSERT INTO _prisma_migrations VALUES('68984ba5-db42-48c5-800b-71fa3b075f5e','7d9a51c4b9d7dedf018131a55f31c21ceac998d8d756e4030e561dd8982bcf34',1759612912490,'20251002183739_init',NULL,NULL,1759612912474,1);
INSERT INTO _prisma_migrations VALUES('9a2d645f-13cd-4150-9891-a78b0e5f72dc','8add9a8c1a112b84f2a87af6a2c40e4a72da5d3d6fab7a42eed5e01601f2555e',1759612912511,'20251002185852_atualizacao_campos_obrigatorios',NULL,NULL,1759612912493,1);
INSERT INTO _prisma_migrations VALUES('8dc80749-8a0e-44a5-9384-84c8873f7ec4','b89000cc47d939425de770461f00021bef9c7f31aaef4c7a47e084a12c796577',1759612912528,'20251003125320_atualizacao_tipo_pages',NULL,NULL,1759612912513,1);
INSERT INTO _prisma_migrations VALUES('717f0fde-199f-498b-9d20-65bbf1ac7acf','f46bdaa1734d909401e0985333374560cc0588538519098bd11d3038d3ca6128',1759612912548,'20251003131507_atualizacao_tipo_rating',NULL,NULL,1759612912530,1);
INSERT INTO _prisma_migrations VALUES('e93bdaf8-ae11-4bf1-85f5-11a4d1cb969d','7ae520df1205d3d607689a35af58d5bad49555eec3d4318ab94213ecd36a9418',1759612912556,'20251004145646_atualizacao_title',NULL,NULL,1759612912550,1);
CREATE TABLE IF NOT EXISTS "Genre" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "genero" TEXT NOT NULL
);
INSERT INTO Genre VALUES(1,'Literatura Brasileira');
INSERT INTO Genre VALUES(2,'Ficção Científica');
INSERT INTO Genre VALUES(3,'Realismo Mágico');
INSERT INTO Genre VALUES(4,'Ficção');
INSERT INTO Genre VALUES(5,'Fantasia');
INSERT INTO Genre VALUES(6,'Romance');
INSERT INTO Genre VALUES(7,'Biografia');
INSERT INTO Genre VALUES(8,'História');
INSERT INTO Genre VALUES(9,'Autoajuda');
INSERT INTO Genre VALUES(10,'Tecnologia');
INSERT INTO Genre VALUES(11,'Programação');
INSERT INTO Genre VALUES(12,'Negócios');
INSERT INTO Genre VALUES(13,'Psicologia');
INSERT INTO Genre VALUES(14,'Filosofia');
INSERT INTO Genre VALUES(15,'Poesia');
CREATE TABLE IF NOT EXISTS "Book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "pages" INTEGER,
    "isbn" TEXT,
    "status" TEXT NOT NULL,
    "rating" INTEGER,
    "synopsis" TEXT,
    "cover" TEXT,
    "year" INTEGER,
    "totalPaginasLidas" TEXT NOT NULL,
    "genreId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Book_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO Book VALUES(1,'Grande sertão: veredas','Guimarães Rosa',240,NULL,'QUERO LER',3,'"Grande Sertão: Veredas" narra a vida do jagunço Riobaldo, que conta sua história de infância até a velhice para um interlocutor em sua fazenda, relatando a vida no sertão, os conflitos entre bandos de jagunços, as reflexões sobre o bem e o mal, a possível pacto com o demônio e seu amor por Diadorim, um companheiro que se revela uma mulher após sua morte, o que o leva a abandonar a vida de jagunço.','https://i.pinimg.com/736x/a9/49/43/a94943d6e0b626ce250d43afe02696cd.jpg',1956,'0',6,'2025-10-04 21:46:40',1759660410606);
INSERT INTO Book VALUES(2,'1984','George Orwell',328,NULL,'LIDO',4,'"1984" de George Orwell mostra uma sociedade totalitária onde o Partido e o Grande Irmão controlam toda a informação, pensamentos e ações das pessoas. Winston Smith, funcionário que reescreve a história, começa a questionar o regime e busca liberdade e amor, mas enfrenta vigilância constante e repressão brutal. O livro é uma crítica à opressão, manipulação da verdade e perda da individualidade.','https://i.pinimg.com/736x/b8/1e/cd/b81ecde4aeda4e64f2b96e5351bf32d0.jpg',1949,'328',2,'2025-10-04 21:56:10',1759660702197);
INSERT INTO Book VALUES(3,'Cem Anos de Solidão','Gabriel García Márquez',448,NULL,'LENDO',5,'"Cem Anos de Solidão" acompanha a saga da família Buendía na cidade fictícia de Macondo, mostrando amores, tragédias e acontecimentos mágicos que se repetem por gerações. A obra explora solidão, destino e memória, mesclando realidade e fantasia para refletir sobre a vida e a história da América Latina.','https://i.pinimg.com/736x/47/bf/02/47bf021151c08c65fb0b7f1785e18340.jpg',1967,'100',3,'2025-10-04 22:08:41',1759616859403);
INSERT INTO Book VALUES(4,'O Pequeno Príncipe','Antoine de Saint-Exupéry',96,NULL,'LIDO',5,'"O Pequeno Príncipe", de Antoine de Saint-Exupéry, conta a jornada de um menino vindo de outro planeta que viaja por diferentes mundos até chegar à Terra. Em encontros com adultos e suas manias, ele revela lições sobre amizade, amor, simplicidade e o essencial que “é invisível aos olhos”.','https://i.pinimg.com/1200x/98/6b/e0/986be08cc108e292be3ff9bb463f4e2b.jpg',1943,'96',4,'2025-10-04 22:14:05','2025-10-04 22:14:05');
INSERT INTO Book VALUES(5,'Orgulho e Preconceito','Jane Austen',400,NULL,'LIDO',3,'"Orgulho e Preconceito", de Jane Austen, narra a história de Elizabeth Bennet e sua família na Inglaterra do século XIX. O livro acompanha seus conflitos amorosos, sociais e familiares, destacando o relacionamento entre Elizabeth e o reservado Sr. Darcy, marcado por mal-entendidos, orgulho e preconceito, até evoluírem para o reconhecimento mútuo e o amor verdadeiro.','https://i.pinimg.com/736x/a1/b6/d3/a1b6d3d697cb8607db1bd0537aee6d2a.jpg',1843,'400',1,'2025-10-04 22:19:38','2025-10-04 22:19:38');
INSERT INTO Book VALUES(6,'Sapiens','Yuval Noah Harari',512,NULL,'PAUSADO',4,'"Sapiens", de Yuval Noah Harari, apresenta a história da humanidade desde o surgimento do Homo sapiens até o mundo contemporâneo. O autor analisa como a espécie evoluiu através de três grandes revoluções: cognitiva, agrícola e científica, mostrando como crenças, sociedades e tecnologias moldaram a vida humana e o planeta.','https://m.magazineluiza.com.br/a-static/420x420/livro-sapiens-uma-nova-historia-da-humanidade-yuval-noah-harari/livrarialeituradompedro/9788535933925/d761af640cce89adb79c95e2973f693c.jpeg',2011,'200',8,'2025-10-04 22:19:38','2025-10-04 22:19:38');
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('Genre',15);
INSERT INTO sqlite_sequence VALUES('Book',6);
CREATE UNIQUE INDEX "Genre_genero_key" ON "Genre"("genero");
COMMIT;
