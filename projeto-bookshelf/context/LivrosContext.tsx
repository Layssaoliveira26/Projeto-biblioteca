'use client'

import { createContext, useContext, useState } from "react"
import { livros as livrosIniciais } from "@/lib/livros";
import { BookCardProps } from "@/app/library/bookCard";

type LivrosContextType = {
    livros: BookCardProps[];
    addLivro: (livro: BookCardProps) => void;
    idLivro: number;
    addId: () => void
}

const LivrosContext = createContext<LivrosContextType | undefined>(undefined);

export function LivrosProvider({ children }: { children: React.ReactNode}) {
    const [livros, setLivros] = useState<BookCardProps[]>(livrosIniciais);
    const [idLivro, setIdLivro] = useState(6);

    function addLivro(livro: BookCardProps) {
        setLivros((prev) => [...prev, livro]);
    }

    function addId() {
        setIdLivro(idLivro + 1);
    }

    return (
        <LivrosContext.Provider value={{livros, addLivro, idLivro, addId}}>
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