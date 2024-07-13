import { PrismaService } from "../../prisma.service";
import { CreatePlaceDto } from "./dto/create-place.dto";
import { Prisma } from "@prisma/client";
import { PlaceSearchDto } from "./dto/place-search.dto";
import { UpdatePlaceDto } from "./dto/update-place.dto";
export declare class PlaceRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findById(id: string, keys?: (keyof Prisma.PlaceSelect)[]): Promise<{
        id: string;
        name: string;
        city: string;
        state: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, data: UpdatePlaceDto, keys?: (keyof Prisma.PlaceSelect)[]): Promise<{
        id: string;
        name: string;
        city: string;
        state: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    delete(id: string, keys?: (keyof Prisma.PlaceSelect)[]): Promise<{
        id: string;
        name: string;
        city: string;
        state: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    create(data: CreatePlaceDto, keys?: (keyof Prisma.PlaceSelect)[]): Promise<{
        id: string;
        name: string;
        city: string;
        state: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    search(params: PlaceSearchDto): Promise<{
        response: {
            id: string;
            name: string;
            city: string;
            state: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
        count: number;
    }>;
}
