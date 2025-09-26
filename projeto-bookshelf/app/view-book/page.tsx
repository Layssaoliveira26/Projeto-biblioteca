'use client'

import GoBackButton from "@/components/ui/custom-components/goBackButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/ui/custom-components/star";
import { livros } from "@/lib/livros";
import DadoLivro from "@/components/ui/verLivro";
import { BookCardProps } from "../library/bookCard";
import ChangeTheme from "../dashboard/changeTheme";
import { useSearchParams, useRouter } from "next/navigation";
import { useLivros } from "@/context/LivrosContext";


export default function ViewBookPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");
  const { livros, setLivros } = useLivros();

  function handleDelete() {
    if (!id) return;
    const confirmDelete = window.confirm("Tem certeza que deseja excluir este livro?");
    if (confirmDelete) {
      const filtro = livros.filter((livro) => livro.id !== id);
      setLivros(filtro);
      router.push("/library");
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

      {id ? (
        <DadoLivro id={id} />
      ) : (
        <div className="p-8 text-gray-500">Livro não encontrado</div>
      )}
    </div>
    </div>
  );
}