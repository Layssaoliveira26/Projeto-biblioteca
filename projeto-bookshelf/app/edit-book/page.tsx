'use client'

import Link from 'next/link'
import GoBackButton from "@/components/ui/custom-components/goBackButton";
import { Button } from "@/components/ui/button";
import { IoMdArrowBack, IoMdImages } from "react-icons/io";
import { opcoesLeitura, options } from '@/lib/options';
import { StarRating } from "@/components/ui/custom-components/star";
import { useForm } from 'react-hook-form';
import { livros } from '@/lib/livros';
import { useEffect, useState } from 'react';
import { BookCardProps } from '../library/bookCard';
import { useLivros } from '@/context/LivrosContext';
import { title } from 'process';
import { FormData } from '../types/books';
import { redirect, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';


export default function EditBookPage() {
  const router = useRouter()
  const [successMessage, setSuccessMessage] = useState("");
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { register, handleSubmit, reset } = useForm<FormData>()
  const [dadosLivro, setDadosLivro] = useState<BookCardProps | null>(null);
  const [numStars, setNumStars] = useState(0)

  const [error, setError] = useState("");
  const [categorias, setCategorias] = useState<any>([])

  useEffect(() => {
    if (!id) return;

    async function fetchLivro() {
        try {
            const res = await fetch(`/api/books/${id}`, {method: "GET"});
            if (!res.ok) {
                const data = await res.json();
                setError(data.message || "Livro não encontrado.");
                return;
            }

            const data = await res.json();
            setDadosLivro(data);
            setNumStars(data.rating || 0)

            reset({
              title: data.title,
              author: data.author,
              qtdPages: data.pages,
              actualPage: data.totalPaginasLidas,
              isbn: data.isbn,
              url: data.cover,
              genreId: data.genreId?.toString() || data.genre?.id?.toString() || "",
              status: data.status,
              notes: data.synopsis || data.notes,
        });
        } catch (error) {
            setError("Erro de conexão");
        }
    }
  fetchLivro();
    
  }, [id, reset])

  useEffect(() => {
    async function fetchCategorias() {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategorias(data);
    }
    fetchCategorias();
  }, [])

  function limparEstrelas() {
    setNumStars(0);
  }

  function sumStars() {
    setNumStars(numStars+1);
  }

  const { atualizarLivro } = useLivros();

  async function onSubmit(userData: FormData): Promise<void> {

  const atualizacaoLivro = {
      id: dadosLivro?.id || "",
      title: userData.title,
      author: userData.author,
      year: dadosLivro?.year ?? new Date().getFullYear(), 
      pages: Number(userData.qtdPages) || 0,
      isbn: userData.isbn,
      status: userData.status, // Verifique se tem valor
      rating: numStars,
      synopsis: userData.notes,
      cover: userData.url || dadosLivro?.cover || "https://cdn-icons-png.flaticon.com/512/5999/5999928.png",
      totalPaginasLidas: Number(userData.actualPage) || 0,
      genreId: userData.genreId, // Já é string, converteremos na API
  };
  

  try {
    const res = await fetch(`/api/books/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(atualizacaoLivro)
    });


    if(!res.ok) {
      const errorData = await res.json();
      throw new Error(`Erro ${res.status}: ${errorData.error || errorData.details || "Erro desconhecido"}`);
    }

    const updatedBook = await res.json();
    await atualizarLivro(updatedBook);
    setSuccessMessage("Livro atualizado com sucesso!");
    setTimeout(() => setSuccessMessage(""), 2000);
    setTimeout(() => router.push('/library'), 2000) 
    
  } catch (error) {
    alert(`Erro ao atualizar livro: ${error instanceof Error ? error.message : "Erro desconhecido"}`);
  }
}

  return (
    <div className="w-full h-full bg-[#FFFFFF] md:p-8 lg:p-12 ">
      {/*Div como repartição um, com cor diferenciada*/}
      <div className='h-1/3 w-full bg-[#f9f8f6] p-4'>
        <GoBackButton />
        {/* Área do preview da capa do livro */}
        <div className='flex justify-center justify-items-center justify-content-center  '>
          <div className='w-3/8 bg-[#FFFEFE] p-4 mt-4 mb-2 justify-items-center  text-center border border-dashed border-gray-400 rounded-md'>
            <IoMdImages className='h-8 w-8 text-gray-400'/>
            <span className='text-xs text-gray-500'>Preview da capa <br/> do livro</span>
        </div>
      </div> 

      </div>
      {/* Área do progresso de leitura */}
      <div className='ml-5 mr-5 p-2 border border-gray-200 rounded-md border-1'>
        <p className='ml-2'>Progresso</p>
        <hr  className='h-1.5 bg-black m-2'/>
      </div>
      {/* Área dos inputs de preenchimento dos dados do livro */}
      <form onSubmit={handleSubmit(onSubmit)} className='m-4'>
        <h5 className='text-center mb-2 font-bold'>Informações da Obra</h5>
        <div className='flex flex-col'>
          <label className='ml-5'>Título</label>
          <input {...register("title")} type="text" placeholder='Ex.: Dom Casmurro' className='border border-gray-300 rounded rouded-sm h-8 ml-5 mr-5 pl-1.5' required/>
        </div>
        <div className='flex flex-col mt-2'>
          <label className='ml-5'>Autor</label>
          <input {...register("author")} type="text" placeholder='Ex.: Machado de Assis' className='border border-gray-300 rounded rouded-sm h-8 ml-5 mr-5 pl-1.5' required/>
        </div>
        <div className='flex'>
          <div className='flex flex-col mt-2 w-1/2'>
            <label className='ml-5'>Total de Páginas</label>
            <input {...register("qtdPages")} type="text" placeholder='Ex.: 150' className='border border-gray-300 rounded rouded-sm h-8 ml-5 mr-3 sm: pl-1.5'/>
          </div>
          <div className='flex flex-col mt-2 w-1/2'>
            <label className='ml-1'>Página Atual</label>
            <input {...register("actualPage")} type="text" placeholder='Ex.: 10' className='border border-gray-300 rounded rouded-sm h-8  mr-5 sm: pl-1.5'/>
          </div>
        </div>
        <div className='flex flex-col mt-2'>
          <label className='ml-5'>ISBN</label>
          <input {...register("isbn")} type="number" placeholder='Ex.: 9788533302273' className='border border-gray-300 rounded rouded-sm h-8 ml-5 mr-5 pl-1.5 '/>
        </div>
        <div className='flex flex-col mt-2'>
          <label className='ml-5'>URL da capa</label>
          <input {...register("url")} type="text" placeholder='Ex.: https://...' className='border border-gray-300 rounded rouded-sm h-8 ml-5 mr-5 pl-1.5'/>
        </div>
        <div className='flex'>
          <div className='flex flex-col mt-2 w-1/2'>
            <label className='ml-5'>Gênero</label>
            <select {...register("genreId")}  required  className='border border-gray-300 rounded rouded-sm h-8 ml-5 mr-5 pl-1.5 '>
              {categorias.map((option) => (
                <option key={option.id} value={option.id}>{option.genero}</option>
              ))}
            </select>
          </div>
          <div className='flex flex-col mt-2 w-1/2'>
          <label className='ml-1'>Status</label>
          <select 
            {...register("status")} 
            className='border border-gray-300 rounded rouded-sm h-8 mr-5 sm: pl-1.5 w-full'
          >
            {opcoesLeitura.map((opcaoLeitura) => (
              <option key={opcaoLeitura.status} value={opcaoLeitura.status}>
                {opcaoLeitura.status}
              </option>
            ))}
          </select>
        </div>
        </div>
        <div className='mt-3 ml-5'>
            <label className='ml-1'>Avaliação</label>
            <div className='flex items-center'>
              <div className='cursor-pointer' {...register("avaliation")} onClick={() => sumStars()}>
                <StarRating rating={numStars} />
              </div>
              <Button className='bg-[#fffff] text-gray-700 border text-xs ml-5' onClick={limparEstrelas}>
                Limpar
              </Button>
              <span className='ml-5 text-gray-700 text-sm'>{(numStars > 0)? "Com Avaliação": "Sem avaliação"}</span>
            </div>
        </div>
        <div className='flex flex-col mt-2'>
          <label className='ml-5'>Notas</label>
          <textarea {...register("notes")} className='border border-gray-300 rounded rouded-sm ml-5 mr-5 pl-1.5' placeholder='Anotações sobre o livro'></textarea>
        </div>

        {successMessage && (
          <div className="flex justify-center md:justify-center">
            <div className="bg-green-100 border border-green-400 text-green-700 
                            dark:bg-green-800 dark:border-green-600 dark:text-green-100
                            px-3 py-1 rounded-md mt-2 w-full max-w-xs text-center md:max-w-sm md:text-base">
              {successMessage}✅
            </div>
          </div>
        )}
        
        <div className='flex justify-center mt-4 mb-4'>
          <Button className='bg-[#252525] text-white font-semibold border text-xs ml-5 justify-center' >
            Editar
          </Button>
        </div>
      </form>
    </div>
  );
}
