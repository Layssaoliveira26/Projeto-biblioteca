import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

interface ReportCardProps{
    title: string;
    value: number;
    image: string;
}

export default function ReportCard({ title, value, image }: ReportCardProps) {
  return (
    <Card className="w-40 h-28 md:w-60 flex flex-row p-2 gap-2 bg-[#f9f8f6]">
  <div className="w-15 h-23 md:w-15 md:h-22 overflow-hidden">
    <img
      src={image}
      className="w-full h-full object-cover"
    />
  </div>

  <div className="flex flex-col justify-center items-start flex-1 p-2">
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
