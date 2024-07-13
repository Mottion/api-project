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
exports.PlaceRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma.service");
const pick_select_1 = require("../../utils/pick-select");
let PlaceRepository = class PlaceRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findById(id, keys = ["id", "name", "city", "state", "createdAt", "updatedAt"]) {
        const response = await this.prisma.place.findFirst({
            where: { id },
            select: (0, pick_select_1.pickSelect)(keys)
        });
        return response;
    }
    async update(id, data, keys = ["id", "name", "city", "state", "createdAt", "updatedAt"]) {
        const response = await this.prisma.place.update({
            where: { id },
            data,
            select: (0, pick_select_1.pickSelect)(keys)
        });
        return response;
    }
    async delete(id, keys = ["id", "name", "city", "state", "createdAt", "updatedAt"]) {
        const response = await this.prisma.place.delete({
            where: { id },
            select: (0, pick_select_1.pickSelect)(keys)
        });
        return response;
    }
    async create(data, keys = ["id", "name", "city", "state", "createdAt", "updatedAt"]) {
        const response = await this.prisma.place.create({
            data,
            select: (0, pick_select_1.pickSelect)(keys)
        });
        return response;
    }
    async search(params) {
        const query = {
            skip: (params.page - 1) * params.take,
            take: params.take,
        };
        if (params.search) {
            query.where = { OR: [
                    { city: { contains: params.search } },
                    { state: { contains: params.search } },
                    { name: { contains: params.search } }
                ] };
        }
        if (params.orderBy) {
            query.orderBy = { [params.orderBy]: params.orderType };
        }
        const response = await this.prisma.place.findMany(query);
        const count = await this.prisma.place.count({ where: query.where });
        return { response, count };
    }
};
exports.PlaceRepository = PlaceRepository;
exports.PlaceRepository = PlaceRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PlaceRepository);
//# sourceMappingURL=place.repository.js.map