import { livrosDB } from "@/lib/db";
import { NextResponse } from "next/server";

interface Params {
    params: { id: string };
}


export async function GET(req: Request, { params }: Params ) {
    const { id } = params;
    const book = livrosDB.find((livro) => livro.id === id)
    
    if (!book) {
        return NextResponse.json({ message: "Livro não encontrado"}, { status: 404 });
    }

    return NextResponse.json(book, { status: 200})
}

export async function DELETE(req: Request, { params }: Params) {
    const { id } = params;
    const index = livrosDB.findIndex((livro) => livro.id === id);

    if (index === -1) {
        return NextResponse.json({ message: "Livro não encontrado"}, { status: 404});
    }
    const removed = livrosDB.splice(index, 1);
    return NextResponse.json(removed[0], {status: 200})
}

export async function PUT(req: Request, { params }: Params) {
    const { id } = params;

    const index = livrosDB.findIndex((livro) => livro.id === id);

    if (index === -1) {
        return NextResponse.json({ message: "Livro não encontrado."}, { status: 404});
    }

    const body = await req.json();
    livrosDB[index] = {...livrosDB[index], ...body}; 

    return NextResponse.json(body, { status : 200 });
}