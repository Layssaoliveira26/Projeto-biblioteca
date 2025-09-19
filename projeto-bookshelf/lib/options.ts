export interface Generos {
    genero: string;
}

export interface Status {
    statusLeitura: string;
}

export const options: Generos[] = [
    {
        genero: "Literatura Brasileira"
    },
    {
        genero: "Ficção Científica"
    },
    {
        genero: "Realismo Mágico"
    },
    {
        genero: "Ficção"
    },
    {
        genero: "Fantasia"
    },
    {
        genero: "Romance"
    },
    {
        genero: "Biografia"
    },
    {
        genero: "História"
    },
    {
        genero: "Romance"
    },
    {
        genero: "Biografia"
    },
    {
        genero: "História"
    },
    {
        genero: "Autoajuda"
    },
    {
        genero: "Tecnologia"
    },
    {
        genero: "Programação"
    },
    {
        genero: "Negócios"
    },
    {
        genero: "Psicologia"
    },
    {
        genero: "Filosofia"
    },
    {
        genero: "Poesia"
    }
]

export const opcoesLeitura = [
    {
        status: "QUERO LER"
    },
    {
        status: "LENDO"
    },
    {
        status: "LIDO"
    },
    {
        status: "PAUSADO"
    }, 
    {
        status: "ABANDONADO"
    }
]