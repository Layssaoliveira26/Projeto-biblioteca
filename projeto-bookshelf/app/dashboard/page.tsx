import Link from "next/link";
import { Button } from "@/components/ui/button"
import ReportCard from "./reportCard";

export default function Home() {
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
        <ReportCard title={"Total de livros"} value={120} />
        <ReportCard title={"Livros em andamento"} value={2} />
        <ReportCard title={"Livros finalizados"} value={10} />
        <ReportCard title={"Total de páginas lidas"} value={1000} />
      </div>

    </>
  );
}
