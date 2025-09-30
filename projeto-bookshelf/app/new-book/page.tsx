'use client'

import Link from 'next/link'
import GoBackButton from "@/components/ui/custom-components/goBackButton";
import { Button } from "@/components/ui/button";
import { IoMdArrowBack, IoMdImages } from "react-icons/io";
import { opcoesLeitura, options } from '@/lib/options';
import { StarRating } from "@/components/ui/custom-components/star";
import { useForm } from 'react-hook-form';
import { livros } from '@/lib/livros';
import { useState } from 'react';
import { BookCardProps } from '../library/bookCard';
import { useLivros } from '@/context/LivrosContext';
import { title } from 'process';
import { FormData } from '../types/books';


export default function NewBookPage() {
  const { register, handleSubmit, reset } = useForm<FormData>()
  const [numStars, setNumStars] = useState(0)
  const { addLivro, addId, idLivro } = useLivros();

  function limparEstrelas() {
    setNumStars(0);
  }

  function sumStars() {
    setNumStars(numStars+1);
  }

  async function onSubmit(userData: FormData): Promise<void> {
    console.log(">>> userData recebido do form:", userData);

    const novoLivro:BookCardProps = {
          id: "",
          title: userData.title,
          author: userData.author,
          genre: userData.genre,
          year: new Date().getFullYear(),
          pages: Number(userData.qtdPages),
          rating: numStars,
          synopsis: userData.notes,
          cover: userData.url || "https://cdn-icons-png.flaticon.com/512/5999/5999928.png",
          status: userData.status,
          totalPaginasLidas: Number(userData.actualPage),
          onDelete: () => {}
      }
    
    try {
      const res = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify(novoLivro)
      })
      console.log(res.ok)

      if(!res.ok) {
      const errorText = await res.text();
      console.error("Conteúdo do erro:", errorText);
      throw new Error(`Erro ${res.status}: ${errorText}`);
    }

      const createdBook = await res.json();
      console.log("Livro cadastrado")

      addLivro(createdBook);
      // addId();
      reset();
      setNumStars(0);
    } catch (error) {
      console.error(error)
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
            <select {...register("genre")}  required name="genre" className='border border-gray-300 rounded rouded-sm h-8 ml-5 mr-5 pl-1.5 '>
              {options.map((optione, id) => (
                <option key={id} value={optione.genero}>{optione.genero}</option>
              ))}
            </select>
          </div>
          <div className='flex flex-col mt-2'>
            <label className='ml-1'>Status</label>
            <select {...register("status")} name="" className='border border-gray-300 rounded rouded-sm h-8 mr-5 sm: pl-1.5 w-full'>
              {opcoesLeitura.map((opcaoLeitura, id) => (
                <option key={id} value={opcaoLeitura.status}>{opcaoLeitura.status}</option>
              ))}
            </select>
          </div>
        </div>
        <div className='mt-3 ml-5'>
            <label className='ml-1'>Avaliação</label>
            <div className='flex items-center'>
              <div className='cursor-pointer' onClick={() => sumStars()}>
                <StarRating  rating={numStars} />
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
        <div className='flex justify-center mt-4 mb-4'>
          <Button className='bg-[#252525] text-white font-semibold border text-xs ml-5 justify-center' >
            Cadastrar
          </Button>
        </div>
      </form>
    </div>
  );
}
