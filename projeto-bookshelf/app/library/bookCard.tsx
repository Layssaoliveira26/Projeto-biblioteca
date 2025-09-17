import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/ui/custom-components/star";



interface BookCardProps {
  title: string;
  author: string;
  imageSrc: string;
  gender: string;
}

export default function BookCard({ title, author, imageSrc, gender }: BookCardProps) {
  return (
    <Card className="w-64">
      <img 
        src={imageSrc} 
        alt={`Capa do livro ${title}`} 
        className="w-full h-40 object-cover rounded-t-md"
      />
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{author}</p>
        <StarRating rating={4} />
        <Badge variant="outline">{gender}</Badge>   
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button size="sm">Ver</Button>
        <Button size="sm">Editar</Button>
        <Button size="sm" variant="destructive">Excluir</Button>
      </CardFooter>
    </Card>
  );
}
