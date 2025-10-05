'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CiTrash } from "react-icons/ci";
import { GoGear } from "react-icons/go";

interface Genre {
  genero: string;
}

export default function NewGenre({ 
  categorias, 
  setCategorias 
}: { 
  categorias: Genre[];
  setCategorias: React.Dispatch<React.SetStateAction<Genre[]>>;
}) {
  const [showModal, setShowModal] = useState(false);
  const [novoGenero, setNovoGenero] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (showModal) {
      loadGenres();
    }
  }, [showModal]);

  async function loadGenres() {
    try {
      setLoading(true);
      setError("");
      
      console.log("Buscando gêneros da API...");
      const response = await fetch('/api/categories');
      
      console.log("Status da resposta:", response.status);
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
      
      const genresFromApi = await response.json();
      console.log("Gêneros recebidos:", genresFromApi);
      
      setCategorias(genresFromApi);
      
    } catch (err: any) {
      console.error("Erro ao carregar gêneros:", err);
      setError(`Erro ao carregar gêneros: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function adicionarGenero() {
    if (!novoGenero.trim()) {
      setError("Digite um nome para o gênero");
      return;
    }

    try {
      setLoading(true);
      setError("");
      
      if (categorias.some(cat => cat.genero.toLowerCase() === novoGenero.toLowerCase())) {
        setError("Este gênero já existe");
        return;
      }

      console.log("Criando novo gênero:", novoGenero);
      
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ genero: novoGenero }),
      });

      const responseData = await response.json();
      console.log("Resposta do backend:", responseData);

      if (!response.ok) {
        throw new Error(responseData.error || `Erro ${response.status}`);
      }

      setCategorias(prev => [...prev, responseData]);
      setNovoGenero("");
      setError("");
      
    } catch (err: any) {
      console.error("Erro ao criar gênero:", err);
      setError(err.message || "Erro ao criar gênero");
    } finally {
      setLoading(false);
    }
  }

  async function removerGenero(genero: string, index: number) {
    const confirmDelete = window.confirm(`Tem certeza que deseja excluir o gênero "${genero}"?`);
    if (!confirmDelete) return;

    try {
      setLoading(true);
      setError("");
      
      console.log("Deletando gênero:", genero);
      
      const encodedGenero = encodeURIComponent(genero);
      
      const response = await fetch(`/api/categories/${encodedGenero}`, {
        method: 'DELETE',
      });

      console.log("Status da resposta DELETE:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Erro ${response.status}`);
      }

      const updated = [...categorias];
      updated.splice(index, 1);
      setCategorias(updated);
      
      console.log("Gênero deletado com sucesso");
      
    } catch (err: any) {
      console.error("Erro ao deletar gênero:", err);
      setError(err.message || "Erro ao deletar gênero");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    adicionarGenero();
  }

  function handleClose() {
    setShowModal(false);
    setError("");
    setNovoGenero("");
  }

  return (
    <>
      <Button
        size="sm"
        className="border border-[var(--border)] rounded-lg h-8 px-3 bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--hover)]"
        onClick={() => setShowModal(true)}
      >
        <GoGear />
      </Button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-[var(--card)] p-6 rounded-lg w-96 max-w-[90vw] shadow-lg relative">
            
            <h2 className="text-lg font-bold mb-4">Gerenciar Gêneros</h2>
            
            {/* Mensagem de erro */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded mb-4 text-sm">
                {error}
              </div>
            )}

            {/* Formulário para adicionar gênero */}
            <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
              <Input 
                placeholder="Novo gênero" 
                value={novoGenero} 
                onChange={(e) => {
                  setNovoGenero(e.target.value);
                  setError("");
                }}
                disabled={loading}
                className="flex-1"
              />
              <Button 
                type="submit" 
                disabled={loading || !novoGenero.trim()}
                className="min-w-20"
              >
                {loading ? "..." : "Add"}
              </Button>
            </form>

            {/* Lista de gêneros */}
            <div className="max-h-64 overflow-y-auto border rounded">
              {loading && categorias.length === 0 ? (
                <div className="text-center py-4">Carregando gêneros...</div>
              ) : categorias.length === 0 ? (
                <div className="text-center py-4 text-gray-500">
                  Nenhum gênero cadastrado
                </div>
              ) : (
                <div className="flex flex-col">
                  {categorias.map((cat, index) => (
                    <div 
                      key={index} 
                      className="flex justify-between items-center p-3 border-b last:border-b-0 hover:bg-gray-50"
                    >
                      <span className="font-medium">{cat.genero}</span>
                      <button
                        type="button"
                        disabled={loading}
                        onClick={() => removerGenero(cat.genero, index)}
                        className="text-red-500 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed p-1"
                      >
                        <CiTrash size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end mt-4">
              <Button 
                variant="outline" 
                onClick={handleClose}
                disabled={loading}
              >
                Fechar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}