import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

interface ReportCardProps{
    title: string;
    value: number;
    image: string;
}

export default function ReportCard({ title, value, image }: ReportCardProps) {
  return (
    <Card className="overflow-hidden w-40 h-28 md:w-60 flex flex-row p-0 gap-2  ">
      <div className="w-2/5 h-full ">
        <img
          src={image}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-3/5 flex flex-col justify-center items-start flex-1 p-2 ">
        <CardHeader className="p-0">
          <CardTitle className="text-sm md:whitespace-nowrap">{title}</CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <p className="text-lg font-bold text-center">{value}</p>
        </CardContent>
      </div>
    </Card>
  );
}
