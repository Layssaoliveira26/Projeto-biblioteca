'use client'

import GoBackButton from "@/components/ui/custom-components/goBackButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/ui/custom-components/star";
import { livros } from "@/lib/livros";
import DadoLivro from "@/components/ui/verLivro";
import { BookCardProps } from "../library/bookCard";
import { useSearchParams } from "next/navigation";
import ChangeTheme from "../dashboard/changeTheme";


export default function ViewBookPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  
  return (
    <div className="flex flex-col h-screen bg-[var(--card)] text-[var(--foreground)]">
    <div className="flex md:flex-row items-start md:items-center justify-between gap-3 p-4 md:p-8 lg:p-12">
        <GoBackButton />
      <div className="flex md:flex-row gap-2 md:gap-10 ">
        <ChangeTheme />
        <Link href="/new-book">
          <Button size="sm">Editar Livro</Button>
        </Link>
      </div>
    </div>
    {id? <DadoLivro id={id} /> : <div>Livro não encontrado</div>} 
    </div>
  );
}
