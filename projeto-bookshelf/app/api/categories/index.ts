import { livros } from "@/lib/livros";
import { NextApiRequest, NextApiResponse } from "next";
import { BookCardProps } from "@/app/library/bookCard";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === "GET") {
        return res.status(200).json(livros);
    } else if(req.method === "POST") {
        const newBook: BookCardProps = req.body;
        newBook.id = String(livros.length);
        livros.push(newBook);
        return res.status(201).json(newBook);
    } else {
        res.status(405).json({ message: "Método não permitido" });
    }
}