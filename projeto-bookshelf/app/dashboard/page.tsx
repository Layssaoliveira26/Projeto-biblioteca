import Link from "next/link";
import { Button } from "@/components/ui/button"
import ReportCard from "./reportCard";
import { livros } from "@/lib/livros";


export default function Home() {
  let paginasLidas: number = 0;

  return (
    <>
   <div className="flex items-center justify-between px-4 py-1 md:px-8">
  <div className="flex items-center gap-3">
    <img src="/logo.png" alt="logo" className="w-30 h-30" />
    <h1 className="mb-20 md:mb-1 text-2xl md:text-3xl font-bold">Dashboard</h1>
  </div>

  <div className="flex gap-2 md:gap-10">
    <Link href="/library"><Button size="sm">Biblioteca</Button></Link>
    <Link href="/new-book"><Button size="sm">Adicionar Livro</Button></Link>
  </div>
</div>
    
  <div className="flex flex-col md:flex-row-reverse items-stretch p-2 gap-4">
  
  <img
    src=""
    alt=""
    className="w-100 h-80 sm:w-48 sm:h-40 md:w-160 md:h-140 object-cover rounded-md"
  />

  
  <div className="flex flex-col justify-between">
   
    <h1 className="text-2xl sm:text-3xl md:text-[40px] font-bold text-center md:text-left mb-4 md:mb-0">Organize a sua Biblioteca</h1>


    <div className="grid gap-4 p-6">
        <ReportCard title={"Total de livros"} value={livros.length} />
        <ReportCard title={"Livros em andamento"} value={(livros.filter((livro) => livro.genre === "Aventura").length)} />
        <ReportCard title={"Livros finalizados"} value={(livros.filter((livro) => livro.status === "LIDO")).length} />
        <ReportCard title={"Total de páginas lidas"} value={livros.reduce((total, livro) => total + livro.totalPaginasLidas, 0)} />
      </div>
    </div>
  </div>
  </>
  );
}
