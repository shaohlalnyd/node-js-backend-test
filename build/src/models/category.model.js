"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
var category_dto_1 = require("../dtos/category.dto");
var Category = /** @class */ (function () {
    function Category(input) {
        this.category = input.category || "";
        this.counter = input.counter || 0;
        if (!(input instanceof category_dto_1.CategoryCreateDto)) {
            this.id = input.id || 0;
        }
        this.latitude = input.latitude || 0;
        this.longitude = input.longitude || 0;
    }
    return Category;
}());
exports.Category = Category;
//# sourceMappingURL=category.model.js.map