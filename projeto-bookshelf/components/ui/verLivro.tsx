'use client'

import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/ui/custom-components/star";
import { BookCardProps } from "@/app/library/bookCard";
import { useLivros } from "@/context/LivrosContext";

export default function DadoLivro({ id }: { id: string }) {
    const { livros } = useLivros();
    const livroVisto = livros.find((livro) => livro.id === id);

    if (!livroVisto) {
        return <div>Sem dados</div>
    }

    return (
        <main className="flex flex-col flex-1 items-center">
            <div className="p-4">
                <img
                    src={ livroVisto.cover }
                    alt="Capa do livro"
                    className="w-48 h-50 object-cover rounded-md"
                />
            </div>
            <div className="w-full flex-1 flex flex-col p-4 bg-white">
                <h1 className="mb-2 text-[20px] font-bold">{livroVisto.title}</h1>
                <h2 className="mb-2 text-[15px] text-gray-600">{livroVisto.author}</h2>
                <div className="flex mb-4 gap-2">
                    <Badge variant="outline">{livroVisto.genre}</Badge>
                    <Badge variant="outline">{livroVisto.year}</Badge>
                    <Badge variant="outline">{livroVisto.pages} páginas</Badge>
                </div>
                <StarRating rating={livroVisto.rating} />
                <div className="flex-1 mt-3">
                    <h3 className="font-semibold mb-2">{livroVisto.status} </h3>
                    <p className="text-gray-700">{livroVisto.synopsis}</p>
                </div>
            </div>
        </main>
    )
}
