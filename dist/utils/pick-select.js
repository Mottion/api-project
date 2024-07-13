"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pickSelect = void 0;
const pickSelect = (keys) => {
    return keys.reduce((obj, key) => ({ ...obj, [key]: true }), {});
};
exports.pickSelect = pickSelect;
//# sourceMappingURL=pick-select.js.map