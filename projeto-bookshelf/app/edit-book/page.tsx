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
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import ChangeTheme from "../dashboard/changeTheme";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";


export default function EditBookPage() {
  const [progress, setProgress] = useState(0);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { register, handleSubmit, reset, watch, setValue } = useForm<FormData>();
  const formValues = watch();
  const [dadosLivro, setDadosLivro] = useState<BookCardProps | null>(null);
  const [numStars, setNumStars] = useState(0)
  const { addLivro, addId, idLivro } = useLivros();
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");


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
            
            reset({
                title: data.title,
                author: data.author,
                qtdPages: data.pages,
                actualPage: data.totalPaginasLidas,
                isbn: data.isbn,
                url: data.cover,
                genre: data.genre,
                status: data.status,
                notes: data.synopsis,
                avaliation: data.rating

            })
        } catch (error) {
            setError("Erro de conexão");
        }
    }
    fetchLivro();
    
  }, [id])

  useEffect(() => {
    if (!dadosLivro) return;

    let filled = 0;
    const totalFields = 2;

    if (formValues.title) filled += 1;
    if (formValues.author) filled += 1;

    const newProgress = (filled / totalFields) * 100;
    setProgress(newProgress);
  }, [formValues]);

  function limparEstrelas() {
    setNumStars(0);
  }

  function sumStars() {
    setNumStars(numStars+1);
  }

  async function onSubmit(userData: FormData): Promise<void> {

    const atualizacaoLivro: BookCardProps = {
        id: dadosLivro?.id || "",
        title: userData.title,
        author: userData.author,
        genre: userData.genre,
        year: dadosLivro?.year ?? new Date().getFullYear(), 
        pages: Number(userData.qtdPages),
        rating: numStars,
        synopsis: userData.notes,
        cover: userData.url || dadosLivro?.cover || "https://cdn-icons-png.flaticon.com/512/5999/5999928.png",
        status: userData.status,
        totalPaginasLidas: Number(userData.actualPage),
        onDelete: () => {}
    };
    
    try {
      const res = await fetch('/api/books/${1}', {
        method: 'UPDATE',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify(atualizacaoLivro)
      })
      console.log(res.ok)

      if(!res.ok) {
      const errorText = await res.text();
      console.error("Conteúdo do erro:", errorText);
      throw new Error(`Erro ${res.status}: ${errorText}`);
    }

      const updatedBook = await res.json();
      console.log("Livro atualizado")

      addLivro(updatedBook);
      // addId();
      reset();
      setNumStars(0);

      setSuccessMessage("Alterações salvas com sucesso!");
      setTimeout(() => setSuccessMessage(""), 3000);

    } catch (error) {
      console.error(error)
    }
      
  }

  return (
    <div className="flex flex-col h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/*Div como repartição um, com cor diferenciada*/}
      <div className='w-full bg-[var(--card)]'>
        <div className="flex md:flex-row items-start md:items-center justify-between gap-3 p-4 md:p-8 lg:p-12">
          <GoBackButton />
          <div>
            <ChangeTheme />
          </div>
        </div>
        {/* Área do preview da capa do livro */}
        <div className='flex justify-center items-center mt-3 mb-6 md:mb-6'>
         {formValues.url || dadosLivro?.cover ? (
            <img
              src={formValues.url || dadosLivro?.cover}
              alt="Preview da capa"
              className="w-[110px] h-[160px] sm:w-[128px] sm:h-[180px] md:w-[160px] md:h-[220px] object-cover rounded-md"
              onError={(e) => e.currentTarget.src = "https://cdn-icons-png.flaticon.com/512/5999/5999928.png"}
            />
          ) : (
            <>
              <IoMdImages className='h-8 w-8 text-gray-400'/>
              <span className='text-xs text-gray-500'>Preview da capa <br/> do livro</span>
            </>
          )}
      </div> 

      </div>
      {/* Área do progresso de leitura */}
      <div className='ml-5 mr-5 p-2 border rounded-md border-1 border-[var(--border)]'>
        <p className='ml-2'>Progresso</p>
        <div className='h-1.5 bg-gray-200 m-2 rounded'>
          <div className='h-full bg-black' style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      {successMessage && (
        <div className="m-4 p-2 rounded bg-green-100 text-green-800 text-center">
          {successMessage}
        </div>
      )}

      {/* Área dos inputs de preenchimento dos dados do livro */}
      <form onSubmit={handleSubmit(onSubmit)} className='m-4'>
        <h5 className='text-center mb-2 font-bold'>Informações da Obra</h5>
        <div className='flex flex-col'>
          <label className='ml-5'>Título</label>
          <input {...register("title")} type="text" placeholder='Ex.: Dom Casmurro' className='border border-[var(--border)] rounded rouded-sm h-8 ml-5 mr-5 pl-1.5' required/>
        </div>
        <div className='flex flex-col mt-2'>
          <label className='ml-5'>Autor</label>
          <input {...register("author")} type="text" placeholder='Ex.: Machado de Assis' className='border border-[var(--border)] rounded rouded-sm h-8 ml-5 mr-5 pl-1.5' required/>
        </div>
        <div className='flex'>
          <div className='flex flex-col mt-2 w-1/2'>
            <label className='ml-5'>Total de Páginas</label>
            <input {...register("qtdPages")} type="text" placeholder='Ex.: 150' className='border border-[var(--border)] rounded rouded-sm h-8 ml-5 mr-3 sm: pl-1.5'/>
          </div>
          <div className='flex flex-col mt-2 w-1/2'>
            <label className='ml-1'>Página Atual</label>
            <input {...register("actualPage")} type="text" placeholder='Ex.: 10' className='border border-[var(--border)] rounded rouded-sm h-8  mr-5 sm: pl-1.5'/>
          </div>
        </div>
        <div className='flex flex-col mt-2'>
          <label className='ml-5'>ISBN</label>
          <input {...register("isbn")} type="number" placeholder='Ex.: 9788533302273' className='border border-[var(--border)] rounded rouded-sm h-8 ml-5 mr-5 pl-1.5 '/>
        </div>
        <div className='flex flex-col mt-2'>
          <label className='ml-5'>URL da capa</label>
          <input {...register("url")} type="text" placeholder='Ex.: https://...' className='border border-[var(--border)] rounded rouded-sm h-8 ml-5 mr-5 pl-1.5'/>
        </div>
        <div className='flex'>
          <div className='flex flex-col mt-2'>
            <label className='ml-5'>Gênero</label>
            <Select
              onValueChange={(value) => setValue("genre", value)}
              defaultValue={watch("genre")}
            >
              <SelectTrigger className='border border-[var(--border)] rounded rouded-sm h-8 ml-5 mr-5 pl-1.5 w-36 sm:w-44'>
                <SelectValue placeholder="Selecione o gênero" />
              </SelectTrigger>
              <SelectContent>
                {options.map((optione, id) => (
                  <SelectItem key={id} value={optione.genero}>
                    {optione.genero}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='flex flex-col mt-2'>
            <label className='ml-1'>Status</label>
            <Select
              onValueChange={(value) => setValue("status", value)}
              defaultValue={watch("status")}
            >
              <SelectTrigger className='border border-[var(--border)] rounded rouded-sm h-8 mr-5 pl-1.5 w-36 sm:w-44'>
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                {opcoesLeitura.map((opcaoLeitura, id) => (
                  <SelectItem key={id} value={opcaoLeitura.status}>
                    {opcaoLeitura.status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className='mt-3 ml-5'>
            <label className='ml-1'>Avaliação</label>
            <div className='flex items-center'>
              <div className='cursor-pointer' {...register("avaliation")} onClick={() => sumStars()}>
                <StarRating rating={numStars} />
              </div>
              <Button className=' border border-[var(--border)] text-xs ml-5' onClick={limparEstrelas}>
                Limpar
              </Button>
              <span className='ml-5 text-sm'>{(numStars > 0)? "Com Avaliação": "Sem avaliação"}</span>
            </div>
        </div>
        <div className='flex flex-col mt-2'>
          <label className='ml-5'>Notas</label>
          <textarea {...register("notes")} className='border border-[var(--border)] rounded rouded-sm ml-5 mr-5 pl-1.5' placeholder='Anotações sobre o livro'></textarea>
        </div>
        <div className='flex justify-center mt-4 mb-4'>
          <Button className='font-semibold border border-[var(--border)] text-xs ml-5 justify-center' >
            Editar
          </Button>
        </div>
      </form>
    </div>
  );
}
