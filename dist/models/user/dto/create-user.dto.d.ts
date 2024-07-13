import { Prisma } from "@prisma/client";
export declare class createUserDto implements Prisma.UserCreateInput {
    name: string;
    email: string;
    password: string;
    constructor(args: Prisma.UserCreateInput);
}
