'use client'

import { useState, useEffect} from "react";
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
      <div className="overflow-auto flex flex-col md:flex-row md:items-center md:justify-between border-[#4E402E] rounded-md py-2 shadow-md bg-[var(--card)]">
        <div className="flex flex-row items-center justify-start w-full md:flex-row md:w-auto md:ml-16 gap-3">
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
          <h1 className="font-bold font-sans mb-0 md:mb-1 text-2xl md:text-3xl xl:text-3xl">Dashboard</h1>
        </div>

        <div className="flex flex-row justify-start items-center md:gap-6 gap-3 mt-3 md:mt-0 ml-2 xl:mr-18 ">
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
      <div className="flex flex-row-reverse md:flex-row-reverse items-center justify-center md:mt-7 px-6 sm:pl-10 pr-10 mt-10 mb-5 md:px-12 md:gap-80 lg:px-20 gap-6 2xl:ml-30 2xl:mt-15">
        
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
          <div className="hidden md:flex flex-row gap-5 md:mt-8">
            <div className="flex flex-col w-1/3 justify-center content-center text-center">
              <div className="livros-area flex flex-col w-32 h-48 md:w-45 md:h-60 2xl:w-60 2xl:h-80" id="livros-area">
                <img
                  src="https://i.pinimg.com/1200x/9d/82/d6/9d82d654e41a805c10ac4e2a6a772ce9.jpg"
                  alt=""
                  className="rounded-t-[150px] rounded-b-[10px] object-cover w-full h-full shadow-md border-3 border-[#D99D55]"
                />
              </div>
              <div className="flex flex-col">
                <p className="livros-area text-base font-black mt-2 ">
                  Alice's Adventures Underground
                </p>
                <p className="text-xs text-center font-inter">
                  Lewis Carroll
                </p>
              </div>
            </div> 

            <div className="flex flex-col w-1/3 justify-center content-center text-center">
              <div className="flex flex-col">
                <p className="livros-area text-base font-black mt-2">
                  The Herbwitch's Apprentice
                </p>
                <p className="text-xs text-center font-inter mb-2">
                  Ireen Chau
                </p>
              </div>
              <div className="flex flex-col w-32 h-48 md:w-45 md:h-60 2xl:w-60 2xl:h-80">
                <img
                  src="https://i.pinimg.com/736x/01/83/76/018376580e76d06eac2f260ad42d5d7e.jpg"
                  alt=""
                  className="rounded-t-[10px] rounded-b-[150px] object-cover w-full h-full shadow-md border-3 border-[#F3CEA0]"
                />
              </div>
            </div>

            <div className="flex flex-col w-1/3 justify-center content-center text-center">
              <div className="w-32 h-48 md:w-45 md:h-60 2xl:w-60 2xl:h-80">
                <img
                  src="https://i.pinimg.com/736x/24/3e/41/243e4165742e6e75744d85e16bb63a77.jpg"
                  alt=""
                  className="rounded-t-[150px] rounded-b-[10px] object-cover w-full h-full shadow-md border-3 border-[#D9C6B0]"
                />
              </div>
              <div className="flex flex-col">
                <p className="livros-area text-sm text-center font-bold mt-2">
                  La Jeune Fille au XVIII Siècle
                </p>
                <p className="text-xs text-center font-inter mb-2">
                  Léo Claretie
                </p>
              </div>
              
              
            </div>
          </div>
        </div>
        
        {/* Sessao esquerda do título e parágrafo */}
        <div className="flex flex-col justify-center items-start text-left w-1/2">
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
      <div className="content-center justify-center w-full grid grid-cols-2 gap-4 p-4 md:mt-10 md:grid md:grid-cols-4 md:gap-4 md:p-4 max-w-6xl mx-auto 2xl:mt-30">
        <ReportCard title={"Total de livros"} value={livros.length} image="https://i.pinimg.com/1200x/d6/33/f0/d633f0f54435a0d174a73e593d03acb4.jpg" />
        <ReportCard title={"Lendo agora"} value={(livros.filter((livro) => livro.genre === "Aventura").length)} image="https://i.pinimg.com/736x/07/2e/8d/072e8d9e2dd30564a030bbe6437e744a.jpg" />
        <ReportCard title={"Livros lidos"} value={(livros.filter((livro) => livro.status === "LIDO")).length} image="https://i.pinimg.com/736x/29/45/22/294522b8d609cb12c82028e85fb2a1fe.jpg"/>
        <ReportCard title={"Páginas lidas"} value={livros.reduce((total, livro) => total + livro.totalPaginasLidas, 0)} image="https://i.pinimg.com/1200x/a7/4b/17/a74b17e4fb43796327b1a12fea1ea05d.jpg"/>
      </div>

    <div/>
  </div>
  );
}
