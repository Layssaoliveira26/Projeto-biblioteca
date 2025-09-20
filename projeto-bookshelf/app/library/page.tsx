'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import BookCard from "./bookCard";
import { Input } from "@/components/ui/input"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import { useState } from "react";
import { useLivros } from "@/context/LivrosContext";

export default function LibraryPage() {
  const { livros } = useLivros();
  const [livrosFiltrados, setLivrosFiltrados] = useState(livros);

  function buscarLivro(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      const filtrados = livros.filter((livro) => livro.title.toLowerCase().includes(event.target.value.toLowerCase()))
      setLivrosFiltrados(filtrados)
    }
    
  }
  
  
  return (
    <div className="p-4 ">
      <h1 className="text-2xl font-bold mb-4">Biblioteca</h1>
      <Link href="/new-book">
          <Button size="sm">Adicionar Livro</Button>
        </Link>

    <div className="flex md:flex-row items-start md:items-center justify-between gap-3 p-4 md:p-8 lg:p-12">
      <Input type="" placeholder="Digite o nome do livro" onKeyDown={buscarLivro}/>

      <Select>
        <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Gêneros" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="romance">Romance</SelectItem>
            <SelectItem value="aventura">Aventura</SelectItem>
            <SelectItem value="drama">Drama</SelectItem>
        </SelectContent>
    </Select>
    </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {livrosFiltrados.map((livro, index) => (
          <BookCard 
            key={index}
            id={index.toString()}
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
          />
        ))}
        
        
      </div>
    </div>
  );
}
