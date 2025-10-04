import { livrosDB } from "@/lib/db";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

interface Params {
    params: { id: string };
}

const prisma = new PrismaClient();

// export async function GET(req: Request, { params }: Params ) {
//     const { id } = params;
//     const book = livrosDB.find((livro) => livro.id === id)
    
//     if (!book) {
//         return NextResponse.json({ message: "Livro não encontrado"}, { status: 404 });
//     }

//     return NextResponse.json(book, { status: 200})
// }

export async function GET(req: Request, { params }: Params) {
    const { id } = params;

    try {
        const bookId = parseInt(id);
        const book = await prisma.book.findUnique({
            where: { id: bookId},
            include: {
                genre: true,
            }
        })
        
        return NextResponse.json(book, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Erro interno do servidor"}, { status: 500})
    }
    
}

// export async function DELETE(req: Request, { params }: Params) {
//     const { id } = params;
//     const index = livrosDB.findIndex((livro) => livro.id === id);

//     if (index === -1) {
//         return NextResponse.json({ message: "Livro não encontrado"}, { status: 404});
//     }
//     const removed = livrosDB.splice(index, 1);
//     return NextResponse.json(removed[0], {status: 200})
// }

export async function DELETE(req: Request, { params}: Params) {
    const { id } = params;
    try {
        const bookId = parseInt(id);
        const deleteLivro = await prisma.book.delete({
            where: { id : bookId}
        }) 
        return NextResponse.json(deleteLivro, {status: 200})
    } catch (error) {
        return NextResponse.json({error: "Não foi encontrado um registro para ser excluído"}, {status: 404})
    }
    
}

// export async function PUT(req: Request, { params }: Params) {
//     const { id } = params;

//     const index = livrosDB.findIndex((livro) => livro.id === id);

//     if (index === -1) {
//         return NextResponse.json({ message: "Livro não encontrado."}, { status: 404});
//     }

//     const body = await req.json();
//     livrosDB[index] = {...livrosDB[index], ...body}; 

//     return NextResponse.json(body, { status : 200 });
// }

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> } ) {
    try {
        // Aguarde os params
        const { id } = await params;
        const dadosRecebidos = await req.json();
        const { title, author, pages, isbn, status, rating, synopsis, cover, year, totalPaginasLidas, genreId } = dadosRecebidos; 
        const bookId = parseInt(id); 

        if (isNaN(bookId)) {
            return NextResponse.json({ error: "ID inválido" }, { status: 400 });
        }
        
        const updatedBook = await prisma.book.update({
            where: { id: bookId },
            data: {
                title: title,
                author: author,
                pages: pages,
                isbn: isbn,
                status: status,
                rating: rating,
                synopsis: synopsis,
                cover: cover,
                year: year,
                totalPaginasLidas: String(totalPaginasLidas),
                genreId: Number(genreId),
            },
            include: { genre: true },
        });
        
        return NextResponse.json(updatedBook, { status: 200 });
        
    } catch (error) {
        return NextResponse.json({ error: "Erro ao atualizar livro" }, { status: 500 });
    }
}