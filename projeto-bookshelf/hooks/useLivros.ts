// hooks/useSafeLivros.ts
'use client'

import { useLivros } from "@/context/LivrosContext";

export function useSafeLivros() {
  const context = useLivros();
  
  // Se livros for undefined/null, retorna array vazio
  const safeLivros = Array.isArray(context.livros) ? context.livros : [];
  
  return {
    ...context,
    livros: safeLivros
  };
}