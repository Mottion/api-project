"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessTokenDto = void 0;
class AccessTokenDto {
    constructor(access_token) {
        this.access_token = access_token;
    }
    static validate() {
        return true;
    }
}
exports.AccessTokenDto = AccessTokenDto;
//# sourceMappingURL=access-token.dto.js.map