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
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma.service");
const pick_select_1 = require("../../utils/pick-select");
let UserRepository = class UserRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findById(id, keys = ["id", "email", "name"]) {
        const response = await this.prisma.user.findFirst({
            where: { id },
            select: (0, pick_select_1.pickSelect)(keys)
        });
        return response;
    }
    async create(user, keys = ["id", "name"]) {
        const response = await this.prisma.user.create({
            data: user,
            select: (0, pick_select_1.pickSelect)(keys)
        });
        return response;
    }
    async findByEmail(email, keys = ["id", "password", "name"]) {
        const response = await this.prisma.user.findUnique({
            where: { email },
            select: (0, pick_select_1.pickSelect)(keys)
        });
        return response;
    }
    async delete(id) {
        const response = await this.prisma.user.delete({
            where: { id },
        });
        return response;
    }
    async update(id, data, keys = ["id", "name", "email"]) {
        const response = await this.prisma.user.update({
            where: { id },
            data: data,
            select: (0, pick_select_1.pickSelect)(keys)
        });
        return response;
    }
    async getById(id, keys = ["id", "name", "email"]) {
        const response = await this.prisma.user.findFirst({
            where: { id },
            select: (0, pick_select_1.pickSelect)(keys)
        });
        return response;
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserRepository);
//# sourceMappingURL=user.repository.js.map