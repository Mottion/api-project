"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginAuthDto = void 0;
class LoginAuthDto {
    constructor(args) {
        this.email = args.email;
        this.password = args.password;
    }
    static validate(args) {
        return true;
    }
}
exports.LoginAuthDto = LoginAuthDto;
//# sourceMappingURL=login-auth.dto.js.map