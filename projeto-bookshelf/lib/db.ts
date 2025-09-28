import { livros as LivrosIniciais } from "./livros";
import { options as optionsIniciais } from "./options";
import { BookCardProps } from "@/app/library/bookCard";

export let livrosDB: BookCardProps[] = [...LivrosIniciais];

export let categoriasDB = [...optionsIniciais];