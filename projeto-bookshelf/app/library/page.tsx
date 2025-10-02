'use client'

import GoBackButton from "@/components/ui/custom-components/goBackButton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import BookCard, { BookCardProps } from "./bookCard";
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ChangeTheme from "../dashboard/changeTheme";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";  
import NewGenre from "@/components/ui/newGenre";

export default function LibraryPage() {
  const [livros, setLivros] = useState<any[]>([])
  const [categorias, setCategorias] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");

  useEffect(() => {
    async function fetchLivros() {
      const res = await fetch("/api/books");
      const data = await res.json();
      setLivros(data);
    }
    fetchLivros();
  }, [])

  useEffect(() => {
    async function fetchCategorias() {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategorias(data);
    }
    fetchCategorias();
  }, [])

  async function handleDelete(id: string) {
    const res = await fetch(`/api/books/${id}`, {method: "DELETE"});
    if (res.ok) {
      setLivros((prev) => prev.filter((livro) => livro.id !== id));
    }
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
    <div className="relative w-full flex-1">
      <Input
       type="text"
       placeholder="Digite o nome do livro"
       value={searchTerm}
       onChange={(e) => setSearchTerm(e.target.value)} 
       className="pr-10 border border-[var(--border)] focus:border-[var(--border)] focus:ring-1 focus:ring-[var(--ring)]"
    />
    <Search 
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" 
      size={20} 
    />
    </div >  
      <div className="flex items-center gap-3">
        <Select
          value={selectedGenre}
          onValueChange={(value) => setSelectedGenre(value)}
        >
          <SelectTrigger className=" md:w-[180px] border border-[var(--border)]">
            <SelectValue placeholder="Gêneros" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            {categorias.map((categoria) => (
              <SelectItem
                key={categoria.genero}
                value={categoria.genero.toLowerCase()}
              >
                {categoria.genero}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <NewGenre 
        categorias={categorias} 
        setCategorias={setCategorias} 
        className="h-10 flex items-center justify-center"
        />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {livrosFiltrados.length > 0 ? (
          livrosFiltrados.map((livro, index) => (
            <BookCard
              key={index}
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
