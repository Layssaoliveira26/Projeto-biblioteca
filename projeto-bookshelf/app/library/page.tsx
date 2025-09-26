'use client'

import GoBackButton from "@/components/ui/custom-components/goBackButton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { lazy, Suspense, useEffect } from "react";
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react";
import { useLivros } from "@/context/LivrosContext";
import { options } from "@/lib/options";
import { Search } from "lucide-react";  
import { livros as livrosData } from "@/lib/livros"; 

export default function LibraryPage() {
  const { livros, setLivros } = useLivros();
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

 function handleDelete(id: string) {
  return new Promise<void>((resolve) => {
    setLivros((prev) => prev.filter((livro) => livro.id !== id));
    resolve();
  });
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

async function handleAddBook(newBook) {
  setIsSubmitting(true);
  await new Promise((res) => setTimeout(res, 1000)); 
  setLivros((prev) => [...prev, newBook]);
  setIsSubmitting(false);
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

      <div className="flex justify-between mt-6 px-5 md:px-12">
        <h1 className="text-2xl font-bold mb-4">Biblioteca</h1>
        <Link href="/new-book">
          <Button size="sm">Adicionar Livro</Button>
        </Link>
      </div>
      
  <div className="flex md:flex-row items-start md:items-center justify-between gap-3 p-4 md:p-8 lg:p-12">
    <div className="relative flex-1">
      <Input
       type="text"
       placeholder="Digite o nome do livro"
       value={searchTerm}
       onChange={(e) => setSearchTerm(e.target.value)} 
       className="pr-10"
    />
    <Search 
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" 
      size={20} 
    />
    </div>  

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