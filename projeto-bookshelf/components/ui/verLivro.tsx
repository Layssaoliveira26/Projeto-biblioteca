'use client'

import { BookCardProps } from "@/app/library/bookCard";
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/ui/custom-components/star";

export default function DadoLivro({ livro }: { livro: BookCardProps }) {
    const { genre } = livro as any;

    return (
        <main className="flex flex-col h-full w-full items-center">
            <div className="p-4">
                <img
                    src={ livro.cover }
                    alt="Capa do livro"
                    className="w-[110px] h-[160px] sm:w-[128px] sm:h-[180px] md:w-[160px] md:h-[220px] object-cover rounded-md"
                />
            </div>
            <div className="w-full flex-1 flex flex-col p-4 bg-[var(--background)] text-[var(--foreground)]">
                <h1 className="mb-2 text-[20px] font-bold">{livro.title}</h1>
                <h2 className="mb-2 text-[15px]">{livro.author}</h2>
                <div className="flex mb-4 gap-2">
                    <Badge variant="outline">{genre.genero}</Badge>
                    <Badge variant="outline">{livro.year}</Badge>
                    <Badge variant="outline">{livro.pages} páginas</Badge>
                </div>
                <StarRating rating={livro.rating} />
                <div className="flex-1 mt-3">
                    <h3 className="font-semibold mb-2">{livro.status} </h3>
                    <p>{livro.synopsis}</p>
                </div>
            </div>
        </main>
    )
}
