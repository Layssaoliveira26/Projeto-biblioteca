'use client'

import { createContext, useContext, useState } from "react"
import { livros as livrosIniciais } from "@/lib/livros";
import { BookCardProps } from "@/app/library/bookCard";

type LivrosContextType = {
    livros: BookCardProps[];
    addLivro: (livro: BookCardProps) => void;
}

const LivrosContext = createContext<LivrosContextType | undefined>(undefined);

export function LivrosProvider({ children }: { children: React.ReactNode}) {
    const [livros, setLivros] = useState<BookCardProps[]>(livrosIniciais);

    function addLivro(livro: BookCardProps) {
        setLivros((prev) => [...prev, livro]);
    }

    return (
        <LivrosContext.Provider value={{livros, addLivro}}>
            {children}
        </LivrosContext.Provider>
    );
}

export function useLivros() {
    const context = useContext(LivrosContext);
    if(!context) {
        throw new Error("useLivros deve ser usado dentro de LivrosProvider");
    }

    return context;
}