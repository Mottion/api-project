export declare class PlaceSearchDto {
    take: 5;
    page?: number;
    orderType: "asc" | "desc";
    orderBy?: string;
    search?: string;
    constructor(query: PlaceSearchDto);
}
