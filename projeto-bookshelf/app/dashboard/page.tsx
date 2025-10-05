'use client'

// import { useState, useEffect} from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button"
import ReportCard from "./reportCard";
import { useLivros } from "@/context/LivrosContext";
import ChangeTheme from './changeTheme';


export default function Home() {
  const { livros = [] } = useLivros();

  return (
  <div className="">
      {/* Header */}
      <div className="overflow-auto flex flex-row md:flex-row md:items-center md:justify-between rounded-md py-2 shadow-md bg-[var(--card)] px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 2xl:px-2">
        <div className="flex flex-row items-center justify-start w-full md:flex-row md:w-auto gap-3 ml-2 lg:ml-9 2xl:ml-20">
      {/* <div className="overflow-auto flex flex-row md:flex-row md:items-center md:justify-between rounded-md py-2 shadow-md bg-[var(--card)] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="flex flex-row items-center justify-start w-full md:flex-row md:w-auto gap-3"> */}
          <img 
            src="/logo.png" 
            alt="logo" 
            className="w-18 h-18 xl:w-20 xl:h-20 block dark:hidden" 
          />
          <img 
            src="/logo-2.png" 
            alt="logo" 
            className="w-18 h-18 xl:w-20 xl:h-20 hidden dark:block" 
          />
          <h1 className="hidden md:block font-bold font-sans mb-0 md:mb-1 text-2xl md:text-3xl xl:text-3xl">Dashboard</h1>
        </div>

        <div className="flex flex-row items-center gap-3 md:gap-6 ml-auto mr-3 lg:mr-12 2xl:mr-20">
          {/* Modo escuro, claro e sistema */}
          <ChangeTheme />
          <Link href="/library">
            <Button size="sm" className="w-20 text-[10px] md:w-24 md:text-xs xl:w-28 xl:text-sm">Biblioteca</Button>
          </Link>
          <Link href="/new-book">
            <Button size="sm" className="w-20 text-[10px] md:w-24 md:text-xs xl:w-28 xl:text-sm">Adicionar Livro</Button>
          </Link>

        </div>
      </div>
        
      {/* Seção principal */}
      {/* Mobile: row (texto à esquerda + 1 imagem à direita)
          Desktop: row-reverse (texto esquerda + imagens direita) */}
      <div className="flex flex-row-reverse lg:flex-row-reverse items-center justify-center mt-10 md:mt-16 mb-5 px-6 sm:px-10 md:px-12 lg:px-20 gap-6 md:gap-12 lg:gap-20 xl:gap-55 2xl:gap-80 mr-3 lg:mr-24 2xl:mr-40">
        
        {/* Imagens */}
        <div className="flex w-1/2 justify-center md:justify-end 2xl:mr-30">
          {/* Imagem única no mobile */}
          <div className="flex md:hidden w-32 h-48 sm:w-45 sm:h-60">
            <img
              src="https://i.pinimg.com/736x/24/3e/41/243e4165742e6e75744d85e16bb63a77.jpg"
              alt=""
              className="rounded-t-[150px] rounded-b-[10px] object-cover w-full h-full shadow-md border-2 border-[#D9C6B0]"
            />
          </div>

          {/* Imagens completas no desktop */}
          <div className="hidden md:flex flex-row gap-4 sm:gap-4 md:gap-8 lg:gap-6 xl:gap-10 justify-center">
            <div className="hidden lg:flex flex-col w-1/3 justify-center content-center text-center">
              <div className="livros-area flex flex-col w-32 h-48 md:w-45 md:h-60 2xl:w-60 2xl:h-80" id="livros-area">
                <img
                  src="https://i.pinimg.com/1200x/9d/82/d6/9d82d654e41a805c10ac4e2a6a772ce9.jpg"
                  alt=""
                  className="rounded-t-[150px] rounded-b-[10px] object-cover w-full h-full shadow-md border-3 border-[#D99D55]
                            transform transition-transform duration-300 
                            hover:-translate-y-2 hover:scale-105"
                />
              </div>
              <div className="flex flex-col">
                <p className="livros-area text-sm md:text-sm lg:text-sm max-[768px]:text-[10px] text-center font-bold mt-2">
                  Alice's Adventures Underground
                </p>
                <p className="text-xs md:text-xs lg:text-xs max-[768px]:text-[9px] text-center font-inter mb-2">
                  Lewis Carroll
                </p>
              </div>
            </div> 

            <div className="flex flex-col items-center text-center w-1/2 ">
              <div className="flex flex-col">
                <p className="livros-area text-sm md:text-sm lg:text-sm max-[768px]:text-[10px] text-center font-bold mt-2">
                  The Herbwitch's Apprentice
                </p>
                <p className="text-xs md:text-xs lg:text-xs max-[768px]:text-[9px] text-center font-inter mb-2">
                  Ireen Chau
                </p>
              </div>
              <div className="flex flex-col w-32 h-48 sm:w-40 sm:h-56 lg:w-45 lg:h-60 2xl:w-60 2xl:h-80">
                <img
                  src="https://i.pinimg.com/736x/01/83/76/018376580e76d06eac2f260ad42d5d7e.jpg"
                  alt=""
                  className="rounded-t-[10px] rounded-b-[150px] object-cover w-full h-full shadow-md border-3 border-[#F3CEA0]
                            transform transition-transform duration-300 
                            hover:-translate-y-2 hover:scale-105"
                />
              </div>
            </div>

            <div className="flex flex-col w-1/3 justify-center content-center text-center">
              <div className="flex flex-col w-32 h-48 sm:w-40 sm:h-56 lg:w-45 lg:h-60 2xl:w-60 2xl:h-80">
                <img
                  src="https://i.pinimg.com/736x/24/3e/41/243e4165742e6e75744d85e16bb63a77.jpg"
                  alt=""
                  className="rounded-t-[150px] rounded-b-[10px] object-cover w-full h-full shadow-md border-3 border-[#D9C6B0]
                            transform transition-transform duration-300 
                            hover:-translate-y-2 hover:scale-105"
                />
              </div>
              <div className="flex flex-col">
                <p className="livros-area text-sm md:text-sm lg:text-sm max-[768px]:text-[10px] text-center font-bold mt-2">
                  La Jeune Fille au XVIII Siècle
                </p>
                <p className="text-xs md:text-xs lg:text-xs max-[768px]:text-[9px] text-center font-inter mb-2">
                  Léo Claretie
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sessao esquerda do título e parágrafo */}
        <div className="flex flex-col justify-center items-start text-left w-1/2 ml-2 lg:ml-20 2xl:ml-70">
          <h1 className="text-[32px] sm:text-[42px] md:text-[65px] font-bold leading-none 2xl:text-[75px]">
            Ressonância
          </h1>
          <h1 className="text-[32px] sm:text-[42px] md:text-[65px] font-bold -mt-1 md:-mt-2 2xl:text-[75px]">
            Literária
          </h1>
          <p className="mt-3 text-sm sm:text-base md:text-lg max-w-md">
            Quantos livros você já leu? Quantas páginas você virou? 
            Descubra estatísticas sobre seus hábitos de leitura e organize sua jornada literária.
          </p>
          
        </div>
      </div>

      {/* Cards */}
      <h1 className="font-bold flex font-sans mt-10 ml-8 text-2xl md:hidden">
        Dashboard
      </h1>
      <div className="w-full grid grid-cols-2 gap-4 p-4 md:mt-10 md:grid md:grid-cols-4 md:gap-4 md:p-4 max-w-6xl 2xl:mt-30 mx-auto">
        <ReportCard title={"Total de livros"} value={livros.length} image="https://i.pinimg.com/1200x/d6/33/f0/d633f0f54435a0d174a73e593d03acb4.jpg" />
        <ReportCard title={"Lendo agora"} value={(livros.filter((livro) => livro.status === "LENDO").length)} image="https://i.pinimg.com/736x/07/2e/8d/072e8d9e2dd30564a030bbe6437e744a.jpg" />
        <ReportCard title={"Livros lidos"} value={(livros.filter((livro) => livro.status === "LIDO")).length} image="https://i.pinimg.com/736x/29/45/22/294522b8d609cb12c82028e85fb2a1fe.jpg"/>
        <ReportCard title={"Páginas lidas"} value={livros.reduce((total, livro) => total + Number(livro.totalPaginasLidas), 0)} image="https://i.pinimg.com/1200x/a7/4b/17/a74b17e4fb43796327b1a12fea1ea05d.jpg"/>
      </div>

    <div/>
  </div>
  );
}
