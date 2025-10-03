
import { BookCardProps } from "@/app/library/bookCard";


export const livros: BookCardProps[] = [
    {
        id: "1",
        title:"Orgulho e Preconceito",
        author:"Jane Austen",
        genre: "Romance Clássico",
        year: 1813,
        pages: 448,
        rating: 5,
        synopsis: "A história da jovem Elizabeth Bennet e do arrogante Sr. Darcy, explorando temas de etiqueta, educação, moral, casamento e classes sociais na Inglaterra do século XIX.",
        cover: "https://i.imgur.com/u1D0O3u.jpeg",
        status: "LIDO",
        totalPaginasLidas: 500,
        onDelete: () => {}
    },
    {
        id: "2",
        title:"Dom Casmurro",
        author:"Machado de Assis",
        genre: "Literatura Brasileira", 
        year: 1899,
        pages: 256,
        rating: 4, 
        synopsis: "A narrativa de Bentinho, que reflete sobre sua juventude e o ciúme que o levou a crer na traição de sua esposa, Capitu, com seus 'olhos de ressaca'.",
        cover: "https://i.imgur.com/c4Y2GfK.jpeg",
        status: "NAO_LIDO", 
        totalPaginasLidas: 0,
        onDelete: () => {}
    },
    {
        id: "3",
        title:"Pai Rico, Pai Pobre",
        author:"Robert Kiyosaki",
        genre: "Finanças / Autoajuda",
        year: 1997,
        pages: 336,
        rating: 5,
        synopsis: "Compara as lições financeiras de dois pais (um rico e um pobre) e ensina a importância de aprender sobre dinheiro, investimentos e construção de ativos.",
        cover: "https://i.imgur.com/T0b4k7s.jpeg",
        status: "ABANDONADO",
        totalPaginasLidas: 210,
        onDelete: () => {}

    },
    {
        id: "4",
        title:"O Pequeno Príncipe",
        author:"Antoine de Saint-Exupéry",
        genre: "Literatura Brasileira",
        year: 1943,
        pages: 96,
        rating: 5,
        synopsis: "O Pequeno Príncipe, de Antoine de Saint-Exupéry, conta a jornada de um menino vindo de outro planeta que viaja por diferentes mundos até chegar à Terra. Em encontros com adultos e suas manias, ele revela lições sobre amizade, amor, simplicidade e o essencial que “é invisível aos olhos”.",
        cover: "https://images.gr-assets.com/books/1367545443l/157993.jpg",
        status: "LIDO",
        totalPaginasLidas: 500,
        onDelete: () => {}
    }, 
    {
        id: "5",
        title:"Harry Potter e a Pedra Filosofal",
        author:"J.K. Rowling",
        genre: "Fantasia Jovem Adulto",
        year: 1997,
        pages: 264,
        rating: 4,
        synopsis: "O jovem órfão Harry Potter descobre que é um bruxo e é convidado a estudar na Escola de Magia e Bruxaria de Hogwarts.",
        cover: "https://i.imgur.com/tHlP7gL.jpeg",
        status: "LIDO",
        totalPaginasLidas: 500,
        onDelete: () => {}
    },
    {
        id: "6",
        title:"Assassinato no Expresso do Oriente",
        author:"Agatha Christie",
        genre: "Mistério / Policial",
        year: 1934,
        pages: 256,
        rating: 4,
        synopsis: "O famoso detetive Hercule Poirot investiga um assassinato ocorrido em um trem luxuoso, onde todos os passageiros são suspeitos.",
        cover: "ttps://i.imgur.com/7b3G8yV.jpeg",
        status: "LIDO",
        totalPaginasLidas: 500,
        onDelete: () => {}
    }
    
]