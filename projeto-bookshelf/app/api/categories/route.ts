import { categoriasDB } from "@/lib/db";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// export async function GET() {
//     return NextResponse.json(categoriasDB, { status: 200})
// }
export async function GET() {
    try {
        const generos = await prisma.genre.findMany()
        return NextResponse.json(generos, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Erro ao retornar gêneros"}, { status: 500 })
    }
}

// export async function POST(req: Request) {
//     const newGenre = await req.json();
//     categoriasDB.push(newGenre);

//     return NextResponse.json(newGenre, { status: 201 });
// }

export async function POST(req: Request) {
    try {
        const data = await req.json()
        const newGenre = await prisma.genre.create({
            data: {
                genero: data.genero,
            }
        });

        return NextResponse.json(newGenre, { status: 201 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Erro ao criar gênero, verifique se já existe"}, { status: 500 })
    }
}
