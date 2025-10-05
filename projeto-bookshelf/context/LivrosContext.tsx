'use client'

import { createContext, useContext, useState, useEffect } from "react"
// import { livros as livrosIniciais } from "@/lib/livros";
import { BookCardProps } from "@/app/library/bookCard";

type LivrosContextType = {
    livros: BookCardProps[];
    // setLivros: React.Dispatch<React.SetStateAction<BookCardProps[]>>;
    addLivro: (livro: BookCardProps) => void;
    atualizarLivro: (livro: BookCardProps) => Promise<void>;
    deletarLivro: (id: string) => Promise<void>;
    // idLivro: number;
    // addId: () => void
}

const LivrosContext = createContext<LivrosContextType | undefined>(undefined);

export function LivrosProvider({ children }: { children: React.ReactNode}) {
    const [livros, setLivros] = useState<BookCardProps[]>([]);

   useEffect(() => {
    async function fetchLivros() {
        const res = await fetch("/api/books");
        const data = await res.json();
        setLivros(data);
    }
    fetchLivros();
   }, [])


    async function addLivro(livro: BookCardProps) {
        const res = await fetch("/api/books", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(livro),
        });
        if (!res.ok) throw new Error("Erro ao criar livro");
        const novoLivro = await res.json();
        setLivros((prev) => [...prev, novoLivro]);
    }
    
    async function atualizarLivro(livro: BookCardProps) {
        const res = await fetch(`/api/books/${livro.id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json" },
            body: JSON.stringify(livro),
        });
        if (!res.ok) throw new Error("Erro ao atualizar livro.")
        const livroAtualizado = await res.json();
        setLivros((prev) => 
            prev.map((l) => (l.id === livroAtualizado.id ? livroAtualizado: l))
        );
    }

    async function deletarLivro(id: string) {
        const res = await fetch(`/api/books/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Erro ao deletar livro");
        setLivros((prev) => prev.filter((l) => l.id !== id ))
    }

    return (
        <LivrosContext.Provider value={{ livros, addLivro, atualizarLivro, deletarLivro}}>
            {children}
        </LivrosContext.Provider>
    );

}

export function useLivros() {
    const context = useContext(LivrosContext);
    if (!context) {
        throw new Error("useLivros deve ser usado dentro de LivrosProvider")
    }
    return context;
}