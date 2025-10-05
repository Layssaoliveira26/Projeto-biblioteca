// import { livros as LivrosIniciais } from "./livros";
// import { options as optionsIniciais } from "./options";
// import { BookCardProps } from "@/app/library/bookCard";

// if (!(global as any).livrosDB) {
//   (global as any).livrosDB = [...LivrosIniciais];
// }

// export const livrosDB: BookCardProps[] = (global as any).livrosDB;

// // export let livrosDB: BookCardProps[] = [...LivrosIniciais];

// export let categoriasDB = [...optionsIniciais];

import { createClient } from '@libsql/client';

export const db = createClient({
 url: process.env.TURSO_DATABASE_URL!,
 authToken: process.env.TURSO_AUTH_TOKEN!,
});