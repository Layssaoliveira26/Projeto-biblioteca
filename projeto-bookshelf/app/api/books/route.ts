// app/api/books/route.js
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function GET() {
    try {
        const livros = await prisma.book.findMany({
            include: {
                genre: true
            }
        })
        return NextResponse.json(livros, { status: 200 })
    } catch (error) {
        console.error("Erro GET books:", error);
        return NextResponse.json({ error: "Erro na consulta de livros"}, {status: 500})
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();

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

    } catch (error: any) {
        console.error("Erro POST books:", error);
        return NextResponse.json({ 
            error: "Erro ao cadastrar livro",
            details: error.message 
        }, { status: 500 });
    }
}