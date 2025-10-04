import { categoriasDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json(categoriasDB, { status: 200})
}

export async function POST(req: Request) {
    const newGenre = await req.json();
    categoriasDB.push(newGenre);

    return NextResponse.json(newGenre, { status: 201 });
}