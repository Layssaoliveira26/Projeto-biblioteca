// import { livros as LivrosIniciais } from "./livros";
// import { options as optionsIniciais } from "./options";
// import { BookCardProps } from "@/app/library/bookCard";

// if (!(global as any).livrosDB) {
//   (global as any).livrosDB = [...LivrosIniciais];
// }

// export const livrosDB: BookCardProps[] = (global as any).livrosDB;

// // export let livrosDB: BookCardProps[] = [...LivrosIniciais];

// export let categoriasDB = [...optionsIniciais];

import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSQL({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
})


export const db = new PrismaClient({ adapter })