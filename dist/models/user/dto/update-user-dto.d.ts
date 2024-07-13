import { Prisma } from "@prisma/client";
export declare class updateUserDto implements Prisma.UserUpdateInput {
    name?: string | Prisma.StringFieldUpdateOperationsInput;
    newPassword?: string | Prisma.StringFieldUpdateOperationsInput;
    passwordConfirm?: string | Prisma.StringFieldUpdateOperationsInput;
    constructor(args: Prisma.UserUpdateInput);
}
