"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceService = void 0;
const common_1 = require("@nestjs/common");
const place_repository_1 = require("./place.repository");
const place_search_dto_1 = require("./dto/place-search.dto");
let PlaceService = class PlaceService {
    constructor(placeRepository) {
        this.placeRepository = placeRepository;
    }
    async create(place) {
        const response = await this.placeRepository.create(place);
        return response;
    }
    async search(query) {
        const params = new place_search_dto_1.PlaceSearchDto(query);
        const validOrderArguments = ["createdAt", "updatedAt", "name", "name", "state"];
        if (params.orderBy && !validOrderArguments.includes(params.orderBy)) {
            throw new common_1.BadRequestException("impossible to sort by parameter:" + params.orderBy);
        }
        let data = await this.placeRepository.search(params);
        const searchResult = {
            results: data.response,
            count: data.count,
            ...params
        };
        return searchResult;
    }
    async delete(id) {
        const place = await this.placeRepository.findById(id);
        if (!place)
            throw new common_1.NotFoundException("Place not found");
        const response = await this.placeRepository.delete(id);
        return response;
    }
    async getPlace(id) {
        const response = await this.placeRepository.findById(id);
        if (!response)
            throw new common_1.NotFoundException("Place not found");
        return response;
    }
    async patch(place, id) {
        const oldPlace = await this.placeRepository.findById(id, ["id"]);
        if (!oldPlace) {
            throw new common_1.NotFoundException("Place not found");
        }
        const response = await this.placeRepository.update(id, place);
        return response;
    }
};
exports.PlaceService = PlaceService;
exports.PlaceService = PlaceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [place_repository_1.PlaceRepository])
], PlaceService);
//# sourceMappingURL=place.service.js.map