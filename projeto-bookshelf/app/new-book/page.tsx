'use client'

import Link from 'next/link'
import GoBackButton from "@/components/ui/custom-components/goBackButton";
import { Button } from "@/components/ui/button";
import { IoMdArrowBack, IoMdImages } from "react-icons/io";
import { opcoesLeitura, options } from '@/lib/options';
import { StarRating } from "@/components/ui/custom-components/star";
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { BookCardProps } from '../library/bookCard';
import { useLivros } from '@/context/LivrosContext';
import { title } from 'process';
import { FormData } from '../types/books';
import ChangeTheme from "../dashboard/changeTheme";
import { useRouter } from 'next/navigation';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function NewBookPage() {
  const router = useRouter();
  const { register, handleSubmit, reset, formState: { errors }, watch } = useForm<FormData>()

  const titleValue = watch("title");
  const authorValue = watch("author");
  const qtdPagesValue = watch("qtdPages");
  const actualPageValue = watch("actualPage");
  const isbnValue = watch("isbn");
  const urlValue = watch("url");
  const genreValue = watch("genreId");
  const statusValue = watch("status");
  const notesValue = watch("notes");
  const [numStars, setNumStars] = useState(0)
  const [coverUrl, setCoverUrl] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState("");
  const [progress, setProgress] = useState(0);
  const [categorias, setCategorias] = useState<any>([])
  
// =======
//   const [customGenre, setCustomGenre] = useState("");
//   const [isCustomGenre, setIsCustomGenre] = useState(false);

// >>>>>>> origin/Raquel
  useEffect(() => {
    const fields = [
      titleValue,
      authorValue,
      qtdPagesValue,
      actualPageValue,
      isbnValue,
      urlValue,
      genreValue,
      statusValue,
      notesValue,
    ];
  
    const filled = fields.filter((f) => {
      if (typeof f === "string") {
        return f.trim() !== "";
      }
      return f !== undefined && f !== null;
    }).length;
    const total = fields.length;
    const newProgress = Math.min((filled / total) * 100, 100);
  
    setProgress(newProgress);
  }, [
    titleValue,
    authorValue,
    qtdPagesValue,
    actualPageValue,
    isbnValue,
    urlValue,
    genreValue,
    statusValue,
    notesValue,
  ]);

  /*useEffect(() => { usado anteriormente para progresso apenas com obrigatorios
    let filled = 0;
    if (titleValue) filled += 1;
    if (authorValue) filled += 1;
    const newProgress = (filled / 2) * 100;
    setProgress(newProgress);
  }, [titleValue, authorValue]);*/

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
    setNumStars(numStars + 1);
  }

  async function onSubmit(userData: FormData): Promise<void> {
    const selectedGenero = userData.genreId;
    const selectedGenreObj = categorias.find((cat: any) => cat.genero === selectedGenero);

    const novoLivro: BookCardProps = {
      id: "",
      title: userData.title,
      author: userData.author,
      genre: selectedGenreObj ? selectedGenreObj.id : 1,
      year: new Date().getFullYear(),
      pages: Number(userData.qtdPages),
      rating: numStars,
      synopsis: userData.notes,
      cover: userData.url || "https://cdn-icons-png.flaticon.com/512/5999/5999928.png",
      status: userData.status,
      totalPaginasLidas: String(userData.actualPage || "0"),
      onDelete: () => {}
  };

    try {
      const res = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoLivro)
        
      });

      console.log(res)
      
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Erro ${res.status}: ${errorText}`);
      
      }

      // const createdBook = await res.json();
      // addLivro(createdBook);
      reset();
      setNumStars(0);
      setCoverUrl("");
      setSuccessMessage("Livro cadastrado com sucesso!");
      setTimeout(() => setSuccessMessage(""), 2000);
      setTimeout(() => router.push('/library'), 2000) 

      } catch (error) {
          console.error(error);
      }
    }
  

  return (
    <div className="flex flex-col h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className='w-full bg-[var(--card)] p-1 md:p-8 lg:p-12'>
        <div className="flex justify-between mt-6 px-3 md:mt-0 md:px-0 items-center">
          <GoBackButton />
          <div className='mr-5'>
            <ChangeTheme />
          </div>
        </div>

        <div className='flex justify-center items-center mb-2 md:mb-0 mt-6'>
          <div className={`text-center rounded-md flex justify-center items-center
            ${coverUrl 
              ? "bg-transparent p-0"
              : "w-[110px] h-[160px] sm:w-[128px] sm:h-[180px] md:w-[160px] md:h-[220px] p-4 border-2 border-dashed border-[var(--border)]"}`}
          >
            {coverUrl ? (
              <img
                src={coverUrl}
                alt="Preview da capa"
                className="w-[110px] h-[160px] sm:w-[128px] sm:h-[180px] md:w-[160px] md:h-[220px] object-cover rounded-md"
                onError={(e) => (e.currentTarget.src = "https://cdn-icons-png.flaticon.com/512/5999/5999928.png")}
              />
            ) : (
              <>
                <IoMdImages className='h-8 w-8 text-gray-400'/>
                <span className='text-xs '>Preview da capa <br/> do livro</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className='ml-5 mr-5 p-2 border rounded-md border-1 border-[var(--border)]'>
        <p className='ml-2'>Progresso</p>
        <div className='h-1.5 bg-gray-200 m-2 rounded'>
          <div className='h-full bg-black' style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='m-4'>
        <h5 className='text-center mb-2 font-bold'>Informações da Obra</h5>

        <div className='flex flex-col'>
          <label className='ml-5'>Título <span style={{ color: 'red' }}>*</span> </label>
          <input 
            {...register("title")} 
            type="text" 
            placeholder='Ex.: Dom Casmurro' 
            required 
            className='border rounded rouded-sm h-8 ml-5 mr-5 pl-1.5 border-[var(--border)]'
          />
          {errors.title && (
            <span className="text-red-500 text-xs ml-5 mt-1 transition-opacity duration-500">
              {errors.title.message}
            </span>
          )}
        </div>


        <div className='flex flex-col mt-2'>
          <label className='ml-5'>Autor <span style={{ color: 'red' }}>*</span> </label>
          <input 
            {...register("author")} 
            type="text" 
            placeholder='Ex.: Machado de Assis' 
            required 
            className='border rounded rouded-sm h-8 ml-5 mr-5 pl-1.5 border-[var(--border)]'
          />
          {errors.author && (
            <span className="text-red-500 text-xs ml-5 mt-1">{errors.author.message}</span>
          )}
        </div>

        <div className='flex'>
          <div className='flex flex-col mt-2 w-1/2'>
            <label className='ml-5'>Total de Páginas</label>
            <input {...register("qtdPages")} type="text" placeholder='Ex.: 150' className='border rounded rouded-sm h-8 ml-5 mr-3 pl-1.5 border-[var(--border)]'/>
          </div>
          <div className='flex flex-col mt-2 w-1/2'>
            <label className='ml-1'>Página Atual</label>
            <input {...register("actualPage")} type="text" placeholder='Ex.: 10' className='border rounded rouded-sm h-8 mr-5 pl-1.5 border-[var(--border)]'/>
          </div>
        </div>

        <div className='flex flex-col mt-2'>
          <label className='ml-5'>ISBN</label>
          <input {...register("isbn")} type="number" placeholder='Ex.: 9788533302273' className='border rounded rouded-sm h-8 ml-5 mr-5 pl-1.5 border-[var(--border)]'/>
        </div>

        <div className='flex flex-col mt-2'>
          <label className='ml-5'>URL da capa</label>
          <input {...register("url")} type="text" placeholder='Ex.: https://...' className='border rounded rouded-sm h-8 ml-5 mr-5 pl-1.5 border-[var(--border)]'
            onChange={(e) => setCoverUrl(e.target.value)}
          />
        </div>

        <div className='flex'>
          <div className='flex flex-col mt-2 w-1/2'>
            <label className='ml-5'>Gênero</label>
            <select {...register("genreId")} required className='border border-[var(--border)] rounded rouded-sm h-8 ml-5 mr-5 pl-1.5 '>
              {categorias.map((optione: any) => (
                <option key={optione.id} value={optione.genero}>{optione.genero}</option>
              ))}
            </select>
          </div>
          <div className='flex flex-col mt-2'>
            <label className='ml-1'>Status</label>
            <select {...register("status")} name="" className='border rounded rouded-sm h-8 mr-5 pl-1.5 w-full border-[var(--border)]'>
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
              <StarRating rating={numStars} />
            </div>
            <Button className='border text-xs ml-5' onClick={limparEstrelas}>
              Limpar
            </Button>
            <span className='ml-5 text-sm'>{(numStars > 0)? "Com Avaliação": "Sem avaliação"}</span>
          </div>
        </div>

        <div className='flex flex-col mt-2'>
          <label className='ml-5'>Notas</label>
          <textarea {...register("notes")} className='border rounded rouded-sm ml-5 mr-5 pl-1.5 border-[var(--border)]' placeholder='Anotações sobre o livro'></textarea>
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
          <Button type='submit' className='font-semibold border text-xs ml-5 justify-center border-[var(--border)]' >
            Cadastrar
          </Button>
        </div>
      </form>
    </div>
  );
}

