import GoBackButton from "@/components/ui/custom-components/goBackButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/ui/custom-components/star";

export default function ViewBookPage() {
  return (
    <div className="flex flex-col h-screen">
      
    <div className="flex md:flex-row items-start md:items-center justify-between gap-3 p-4 md:p-8 lg:p-12">
        <GoBackButton />
      <div className="flex md:flex-row gap-2 md:gap-10">
        <Link href="/new-book">
          <Button size="sm">Editar Livro</Button>
        </Link>
      </div>
    </div>

      <main className="flex flex-col flex-1 items-center">
        <div className="p-4">
          <img
            src="/capa-got.jpg"
            alt="Capa do livro A Fúria dos Reis"
            className="w-48 h-50 object-cover rounded-md"
          />
        </div>

        <div className="w-full flex-1 flex flex-col p-4 bg-white">
            <h1 className="mb-2 text-[20px] font-bold">A fúria dos reis</h1>
            <h2 className="mb-2 text-[15px] text-gray-600">George R.R Martin</h2>
            <div className="flex mb-4 gap-2">
                <Badge variant="outline">Aventura</Badge>
                <Badge variant="outline">1998</Badge>
                <Badge variant="outline">648 páginas</Badge>
            </div>
            <StarRating rating={5} />
            <div className="flex-1 mt-3">
                <h3 className="font-semibold mb-2">Sinopse</h3>
                <p className="text-gray-700">
                    Em A fúria dos reis, seis facções disputam o controle de uma terra dividida
                    e o direito de ocupar o Trono de Ferro de Westeros - 
                    e estão dispostos a encarar tempestades, levantes e guerras para isso.
                </p>
            </div>
        
        </div>
      </main>
    </div>
  );
}
