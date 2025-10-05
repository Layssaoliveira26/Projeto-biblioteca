'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CiTrash } from "react-icons/ci";
import { GoGear } from "react-icons/go";

interface NewGenreProps {
  categorias: { genero: string }[];
  setCategorias: React.Dispatch<React.SetStateAction<{ genero: string }[]>>;
  className?: string;
}

export default function NewGenre({ categorias, setCategorias }: NewGenreProps) {
  const [showModal, setShowModal] = useState(false);
  const [novoGenero, setNovoGenero] = useState("");
  const [openConfirm, setOpenConfirm] = useState<number | null>(null);

  function adicionarGenero() {
    if (!novoGenero.trim()) return;
    setCategorias([...categorias, { genero: novoGenero }]);
    setNovoGenero("");
  }

  function solicitarExclusao(index: number) {
    setOpenConfirm(index);
  }

  function confirmarExclusao(index: number) {
    const updated = [...categorias];
    updated.splice(index, 1);
    setCategorias(updated);
    setOpenConfirm(null);
  }

  return (
    <>
      <Button
        size="sm"
        className="border border-[var(--border)] rounded rouded-lg h-8 px-3 bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--hover)]"
        onClick={() => setShowModal(true)}
      >
        <GoGear />
      </Button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
          <div className="bg-[var(--card)] p-6 rounded-lg w-96 shadow-lg relative
                 transform transition-all duration-300 ease-out
                 scale-95 opacity-0 animate-modalIn">
            <h2 className="text-lg font-bold mb-4">Gêneros</h2>

            <div className="flex gap-2 mb-4">
              <Input 
                placeholder="Novo gênero" 
                value={novoGenero} 
                onChange={(e) => setNovoGenero(e.target.value)} 
              />
              <Button onClick={adicionarGenero}>Adicionar</Button>
            </div>

            <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
              {categorias.map((cat, index) => (
                <div 
                  key={index} 
                  className="flex justify-between items-center bg-[var(--background)] p-2 rounded relative"
                >
                  <span>{cat.genero}</span>
                  <CiTrash 
                    className="cursor-pointer text-red-500 hover:text-red-700" 
                    onClick={() => solicitarExclusao(index)} 
                  />

                  {openConfirm === index && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
                      <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-xl w-[90%] max-w-md p-6">
                        <h2 className="text-lg font-bold text-red-600">Confirmar Exclusão</h2>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                          Tem certeza que deseja excluir este gênero?  
                          <br />
                          Esta ação não pode ser desfeita.
                        </p>

                        <div className="flex justify-end gap-2 mt-6">
                          <Button variant="outline" onClick={() => setOpenConfirm(null)}>
                            Cancelar
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => confirmarExclusao(index)}
                          >
                            Excluir
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <Button 
              variant="default" 
              className="mt-4" 
              onClick={() => setShowModal(false)}
            >
              Fechar
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
