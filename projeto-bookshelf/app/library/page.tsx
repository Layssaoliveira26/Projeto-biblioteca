import GoBackButton from "@/components/ui/custom-components/goBackButton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import BookCard from "./bookCard";
import { Input } from "@/components/ui/input"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"

export default function LibraryPage() {
  return (
    <div className="p-4 ">
      <div>
        <GoBackButton />
      </div>
      <div className="flex justify-between mt-6">
      <h1 className="text-2xl font-bold mb-4">Biblioteca</h1>
      <Link href="/new-book">
          <Button size="sm">Adicionar Livro</Button>
        </Link>
      </div>

    <div className="flex md:flex-row items-start md:items-center justify-between gap-3 p-4 md:p-8 lg:p-12">
      <Input type="" placeholder="Digite o nome do livro" />

      <Select>
        <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Gêneros" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="romance">Romance</SelectItem>
            <SelectItem value="aventura">Aventura</SelectItem>
            <SelectItem value="drama">Drama</SelectItem>
        </SelectContent>
    </Select>
    </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <BookCard 
          title="A Fúria do Reis" 
          author="George R.R. Martin" 
          imageSrc="/capa-got.jpg"
          gender="Aventura"
          date={1998}
        />
        <BookCard 
          title="Livro 2" 
          author="Autor 2" 
          imageSrc="/livro2.jpg" 
          gender = "Ação"
          date={1998}
        />
        <BookCard 
          title="Livro 2" 
          author="Autor 2" 
          imageSrc="/livro2.jpg" 
          gender = "Ação"
          date={1998}
        />
        <BookCard 
          title="Livro 2" 
          author="Autor 2" 
          imageSrc="/livro2.jpg" 
          gender = "Ação"
          date={1998}
        />
        <BookCard 
          title="Livro 2" 
          author="Autor 2" 
          imageSrc="/livro2.jpg" 
          gender = "Ação"
          date={1998}
        />
        <BookCard 
          title="Livro 2" 
          author="Autor 2" 
          imageSrc="/livro2.jpg" 
          gender = "Ação"
          date={1998}
        />
      </div>
    </div>
  );
}
