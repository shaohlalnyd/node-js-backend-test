"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryUpdateDto = exports.CategoryCreateDto = exports.CategorySummeryReadDto = exports.CategoryReadDto = void 0;
var CategoryReadDto = /** @class */ (function () {
    function CategoryReadDto(input) {
        this.category = input.category || "";
        this.counter = input.counter || 0;
        this.id = input.id || 0;
        this.latitude = input.latitude || 0;
        this.longitude = input.longitude || 0;
    }
    return CategoryReadDto;
}());
exports.CategoryReadDto = CategoryReadDto;
var CategorySummeryReadDto = /** @class */ (function () {
    function CategorySummeryReadDto(input) {
        this.category = input.category || "";
        this.id = input.id || 0;
    }
    return CategorySummeryReadDto;
}());
exports.CategorySummeryReadDto = CategorySummeryReadDto;
var CategoryCreateDto = /** @class */ (function () {
    function CategoryCreateDto(input) {
        this.category = input.category || "";
        this.counter = input.counter || 0;
        this.latitude = input.latitude || 0;
        this.longitude = input.longitude || 0;
    }
    return CategoryCreateDto;
}());
exports.CategoryCreateDto = CategoryCreateDto;
var CategoryUpdateDto = /** @class */ (function (_super) {
    __extends(CategoryUpdateDto, _super);
    function CategoryUpdateDto(input) {
        var _this = _super.call(this, input) || this;
        _this.id = input.id || 0;
        return _this;
    }
    return CategoryUpdateDto;
}(CategoryCreateDto));
exports.CategoryUpdateDto = CategoryUpdateDto;
//# sourceMappingURL=category.dto.js.map