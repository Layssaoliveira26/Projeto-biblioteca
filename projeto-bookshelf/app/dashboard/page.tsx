import Link from "next/link";
import { Button } from "@/components/ui/button"
import ReportCard from "./reportCard";
import { livros } from "@/lib/livros";


export default function Home() {
  let paginasLidas: number = 0;

  return (
    <>
    <div className="flex md:flex-row items-start md:items-center justify-between gap-3 p-4 md:p-8 lg:p-12">
      <h1 className="text-2xl md:text-3xl font-bold mb-2 md:mb-0">Dashboard</h1>
      <div className="flex md:flex-row gap-2 md:gap-4">
        <Link href="/library">
          <Button size="sm">Biblioteca</Button>
        </Link>
        <Link href="/new-book">
          <Button size="sm">Adicionar Livro</Button>
        </Link>
      </div>
    </div>

    <div className="grid gap-4 p-6">
        <ReportCard title={"Total de livros"} value={livros.length} />
        <ReportCard title={"Livros em andamento"} value={(livros.filter((livro) => livro.genre === "Aventura").length)} />
        <ReportCard title={"Livros finalizados"} value={(livros.filter((livro) => livro.status === "LIDO")).length} />
        <ReportCard title={"Total de páginas lidas"} value={livros.reduce((total, livro) => total + livro.totalPaginasLidas, 0)} />
      </div>

    </>
  );
}
