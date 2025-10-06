# 📚 BookShelf Ressonância Literária

![Next.js](https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=white&labelColor=000)
![React](https://img.shields.io/badge/React-20232a?logo=react&logoColor=61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38bdf8?logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-18181b?logo=data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjZmZmIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PHBhdGggZD0iTTggM0EzIDMgMCAwIDAgNSA2LjUgMyAzIDAgMCAwIDggMTBhMyAzIDAgMCAwIDAtNi0zIDMgMCAwIDAtMy0zWiIvPjwvc3ZnPg==&labelColor=18181b)
![Prisma](https://img.shields.io/badge/Prisma-2d3748?logo=prisma&logoColor=white)
![Turso DB](https://img.shields.io/badge/Turso_DB-0056D2?logo=data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjZmZmIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PHBhdGggZD0iTTggM0EzIDMgMCAwIDAgNSA2LjUgMyAzIDAgMCAwIDggMTBhMyAzIDAgMCAwIDAtNi0zIDMgMCAwIDAtMy0zWiIvPjwvc3ZnPg==&labelColor=0056D2)
![Vercel](https://img.shields.io/badge/Vercel-000?logo=vercel&logoColor=white)

---

## ✨ Sobre o Projeto

**BookShelf Ressonância Literária** é uma aplicação web moderna para gerenciamento de biblioteca pessoal. Organize, catalogue e acompanhe seus livros de forma intuitiva, com visual elegante e recursos avançados.

---

## 🚀 Tecnologias Utilizadas

- **[Next.js](https://nextjs.org/)** — Framework React para aplicações fullstack
- **[React](https://react.dev/)** — Biblioteca de UI
- **[TypeScript](https://www.typescriptlang.org/)** — Tipagem estática para JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** — Utilitários de CSS para estilização ágil
- **[shadcn/ui](https://ui.shadcn.com/)** — Componentes UI acessíveis e personalizáveis
- **[Prisma](https://www.prisma.io/)** — ORM moderno para Node.js/TypeScript
- **[Turso DB](https://turso.tech/)** — Banco de dados SQLite distribuído
- **[Vercel](https://vercel.com/)** — Deploy rápido e escalável

---

## ⚙️ Funcionalidades

- **CRUD Completo de Livros**: Adicione, edite, visualize e remova livros com facilidade.
- **Dashboard com Estatísticas**: Veja dados relevantes da sua coleção.
- **Filtros Avançados**: Busque por autor, categoria, status de leitura e mais.
- **Sistema de Temas**: Mude entre Dark Mode 🌑 e Light Mode ☀️.
- **Categorias de Livros**: Organize por gêneros.
- **Persistência de Dados**: Banco de dados Turso DB via Prisma.
- **API RESTful**: Endpoints para livros e categorias (API Routes Next.js).
- **Deploy em Nuvem**: Infraestrutura confiável com Vercel + Turso DB.

---

## 🗂️ Estrutura de Arquivos

```
app/         # Rotas e páginas Next.js
components/  # Componentes reutilizáveis de UI
prisma/      # Esquema e migrações do banco (Prisma)
lib/         # Funções utilitárias e integrações
public/      # Imagens, fontes e arquivos estáticos
```

---

## 📋 API Routes

- **Livros:** `GET`/`POST`/`PUT`/`DELETE` em `/api/books`
- **Categorias:** `GET`/`POST`/`PUT`/`DELETE` em `/api/categories`
- Endpoints RESTful seguindo boas práticas e documentação OpenAPI.

---

## 💡 Dicas de Desenvolvimento

- Rode localmente com `npm install` e `npm run dev`.
- Configure o banco local via Prisma: `npx prisma migrate dev`.
- Use variáveis de ambiente para dados sensíveis.
- Atualize o banco com `npx prisma generate` sempre que alterar o schema.
- Utilize o painel do Turso DB para monitoramento.
- Teste a responsividade em diferentes dispositivos.
- Consulte a documentação das tecnologias utilizadas para tirar dúvidas.

---

## 👥 Integrantes

- **Brenda Kalahare**
- **Izabela Sousa**
- **Layssa Oliveira**
- **Naiade Alves**
- **Raquel Cordeiro**

---

## 🎓 Agradecimentos

Agradecemos à **Escola Koru** e ao **Grupo Boticário** pelo apoio e incentivo por meio do Programa Desenvolve. 💚

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

<div align="center">
  Feito com ❤️ por Brenda Kalahare, Izabela Sousa, Layssa Oliveira, Naiade Alves e Raquel Cordeiro.
</div>
