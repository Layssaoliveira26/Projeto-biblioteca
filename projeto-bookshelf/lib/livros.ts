import { BookCardProps } from "@/app/library/bookCard";
import { useState } from "react";


export const livros: BookCardProps[] = [
    {
        id: "0",
        title:"teste",
        author:"George R.R. Martin",
        genre: "Romance",
        year: 1998,
        pages: 648,
        rating: 1,
        synopsis: "Em A fúria dos reis, seis facções disputam o controle de uma terra dividida e o direito de ocupar o Trono de Ferro de Westeros - e estão dispostos a encarar tempestades, levantes e guerras para isso. Nesta história, irmão trama contra irmão e os mortos se levantam para caminhar pela noite.",
        cover: "https://i.pinimg.com/736x/37/15/6a/37156acb48cf140bc48c4068210e9ece.jpg",
        status: "QUERO LER",
        totalPaginasLidas: 50,
        onDelete: undefined
    },
    {
        id: "1",
        title:"1984",
        author:"George Orwell",
        genre: "Ficção Científica", 
        year: 1949,
        pages: 328,
        rating: 4, 
        synopsis: "1984 de George Orwell mostra uma sociedade totalitária onde o Partido e o Grande Irmão controlam toda a informação, pensamentos e ações das pessoas. Winston Smith, funcionário que reescreve a história, começa a questionar o regime e busca liberdade e amor, mas enfrenta vigilância constante e repressão brutal. O livro é uma crítica à opressão, manipulação da verdade e perda da individualidade.",
        cover: "https://images.gr-assets.com/books/1532168944l/40882855.jpg",
        status: "QUERO LER", 
        totalPaginasLidas: 500,
        currentPage: 0,
    },
    {
        id: "2",
        title:"Cem Anos de Solidão",
        author:"Gabriel García Márquez",
        genre: "Realismo Mágico",
        year: 1967,
        pages: 448,
        rating: 5,
        synopsis: "Cem Anos de Solidão acompanha a saga da família Buendía na cidade fictícia de Macondo, mostrando amores, tragédias e acontecimentos mágicos que se repetem por gerações. A obra explora solidão, destino e memória, mesclando realidade e fantasia para refletir sobre a vida e a história da América Latina.",
        cover: "https://images.gr-assets.com/books/1327170560l/21441.jpg",
        status: "ABANDONADO",
        totalPaginasLidas: 500,
        currentPage: 0
    },
    {
        id: "3",
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
        currentPage: 0
    }, 
    {
        id: "4",
        title:"Orgulho e Preconceito",
        author:"Jane Austen",
        genre: "Romance",
        year: 1843,
        pages: 400,
        rating: 4,
        synopsis: "Orgulho e Preconceito, de Jane Austen, narra a história de Elizabeth Bennet e sua família na Inglaterra do século XIX. O livro acompanha seus conflitos amorosos, sociais e familiares, destacando o relacionamento entre Elizabeth e o reservado Sr. Darcy, marcado por mal-entendidos, orgulho e preconceito, até evoluírem para o reconhecimento mútuo e o amor verdadeiro.",
        cover: "https://images.gr-assets.com/books/1327827871l/1885.jpg",
        status: "LIDO",
        totalPaginasLidas: 500,
        currentPage: 0
    },
    {
        id: "5",
        title:"Sapiens",
        author:"Yuval Noah Harari",
        genre: "História",
        year: 2011,
        pages: 512,
        rating: 4,
        synopsis: "Sapiens, de Yuval Noah Harari, apresenta a história da humanidade desde o surgimento do Homo sapiens até o mundo contemporâneo. O autor analisa como a espécie evoluiu através de três grandes revoluções: cognitiva, agrícola e científica, mostrando como crenças, sociedades e tecnologias moldaram a vida humana e o planeta.",
        cover: "https://images.gr-assets.com/books/1420580584l/23692271.jpg",
        status: "LIDO",
        totalPaginasLidas: 500,
        currentPage: 0
    }
    
]