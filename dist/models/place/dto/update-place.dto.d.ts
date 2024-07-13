import { Prisma } from "@prisma/client";
export declare class UpdatePlaceDto {
    name?: string;
    city?: string;
    state?: string;
    constructor(args: Prisma.PlaceCreateInput);
}
