import { PrismaClient } from "./generated/prisma"


const prismaClientSingleton = () => {
    return new PrismaClient()
}

const prisma = globalThis.prisma ?? prismaClientSingleton()
export default prisma