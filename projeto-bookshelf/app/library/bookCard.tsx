import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/ui/custom-components/star";
import Link from "next/link";



interface BookCardProps {
  title: string;
  author: string;
  imageSrc: string;
  gender: string;
  date: number;
}

export default function BookCard({ title, author, imageSrc, gender, date }: BookCardProps) {
  return (
    <div className="flex justify-center mt-3">
        <Card className="w-64">
          <img 
            src={imageSrc} 
            alt={`Capa do livro ${title}`} 
            className="w-60 h-60 object-cover rounded-t-md"
          />
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <StarRating rating={4} />
          </CardHeader>
          <CardContent>
            <p className="mt-[-10] mb-2">{author}</p>
            
            <div className="flex gap-3">
              <Badge variant="outline">{gender}</Badge>   
              <Badge variant="outline">{date}</Badge>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center gap-2">
            <Link href="/view-book">
            <Button size="sm">Ver</Button>
            </Link>
            <Button size="sm">Editar</Button>
            <Button size="sm" variant="destructive">Excluir</Button>
          </CardFooter>
        </Card>
    </div>
  );
}
