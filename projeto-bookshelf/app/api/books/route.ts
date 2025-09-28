import { livrosDB } from "@/lib/db";
import { NextResponse } from "next/server";
import { BookCardProps } from "@/app/library/bookCard";

//usado para get e post de todos os livros de forma geral


export async function GET() {
    return NextResponse.json(livrosDB, { status : 200 })
}

export async function POST(req: Request){
    const newBook: BookCardProps = await req.json();
    newBook.id = String(livrosDB.length);
    livrosDB.push(newBook)

    return NextResponse.json(newBook, { status:  201 })
}
