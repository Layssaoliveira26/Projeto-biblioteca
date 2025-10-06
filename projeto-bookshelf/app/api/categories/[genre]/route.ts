import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// CORRETO para Next.js 15
export async function DELETE(
  req: Request, 
  { params }: { params: Promise<{ genre: string }> }
) {
  try {
    const { genre } = await params; 
    
    const deletedGenre = await prisma.genre.delete({
      where: { genero: genre }
    });

    return NextResponse.json(deletedGenre, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: "Gênero não encontrado" }, { status: 404 });
  }
}