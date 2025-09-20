import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/ui/custom-components/star";
import Link from "next/link";
import { CiTrash } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { LuEye } from "react-icons/lu";

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
}

export default function BookCard({  title, author, genre, cover, rating }: BookCardProps) {
  return (
    <div className="flex justify-center">
    <Card className="w-64">
      <img 
        src={cover} 
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
      </CardContent>
      <CardFooter className="flex justify-center gap-2">
        <Link href="/view-book">
          <Button size="sm">
          <LuEye />
          Ver</Button>
        </Link>
        <Button size="sm">
        <CiEdit />
        Editar</Button>
        <Button size="sm" variant="destructive">
        <CiTrash />
        Excluir</Button>
      </CardFooter>
    </Card>
  </div>
  );
}
