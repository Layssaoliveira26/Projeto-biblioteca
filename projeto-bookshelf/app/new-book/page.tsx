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
import ChangeTheme from "../dashboard/changeTheme";

type FormData = {
  title: string;
  author: string;
  qtdPages: string;
  actualPage: string;
  isbn: string;
  url: string;
  genre: string;
  status: string;
  avaliation?: string;
  notes: string;
};

export default function NewBookPage() {
  const { register, handleSubmit, reset, formState: { errors }, watch } = useForm<FormData>()
  const titleValue = watch("title");
  const authorValue = watch("author");
  const [numStars, setNumStars] = useState(0)
  const { addLivro, idLivro } = useLivros();
  const [coverUrl, setCoverUrl] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let filled = 0;
    if (titleValue) filled += 1;
    if (authorValue) filled += 1;
    const newProgress = (filled / 2) * 100;
    setProgress(newProgress);
  }, [titleValue, authorValue]);

  function limparEstrelas() {
    setNumStars(0);
  }

  function sumStars() {
    setNumStars(numStars + 1);
  }

  async function onSubmit(userData: FormData): Promise<void> {
    const novoLivro: BookCardProps = {
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
    };

    try {
      const res = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoLivro)
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Erro ${res.status}: ${errorText}`);
      }

      const createdBook = await res.json();
      addLivro(createdBook);
      reset();
      setNumStars(0);
      setCoverUrl("");
      setSuccessMessage("Livro cadastrado com sucesso!");
      setTimeout(() => setSuccessMessage(""), 3000);

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className='w-full bg-[var(--card)] p-1 md:p-8 lg:p-12'>
        <div className="flex justify-between mt-6 px-3 md:px-12 items-center">
          <GoBackButton />
          <div className='mr-5'>
            <ChangeTheme />
          </div>
        </div>

        <div className='flex justify-center items-center mt-6'>
          <div className={`text-center rounded-md flex justify-center items-center
            ${coverUrl 
              ? "bg-transparent p-0"
              : "w-[128px] h-[176px] sm:w-[160px] sm:h-[224px] md:w-[192px] md:h-[272px] p-4 border-2 border-dashed border-[var(--border)]"}`}
          >
            {coverUrl ? (
              <img
                src={coverUrl}
                alt="Preview da capa"
                className="w-[120px] h-[176px] sm:w-[160px] sm:h-[224px] md:w-[192px] md:h-[272px] object-cover rounded-md"
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
          <label className='ml-5'>Título</label>
          <input {...register("title", { required: "Título é obrigatório"})} type="text" placeholder='Ex.: Dom Casmurro' className='border rounded rouded-sm h-8 ml-5 mr-5 pl-1.5 border-[var(--border)]'/>
          {errors.title && (
            <span className="text-red-500 text-xs ml-5 mt-1 transition-opacity duration-500">{errors.title.message}</span>
          )}
        </div>

        <div className='flex flex-col mt-2'>
          <label className='ml-5'>Autor</label>
          <input {...register("author", { required: "Autor é obrigatório" })} type="text" placeholder='Ex.: Machado de Assis' className='border rounded rouded-sm h-8 ml-5 mr-5 pl-1.5 border-[var(--border)]'/>
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
            <select {...register("genre")} required name="genre" className='border border-[var(--border)] rounded rouded-sm h-8 ml-5 mr-5 pl-1.5 '>
              {options.map((optione, id) => (
                <option key={id} value={optione.genero}>{optione.genero}</option>
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
          <Button className='font-semibold border text-xs ml-5 justify-center border-[var(--border)]' >
            Cadastrar
          </Button>
        </div>
      </form>
    </div>
  );
}

