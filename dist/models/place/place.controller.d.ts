import { PlaceService } from './place.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { PlaceSearchDto } from './dto/place-search.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
export declare class PlaceController {
    private readonly placeService;
    constructor(placeService: PlaceService);
    create(body: CreatePlaceDto): Promise<{
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
    getPlace(param: {
        id: string;
    }): Promise<{
        id: string;
        name: string;
        city: string;
        state: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    delete(param: {
        id: string;
    }): Promise<{
        id: string;
        name: string;
        city: string;
        state: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    patch(body: UpdatePlaceDto, param: {
        id: string;
    }): Promise<{
        id: string;
        name: string;
        city: string;
        state: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
