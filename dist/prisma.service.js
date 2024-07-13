"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
function extendPrismaClient() {
    const logger = new common_1.Logger('Prisma');
    const prisma = new client_1.PrismaClient();
    return prisma.$extends({
        client: {
            async onModuleInit() {
                await this.$connect();
            }
        },
        query: {
            $allModels: {
                async $allOperations({ operation, model, args, query }) {
                    const start = performance.now();
                    const result = await query(args);
                    const end = performance.now();
                    const time = end - start;
                    logger.verbose(`${model}.${operation} took ${Math.floor(time)}ms`);
                    return result;
                }
            },
        }
    });
}
const ExtendedPrismaClient = class {
    constructor() {
        return extendPrismaClient();
    }
};
let PrismaService = class PrismaService extends ExtendedPrismaClient {
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = __decorate([
    (0, common_1.Injectable)()
], PrismaService);
//# sourceMappingURL=prisma.service.js.map