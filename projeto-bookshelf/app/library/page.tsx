'use client'

import GoBackButton from "@/components/ui/custom-components/goBackButton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import BookCard from "./bookCard";
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react";
import { useLivros } from "@/context/LivrosContext";
import { options } from "@/lib/options";
import ChangeTheme from "../dashboard/changeTheme";


export default function LibraryPage() {
  const { livros, setLivros } = useLivros();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");

  function handleDelete(id: string) {
    const filtro = livros.filter((livro) => livro.id !== id)
    setLivros(filtro);
  }

  // Aqui junta busca + filtro
  const livrosFiltrados = livros.filter((livro) => {
    const matchSearch = livro.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchGenre =
      selectedGenre === "all" ||
      livro.genre.toLowerCase() === selectedGenre.toLowerCase();

    return matchSearch && matchGenre;
  });

  return (
    <div className="p-4 ">
      <div>
        <GoBackButton />
      </div>

      <div className="flex justify-between mt-6 px-5 md:px-12 items-center">
        <h1 className="text-2xl font-bold ">Biblioteca</h1>
        <div className="flex items-center gap-4">
          <ChangeTheme />
          <Link href="/new-book">
            <Button size="sm">Adicionar Livro</Button>
          </Link>
        </div>
      </div>

      <div className="flex md:flex-row items-start md:items-center justify-between gap-3 p-4 md:p-8 lg:p-12">
        <Input
          type="text"
          placeholder="Digite o nome do livro"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // busca em tempo real
          className="border border-[var(--border)] focus:border-[var(--border)] focus:ring-1 focus:ring-[var(--ring)]"
        />

        <Select
          value={selectedGenre}
          onValueChange={(value) => setSelectedGenre(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Gêneros" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            {options.map((opcao) => (
              <SelectItem
                key={opcao.genero}
                value={opcao.genero.toLowerCase()}
              >
                {opcao.genero}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {livrosFiltrados.length > 0 ? (
          livrosFiltrados.map((livro, index) => (
            <BookCard
              key={livro.id ?? index}
              id={livro.id}
              title={livro.title}
              author={livro.author}
              genre={livro.genre}
              year={livro.year}
              pages={livro.pages}
              rating={livro.rating}
              synopsis={livro.synopsis}
              cover={livro.cover}
              status={livro.status}
              totalPaginasLidas={livro.totalPaginasLidas}
              onDelete={() => handleDelete(livro.id)}
            />
          ))
        ) : (
          <p className="text-gray-500">Nenhum livro encontrado.</p>
        )}
      </div>
    </div>
  );
}
