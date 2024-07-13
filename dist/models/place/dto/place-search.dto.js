"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceSearchDto = void 0;
class PlaceSearchDto {
    constructor(query) {
        this.take = 5;
        this.page = query.page ?? 1;
        this.orderBy = query.orderBy ?? null;
        this.orderType = query.orderType == "desc" ? "desc" : "asc";
        this.search = query.search ?? null;
    }
}
exports.PlaceSearchDto = PlaceSearchDto;
//# sourceMappingURL=place-search.dto.js.map