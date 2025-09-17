import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

interface ReportCardProps{
    title: string;
    value: number;
}

export default function ReportCard({title, value}: ReportCardProps){
    return(
        <Card className="w-30">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p>{value}</p>
            </CardContent>
        </Card>
    )
}