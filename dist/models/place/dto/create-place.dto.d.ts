import { Prisma } from "@prisma/client";
export declare class CreatePlaceDto {
    name: string;
    city: string;
    state: string;
    constructor(args: Prisma.PlaceCreateInput);
}
