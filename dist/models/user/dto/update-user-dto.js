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
exports.updateUserDto = void 0;
const client_1 = require("@prisma/client");
const nestjs_joi_1 = require("nestjs-joi");
const Joi = require("joi");
let updateUserDto = class updateUserDto {
    constructor(args) {
        this.name = args.name;
    }
};
exports.updateUserDto = updateUserDto;
__decorate([
    (0, nestjs_joi_1.JoiSchema)(Joi.string().optional()),
    __metadata("design:type", Object)
], updateUserDto.prototype, "name", void 0);
__decorate([
    (0, nestjs_joi_1.JoiSchema)(Joi.string().optional()),
    __metadata("design:type", Object)
], updateUserDto.prototype, "newPassword", void 0);
__decorate([
    (0, nestjs_joi_1.JoiSchema)(Joi.string().required()),
    __metadata("design:type", Object)
], updateUserDto.prototype, "passwordConfirm", void 0);
exports.updateUserDto = updateUserDto = __decorate([
    (0, nestjs_joi_1.JoiSchemaOptions)({ allowUnknown: false }),
    __metadata("design:paramtypes", [Object])
], updateUserDto);
//# sourceMappingURL=update-user-dto.js.map