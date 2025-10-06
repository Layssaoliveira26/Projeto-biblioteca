import { PrismaClient } from "./generated/prisma"


const prismaClientSingleton = () => {
    return new PrismaClient()
}

// Add a type-safe property to globalThis
declare global {
    var prisma: PrismaClient | undefined;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();
globalThis.prisma = prisma;

export default prisma