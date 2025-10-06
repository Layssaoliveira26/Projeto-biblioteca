import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const generos = await prisma.genre.findMany()
        return NextResponse.json(generos, { status: 200 })
    } catch (error: any) { 
        return NextResponse.json({ error: "Erro ao retornar gêneros"}, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json()
        const newGenre = await prisma.genre.create({
            data: {
                genero: data.genero,
            }
        });

        return NextResponse.json(newGenre, { status: 201 });
    } catch (error: any) { 
        console.log(error)
        return NextResponse.json({ 
            error: "Erro ao criar gênero, verifique se já existe"
        }, { status: 500 })
    }
}