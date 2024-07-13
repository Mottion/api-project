import { User } from "@prisma/client";
export declare class LoginAuthDto {
    email: string;
    password: string;
    constructor(args: User);
    static validate(args: User): boolean;
}
