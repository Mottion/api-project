import { PrismaService } from "src/prisma.service"

export const cleanDB = async (prisma: PrismaService) => {
  await prisma.user.deleteMany();
  await prisma.place.deleteMany();
}