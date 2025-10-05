'use client'

import Link from 'next/link'
import GoBackButton from "@/components/ui/custom-components/goBackButton";
import { Button } from "@/components/ui/button";
import { IoMdArrowBack, IoMdImages } from "react-icons/io";
import { opcoesLeitura, options } from '@/lib/options';
import { StarRating } from "@/components/ui/custom-components/star";
import { useForm } from 'react-hook-form';
import { useEffect, useState, Suspense } from 'react';
import { BookCardProps } from '../library/bookCard';
import { useSafeLivros } from '@/hooks/useLivros';
import { title } from 'process';
import { FormData } from '../types/books';
import { redirect, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import ChangeTheme from "../dashboard/changeTheme";

// Componente que usa useSearchParams
function EditBookContent() {
  const router = useRouter()
  const [successMessage, setSuccessMessage] = useState("");
  const [progress, setProgress] = useState(0);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { register, handleSubmit, reset, watch, setValue } = useForm<FormData>();
  const formValues = watch();
  const [dadosLivro, setDadosLivro] = useState<BookCardProps | null>(null);
  const [numStars, setNumStars] = useState(0)
  const [error, setError] = useState("");
  const [categorias, setCategorias] = useState<any>([])

  // CORREÇÃO: useSafeLivros retorna um objeto, não tem atualizarLivro direto
  const { livros } = useSafeLivros; // ← ADICIONADO

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
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        // CORREÇÃO: Garante que categorias seja sempre array
        setCategorias(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
        setCategorias([]); // Fallback para array vazio
      }
    }
    fetchCategorias();
  }, [])

  useEffect(() => {
    if (!dadosLivro) return;

    let filled = 0;
    const totalFields = 2;

    if (formValues.title) filled += 1;
    if (formValues.author) filled += 1;

    const newProgress = (filled / totalFields) * 100;
    setProgress(newProgress);
  }, [formValues, dadosLivro]);

  function limparEstrelas() {
    setNumStars(0);
  }

  function sumStars() {
    if (numStars < 5) {
      setNumStars(numStars + 1);
    }
  }

  // CORREÇÃO: Função atualizarLivro removida - não existe no useSafeLivros
  async function onSubmit(userData: FormData): Promise<void> {
    const atualizacaoLivro = {
      id: dadosLivro?.id || "",
      title: userData.title,
      author: userData.author,
      year: dadosLivro?.year ?? new Date().getFullYear(), 
      pages: Number(userData.qtdPages) || 0,
      isbn: userData.isbn,
      status: userData.status,
      rating: numStars,
      synopsis: userData.notes,
      cover: userData.url || dadosLivro?.cover || "https://cdn-icons-png.flaticon.com/512/5999/5999928.png",
      totalPaginasLidas: Number(userData.actualPage) || 0,
      genreId: userData.genreId,
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
      setSuccessMessage("Livro atualizado com sucesso!");
      
      setTimeout(() => {
        setSuccessMessage("");
        router.push('/library');
      }, 2000);
      
    } catch (error) {
      alert(`Erro ao atualizar livro: ${error instanceof Error ? error.message : "Erro desconhecido"}`);
    }
  }

  return (
    <div className="flex flex-col h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Header */}
      <div className='w-full bg-[var(--card)]'>
        <div className="flex md:flex-row items-start md:items-center justify-between gap-3 p-4 md:p-8 lg:p-12">
          <GoBackButton />
          <div>
            <ChangeTheme />
          </div>
        </div>
        
        {/* Preview da capa */}
        <div className='flex justify-center items-center mt-3 mb-6 md:mb-6'>
          {formValues.url || dadosLivro?.cover ? (
            <img
              src={formValues.url || dadosLivro?.cover}
              alt="Preview da capa"
              className="w-[110px] h-[160px] sm:w-[128px] sm:h-[180px] md:w-[160px] md:h-[220px] object-cover rounded-md"
              onError={(e) => e.currentTarget.src = "https://cdn-icons-png.flaticon.com/512/5999/5999928.png"}
            />
          ) : (
            <div className="flex flex-col items-center text-gray-500">
              <IoMdImages className='h-8 w-8 text-gray-400'/>
              <span className='text-xs text-center mt-2'>Preview da capa<br/>do livro</span>
            </div>
          )}
        </div> 
      </div>

      {/* Progresso */}
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

      {/* Formulário */}
      <form onSubmit={handleSubmit(onSubmit)} className='m-4'>
        <h5 className='text-center mb-2 font-bold'>Informações da Obra</h5>
        
        <div className='flex flex-col'>
          <label className='ml-5'>Título</label>
          <input {...register("title")} type="text" placeholder='Ex.: Dom Casmurro' className='border border-[var(--border)] rounded h-8 ml-5 mr-5 pl-1.5' required/>
        </div>
        
        <div className='flex flex-col mt-2'>
          <label className='ml-5'>Autor</label>
          <input {...register("author")} type="text" placeholder='Ex.: Machado de Assis' className='border border-[var(--border)] rounded h-8 ml-5 mr-5 pl-1.5' required/>
        </div>
        
        <div className='flex'>
          <div className='flex flex-col mt-2 w-1/2'>
            <label className='ml-5'>Total de Páginas</label>
            <input {...register("qtdPages")} type="text" placeholder='Ex.: 150' className='border border-[var(--border)] rounded h-8 ml-5 mr-3 pl-1.5'/>
          </div>
          <div className='flex flex-col mt-2 w-1/2'>
            <label className='ml-1'>Página Atual</label>
            <input {...register("actualPage")} type="text" placeholder='Ex.: 10' className='border border-[var(--border)] rounded h-8 mr-5 pl-1.5'/>
          </div>
        </div>
        
        <div className='flex flex-col mt-2'>
          <label className='ml-5'>ISBN</label>
          <input {...register("isbn")} type="number" placeholder='Ex.: 9788533302273' className='border border-[var(--border)] rounded h-8 ml-5 mr-5 pl-1.5'/>
        </div>
        
        <div className='flex flex-col mt-2'>
          <label className='ml-5'>URL da capa</label>
          <input {...register("url")} type="text" placeholder='Ex.: https://...' className='border border-[var(--border)] rounded h-8 ml-5 mr-5 pl-1.5'/>
        </div>
        
        <div className='flex'>
          <div className='flex flex-col mt-2 w-1/2'>
            <label className='ml-5'>Gênero</label>
            <select {...register("genreId")} required className='border border-gray-300 rounded h-8 ml-5 mr-3 pl-1.5'>
              {/* CORREÇÃO: categorias sempre é array */}
              {Array.isArray(categorias) && categorias.map((option: any) => (
                <option key={option.id} value={option.id}>{option.genero}</option>
              ))}
            </select>
          </div>
          
          <div className='flex flex-col mt-2 w-1/2'>
            <label className='ml-1'>Status</label>
            <select 
              {...register("status")} 
              className='border border-gray-300 rounded h-8 mr-5 pl-1.5 w-full'
            >
              {Array.isArray(opcoesLeitura) && opcoesLeitura.map((opcaoLeitura: any) => (
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
            <div className='cursor-pointer' onClick={sumStars}>
              <StarRating rating={numStars} />
            </div>
            <Button type="button" className='border border-[var(--border)] text-xs ml-5' onClick={limparEstrelas}>
              Limpar
            </Button>
            <span className='ml-5 text-sm'>{(numStars > 0) ? "Com Avaliação" : "Sem avaliação"}</span>
          </div>
        </div>
        
        <div className='flex flex-col mt-2'>
          <label className='ml-5'>Notas</label>
          <textarea {...register("notes")} className='border border-[var(--border)] rounded ml-5 mr-5 pl-1.5' placeholder='Anotações sobre o livro'></textarea>
        </div>

        <div className='flex justify-center mt-4 mb-4'>
          <Button type="submit" className='font-semibold border border-[var(--border)] text-xs'>
            Editar
          </Button>
        </div>
      </form>
    </div>
  );
}

// Componente principal com Suspense
export default function EditBookPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <EditBookContent />
    </Suspense>
  );
}