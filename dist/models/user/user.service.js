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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("./user.repository");
const jwt_1 = require("@nestjs/jwt");
const access_token_dto_1 = require("../../providers/auth/dto/access-token.dto");
let UserService = class UserService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async create(user) {
        const response = await this.userRepository.create(user);
        const payload = { id: response.id, name: response.name };
        return new access_token_dto_1.AccessTokenDto(await this.jwtService.signAsync(payload));
    }
    async findByEmail(email) {
        const response = await this.userRepository.findByEmail(email);
        if (!response)
            throw new common_1.NotFoundException("Email not registered in the system");
        return response;
    }
    async delete(id) {
        const response = await this.userRepository.delete(id);
        return response;
    }
    async getMyUser(user) {
        const response = await this.userRepository.findById(user.id);
        if (!response)
            throw new common_1.NotFoundException("User Not Found");
        return response;
    }
    async update(id, data) {
        const user = await this.userRepository.getById(id, ['password']);
        if (user.password !== data.passwordConfirm) {
            throw new common_1.ConflictException("error validating password confirmation");
        }
        const { name, newPassword } = data;
        const response = await this.userRepository.update(id, {
            name, password: newPassword
        });
        return response;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map