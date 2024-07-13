import { User } from "@prisma/client";
import { fakeUserComplete } from "../src/mocks/random-mock";
import { PrismaService } from "../src/prisma.service";
import { AccessTokenDto } from "../src/providers/auth/dto/access-token.dto";
import { JwtService } from "@nestjs/jwt";
import { cleanDB } from "./clean-db";

export const setupTokenUser = async (
  prisma: PrismaService, 
  JwtService: JwtService,
) => {
  await cleanDB(prisma);
  let user = fakeUserComplete();
  user = await prisma.user.create({data: user});
  const payload = { id: user.id, name: user.name };
  const {access_token} = new AccessTokenDto(await JwtService.signAsync(payload));
  return [user, access_token]
}