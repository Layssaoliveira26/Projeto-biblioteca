import { categoriasDB } from "@/lib/db";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Params {
    params: {
        genre: string;
    }
}

// export async function DELETE(req: Request, { params }: Params) {
//     const { genre } = params;
//     const generoIndex = categoriasDB.findIndex((categoria) => categoria.genero === genre);

//     if (generoIndex === -1) {
//         return NextResponse.json({message: "Gênero não encontrado"}, { status: 404 });
//     }

//     const deleted = categoriasDB.splice(generoIndex, 1);
//     return NextResponse.json(deleted[0], { status: 200})
// }

export async function DELETE(req: Request, { params }: Params) {
    const { genre } = params;
    try {
        const deletedGenre = await prisma.genre.delete({
            where: { genero: genre }
        })

        return NextResponse.json(deletedGenre, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Gênero não encontrado"}, { status: 404})
    }
}