import { PlaceRepository } from './place.repository';
import { CreatePlaceDto } from './dto/create-place.dto';
import { PlaceSearchDto } from './dto/place-search.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
export declare class PlaceService {
    private readonly placeRepository;
    constructor(placeRepository: PlaceRepository);
    create(place: CreatePlaceDto): Promise<{
        id: string;
        name: string;
        city: string;
        state: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    search(query: PlaceSearchDto): Promise<{
        take: 5;
        page?: number;
        orderType: "asc" | "desc";
        orderBy?: string;
        search?: string;
        results: {
            id: string;
            name: string;
            city: string;
            state: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
        count: number;
    }>;
    delete(id: string): Promise<{
        id: string;
        name: string;
        city: string;
        state: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getPlace(id: string): Promise<{
        id: string;
        name: string;
        city: string;
        state: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    patch(place: UpdatePlaceDto, id: string): Promise<{
        id: string;
        name: string;
        city: string;
        state: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
