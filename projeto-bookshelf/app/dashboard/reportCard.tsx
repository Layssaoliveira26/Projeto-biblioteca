import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

interface ReportCardProps{
    title: string;
    value: number;
}

export default function ReportCard({title, value}: ReportCardProps){
    return(
    <Card className="w-40 h-20 flex flex-col p-2">
        <CardHeader className="flex items-center justify-center p-0">
            <CardTitle className="text-sm">{title}</CardTitle>
        </CardHeader>

        <CardContent className="flex items-center justify-center">
            <p className="text-lg font-bold">{value}</p>
        </CardContent>
    </Card>

    )
}