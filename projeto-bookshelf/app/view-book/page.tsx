'use client'

import GoBackButton from "@/components/ui/custom-components/goBackButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/ui/custom-components/star";
import DadoLivro from "@/components/ui/verLivro";
import { BookCardProps } from "../library/bookCard";
import ChangeTheme from "../dashboard/changeTheme";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Divide } from "lucide-react";


export default function ViewBookPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");
  
  const [livro, setLivro] = useState<BookCardProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchLivro() {
      if (!id) return;

      try {
        const res = await fetch(`/api/books/${id}`, { method: "GET"})

        if (!res.ok) {
          const data = await res.json();
          setError(data.message || "Livro não encontrado.");
          return;
        }

        const data = await res.json();
        setLivro(data);
      } catch (error) {
        setError("Erro de conexão.");
      } finally {
        setLoading(false);
      }
    }

    fetchLivro();
  }, [id])

  async function handleDelete() {
    if (!id) return;
    const confirmDelete = window.confirm("Tem certeza que deseja excluir este livro?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/books/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        alert(data.message || "Erro ao deletar livro.");
        return;
      }

      router.push("/library");
      router.refresh();
    } catch (error) {
      alert("Erro de conexão");
    }
  }

  return (
    <div className="flex flex-col h-screen bg-[var(--card)] text-[var(--foreground)]">
    <div className="flex flex-col h-screen">
      <div className="flex md:flex-row items-start md:items-center justify-between gap-3 p-4 md:p-8 lg:p-12">
        <GoBackButton />
        <div className="flex gap-2 md:gap-4"> {}
          <ChangeTheme />
          <Link href={`/new-book?id=${id}`}> {}
            <Button size="sm">Editar Livro</Button>
          </Link>
          <Button 
            size="sm" 
            variant="destructive" 
            onClick={handleDelete}
          >
            Excluir Livro
          </Button>
        </div>
      </div>

      <div className="flex-1 p-8">
        {loading && <div>Carregando...</div>}
        {error && <div className="text-red-500">{error}</div>}
        {!loading && !error && livro && <DadoLivro livro={livro}/>}
      </div>
    </div>
    </div>
  );
}