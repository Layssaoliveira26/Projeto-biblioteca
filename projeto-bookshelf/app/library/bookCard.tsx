import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/ui/custom-components/star";
import Link from "next/link";



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
    <Card className="w-64">
      <img 
        src={cover} 
        alt={`Capa do livro ${title}`} 
        className="w-full h-40 object-cover rounded-t-md"
      />
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{author}</p>
        <StarRating rating={rating} />
        <Badge variant="outline">{genre}</Badge>   
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button size="sm">Ver</Button>
        <Button size="sm">Editar</Button>
        <Button size="sm" variant="destructive">Excluir</Button>
      </CardFooter>
    </Card>
  );
}
