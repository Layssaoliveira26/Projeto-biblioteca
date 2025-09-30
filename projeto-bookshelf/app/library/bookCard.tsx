"Use client";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/ui/custom-components/star";
import Link from "next/link";
import { CiTrash } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { LuEye } from "react-icons/lu";
import { verLivro } from "@/lib/verLivros";
import DadoLivro from "@/components/ui/verLivro";
import ViewBookPage from "../view-book/page";

export interface BookCardProps {
  id: string;
  title: string;
  author: string;
  genre: string;
  year: number;
  pages: number;
  rating: number;
  synopsis: string;
  cover: string;
  status: string;
  totalPaginasLidas: number;
  onDelete: (id: string) => void;
}


export default function BookCard({ title, author, genre, year, cover, rating, id, onDelete }: BookCardProps) {

  return (
    <div className="flex justify-center">
    <Card className="w-64">
      < img
        src={cover? cover : "https://cdn-icons-png.flaticon.com/512/5999/5999928.png"}  
        alt={`Capa do livro ${title}`} 
        className="w-full h-60 object-contain rounded-t-md mx-auto"
      />
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <StarRating rating={rating} />
      </CardHeader>
      <CardContent>
        <p className="-mt-4">{author}</p>
        <Badge variant="outline" className="mt-3">{genre}</Badge>
        <Badge variant="outline" className="mt-3">{year}</Badge>   
      </CardContent>
      <CardFooter className="flex justify-center gap-2">
        <Link href={`/view-book?id=${id}`}>
          <Button size="sm">
          <LuEye />
          Ver</Button>
        </Link>
        <Link href={`/edit-book?id=${id}`}>
          <Button size="sm">
          <CiEdit />
          Editar</Button>
        </Link>
        <Button size="sm" variant="destructive" onClick={() => {
          console.log("Exluir", id)
          onDelete(id)
        }}>
        <CiTrash />
        Excluir</Button>
      </CardFooter>
    </Card>
  </div>
  );
}
