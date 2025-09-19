import GoBackButton from "@/components/ui/custom-components/goBackButton";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import { StarRating } from "@/components/ui/custom-components/star";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"

export default function NewBookPage() {
  return (
    <div className="flex flex-col h-screen">
      <div className="p-3 ">
        <GoBackButton />
      </div>
      <main className="flex flex-col items-center">
        <div className="p-4">
          <img
            src="/capa-got.jpg"
            alt="Capa do livro A Fúria dos Reis"
            className="w-48 h-50 object-cover rounded-md"
          />
        </div>

        <div className="w-full flex flex-col p-4 bg-white">
        <div className="p-2 rounded-lg border shadow-sm mb-4">
            <p className="mb-2 text-sm">Progresso</p>
          <Progress value={50} className=" mx-auto" />
        </div>
          <h1 className="mb-3">Informações necessárias para cadastro da obra</h1>
           
           <div className="grid w-full max-w-sm items-center gap-3">
                <Label htmlFor="titulo">Título</Label>
                <Input type="text" id="titulo" placeholder="Digite o título do livro" />
                <Label htmlFor="autor">Autor</Label>
                <Input type="text" id="autor" placeholder="Digite o nome do autor" />
            
            <div className="flex gap-6 w-full max-w-md">
  
            <div className="flex-1">
                <Label htmlFor="paginaAtual" className="mb-3">Página atual</Label>
                <Input type="number" id="paginaAtual" placeholder="Ex: 120" />
            </div>

            <div className="flex-1">
                <Label htmlFor="totalPaginas" className="mb-3">Total de páginas</Label>
                <Input type="number" id="totalPaginas" placeholder="Ex: 450" />
            </div>
            </div>

                <Label htmlFor="isbn">ISBN</Label>
                <Input type="text" id="isbn" placeholder="Digite o número de identificação do livro" />
                <Label htmlFor="URLCapa">URL da Capa</Label>
                <Input type="url" id="URLCapa" placeholder="Cole a URL da capa" />
            </div>

            <div className="mt-3 flex w-full max-w-md">
            <div className="flex-1">
                <Label htmlFor="gênero" className="mb-3">Gênero</Label>
                <Select>
                    <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="Gêneros" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="romance">Romance</SelectItem>
                        <SelectItem value="aventura">Aventura</SelectItem>
                        <SelectItem value="drama">Drama</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex-1">
                <Label htmlFor="status" className="mb-3">Status</Label>
                <Select>
                    <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="quero ler">Quero Ler</SelectItem>
                        <SelectItem value="já li">Já li</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            </div>

            <div className="mt-3 w-full max-w-md">
                <Label htmlFor="avaliacao">Avaliação</Label>
            <div className="flex items-center gap-3">
                <StarRating rating={0} />
                <Button>Limpar</Button>
                <Button variant="secondary">Sem avaliação</Button>
            </div>
            </div>

            <div className="flex-1 mt-3">
                <Label htmlFor="notas" className="mb-3">Notas</Label>
                <Textarea placeholder="Escreva sua mensagem aqui" />
            </div>

            <div className="flex justify-center mt-4">
                <Button>Salvar</Button>
            </div>
        </div>
      </main>
    </div>
  );
}
