import { Prisma } from "@prisma/client";
import { PrismaService } from "../../prisma.service";
import { createUserDto } from "./dto/create-user.dto";
export declare class UserRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findById(id: string, keys?: (keyof Prisma.UserSelect)[]): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
    }>;
    create(user: createUserDto, keys?: (keyof Prisma.UserSelect)[]): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
    }>;
    findByEmail(email: string, keys?: (keyof Prisma.UserSelect)[]): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
    }>;
    delete(id: string): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
    }>;
    update(id: string, data: Prisma.UserUpdateInput, keys?: (keyof Prisma.UserSelect)[]): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
    }>;
    getById(id: string, keys?: (keyof Prisma.UserSelect)[]): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
    }>;
}
