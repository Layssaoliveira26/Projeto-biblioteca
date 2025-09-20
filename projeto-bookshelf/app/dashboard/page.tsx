import Link from "next/link";
import { Button } from "@/components/ui/button"
import ReportCard from "./reportCard";
import { livros } from "@/lib/livros";


export default function Home() {
  let paginasLidas: number = 0;

  return (
  <>
  <div className="flex items-center justify-between border-[#4E402E] rounded-md py-1 md:px-8 shadow-md bg-[#f9f8f6] px-4">
  <div className="flex items-center gap-3">
    <img src="/logo.png" alt="logo" className="w-20 h-20" />
    <h1 className="mb-0 md:mb-1 text-2xl md:text-3xl">Dashboard</h1>
  </div>

  <div className="flex flex-col md:flex-row md:gap-5 gap-2">
    <Link href="/library">
      <Button size="sm" className="w-28">Biblioteca</Button>
    </Link>
    <Link href="/new-book">
      <Button size="sm" className="w-28">Adicionar Livro</Button>
    </Link>
  </div>
</div>
    
  <div className="flex flex-row-reverse md:flex-row-reverse items-stretch p-2 gap-4 overflow-x-hidden md:mt-7">
    <div className="flex flex-col items-end md:flex-row-reverse gap-3">
        <div>
          <div className="hidden md:flex flex-col w-40  md:w-60 md:h-90 ">
              <img
                  src="https://i.pinimg.com/1200x/9d/82/d6/9d82d654e41a805c10ac4e2a6a772ce9.jpg"
                  alt=""
                  className="rounded-t-[150px] rounded-b-[10px] object-cover w-full h-full shadow-md border-3 border-[#D99D55] "
              />
          </div>
          <p className="text-sm text-center font-bold mt-2 hidden md:block">Alice's Adventures Underground</p>
          <p className="text-xs text-center font-inter hidden md:block">Lewis Carroll</p>
        </div> 

        <div>
          <p className="text-sm text-center font-bold mt-2 hidden md:block">The Herbwitch's Apprentice</p>
          <p className="text-xs text-center font-inter hidden md:block mb-2">Ireen Chau</p>
          <div className="hidden md:flex w-40 h-60 sm:w-48 sm:h-72 md:w-60 md:h-90 ">
              <img
                  src="https://i.pinimg.com/736x/01/83/76/018376580e76d06eac2f260ad42d5d7e.jpg"
                  alt=""
                  className="rounded-t-[10px] rounded-b-[150px] object-cover w-full h-full shadow-md border-3 border-[#F3CEA0]"
              />
          </div>
        </div>

        <div>
        <div className=" w-40 h-60 sm:w-48 sm:h-72 md:w-60 md:h-90">
            <img
                src="https://i.pinimg.com/736x/24/3e/41/243e4165742e6e75744d85e16bb63a77.jpg"
                alt=""
                className="rounded-t-[150px] rounded-b-[10px] object-cover w-full h-full shadow-md border-3 border-[#D9C6B0]"
            />
        </div>
        <p className="hidden md:block text-sm text-center font-bold mt-2">La Jeune Fille au XVIII Siècle</p>
          <p className="hidden md:block text-sm text-center font-inter">Léo Claretie</p>
        </div>
    </div>
    
    <div className="flex flex-col justify-start items-start w-full mt-3 md:w-1/2 pl-6 sm:pl-12 md:pl-40 md:px-40 md:mt-10">
        <h1 className="text-[50px] sm:text-[100px] md:text-[100px] font-bold mb-4 md:mb-0 font-tangerine ">
            Ressonância 
        </h1>
        <h1 className="text-[50px] sm:text-[100px] md:text-[100px] font-bold mb-4 md:mb-0 font-tangerine relative -mt-10 ml-7 md:-mt-15 md:ml-16">
            Literária
        </h1>
        <p className="text-sm sm:text-lg md:text-xl font-inter mb-4 md:mb-0 -mt-5 ml-5">
            Quantos livros você já leu? Quantas páginas você virou? 
            Descubra estatísticas sobre seus hábitos de leitura e organize sua jornada literária.
        </p>
    </div>
</div>


<div className="grid grid-cols-2 gap-4 p-4 md:grid md:grid-cols-4 md:gap-4 md:p-4 md:mt-10 max-w-6xl mx-auto">
        <ReportCard title={"Total de livros"} value={livros.length} image="/flor-card.png" />
        <ReportCard title={"Lendo agora"} value={(livros.filter((livro) => livro.genre === "Aventura").length)} image="/flor-branca-card.png" />
        <ReportCard title={"Livros lidos"} value={(livros.filter((livro) => livro.status === "LIDO")).length} image="/flor-rosa.png"/>
        <ReportCard title={"Páginas lidas"} value={livros.reduce((total, livro) => total + livro.totalPaginasLidas, 0)} image="/flor-amarela-card.png"/>
</div>

  </>
  );
}
