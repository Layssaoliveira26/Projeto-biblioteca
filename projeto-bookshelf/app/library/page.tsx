'use client'

import GoBackButton from "@/components/ui/custom-components/goBackButton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { lazy, Suspense } from "react";
import { BookCardProps } from "./bookCard";
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ChangeTheme from "../dashboard/changeTheme";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";  
import NewGenre from "@/components/ui/newGenre";
import { livros as livrosData } from "@/lib/livros"; 

export default function LibraryPage() {
  const [livros, setLivros] = useState<any[]>([])
  const [categorias, setCategorias] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const BookCard = lazy(() => import("./bookCard"));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLivros(livrosData);
      setIsLoading(false);
    }, 1000);
  }, [setLivros]);

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
  function BookCardSkeleton() {
  return (
    <div className="border rounded p-4 animate-pulse h-64 flex flex-col justify-between">
      <div className="bg-gray-300 h-32 mb-2 rounded" />
      <div className="h-4 bg-gray-300 mb-1 rounded" />
      <div className="h-4 bg-gray-300 w-1/2 rounded" />
      <div className="h-8 bg-gray-300 mt-2 rounded" />
    </div>
  );
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


     {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <BookCardSkeleton key={i} />
        ))}
        </div>
      ) : (
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {livrosFiltrados.length > 0 ? (
          livrosFiltrados.map((livro) => (
  <Suspense key={livro.id} fallback={<BookCardSkeleton />}>
    <BookCard
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
  </Suspense>
 ))
 ) : (
    <p className="text-gray-500">Nenhum livro encontrado.</p>
  )}
  </div>
  )}
  </div>
 );