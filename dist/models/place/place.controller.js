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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceController = void 0;
const common_1 = require("@nestjs/common");
const place_service_1 = require("./place.service");
const create_place_dto_1 = require("./dto/create-place.dto");
const place_search_dto_1 = require("./dto/place-search.dto");
const update_place_dto_1 = require("./dto/update-place.dto");
let PlaceController = class PlaceController {
    constructor(placeService) {
        this.placeService = placeService;
    }
    async create(body) {
        return await this.placeService.create(body);
    }
    async search(query) {
        return await this.placeService.search(query);
    }
    async getPlace(param) {
        return await this.placeService.getPlace(param.id);
    }
    async delete(param) {
        return await this.placeService.delete(param.id);
    }
    async patch(body, param) {
        return await this.placeService.patch(body, param.id);
    }
};
exports.PlaceController = PlaceController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_place_dto_1.CreatePlaceDto]),
    __metadata("design:returntype", Promise)
], PlaceController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("/search"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [place_search_dto_1.PlaceSearchDto]),
    __metadata("design:returntype", Promise)
], PlaceController.prototype, "search", null);
__decorate([
    (0, common_1.Get)("/:id"),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PlaceController.prototype, "getPlace", null);
__decorate([
    (0, common_1.Delete)("/:id"),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PlaceController.prototype, "delete", null);
__decorate([
    (0, common_1.Patch)("/:id"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_place_dto_1.UpdatePlaceDto, Object]),
    __metadata("design:returntype", Promise)
], PlaceController.prototype, "patch", null);
exports.PlaceController = PlaceController = __decorate([
    (0, common_1.Controller)('place'),
    __metadata("design:paramtypes", [place_service_1.PlaceService])
], PlaceController);
//# sourceMappingURL=place.controller.js.map