import { livrosDB } from "@/lib/db";
import { NextResponse } from "next/server";
import { BookCardProps } from "@/app/library/bookCard";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

//usado para get e post de todos os livros de forma geral


// export async function GET() {
//     return NextResponse.json(livrosDB, { status : 200 })
// }

export async function GET() {
    try {
        const livros = await prisma.book.findMany({
            include: {
                genre: true
            }
        })
        return NextResponse.json(livros, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Erro na consulta de livros"}, {status: 500})
    }
}

// export async function POST(req: Request){
//     const newBook: BookCardProps = await req.json();
//     newBook.id = String(livrosDB.length);
//     livrosDB.push(newBook)

//     return NextResponse.json(newBook, { status:  201 })
// }

export async function POST(req: Request) {
    try {
        const data = await req.json();


        const newBook = await prisma.book.create({
            data: {
                title: data.title,
                author: data.author,
                pages: data.pages,
                isbn: data.isbn,
                status: data.status,
                rating: data.rating,
                synopsis: data.synopsis,
                cover: data.cover,
                year: data.year,
                totalPaginasLidas: data.totalPaginasLidas,
                genreId: data.genreId
                
            }
        });

        console.log("Livro criado com sucesso:", newBook);
        return NextResponse.json(newBook, { status: 201 });

    } catch (error) {
        console.error("Erro detalhado:", error);
        return NextResponse.json({ 
            error: "Erro ao cadastrar livro",
            details: error.message 
        }, { status: 500 });
    }
}
