"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var category_dto_1 = require("../dtos/category.dto");
var error_middleware_1 = require("../middlewares/error-middleware");
var category_model_1 = require("../models/category.model");
var prisma = new client_1.PrismaClient();
var categoryRepository = prisma.category;
var CategoryService = /** @class */ (function () {
    function CategoryService() {
    }
    CategoryService.prototype.findAll = function (categoryName) {
        return __awaiter(this, void 0, void 0, function () {
            var categories;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, categoryRepository.findMany({
                            where: {
                                category: {
                                    contains: categoryName,
                                },
                            },
                        })];
                    case 1:
                        categories = _a.sent();
                        return [2 /*return*/, categories.map(function (value) {
                                return new category_dto_1.CategorySummeryReadDto(value);
                            })];
                }
            });
        });
    };
    CategoryService.prototype.GetOneById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var category;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, categoryRepository.findUnique({
                            where: {
                                id: id,
                            },
                        })];
                    case 1:
                        category = _a.sent();
                        if (!category) {
                            throw new error_middleware_1.ErrorHandler(404, "category not found");
                        }
                        return [2 /*return*/, new category_dto_1.CategoryReadDto(category)];
                }
            });
        });
    };
    CategoryService.prototype.CreateOne = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var exitingCategory, creatingCategory, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.GetOneCategoryName(input.category)];
                    case 1:
                        exitingCategory = _a.sent();
                        if (exitingCategory) {
                            throw new error_middleware_1.ErrorHandler(403, "category already exists");
                        }
                        creatingCategory = new category_model_1.Category(input);
                        return [4 /*yield*/, categoryRepository.create({
                                data: creatingCategory,
                            })];
                    case 2:
                        user = _a.sent();
                        return [2 /*return*/, new category_dto_1.CategoryReadDto(user)];
                }
            });
        });
    };
    CategoryService.prototype.UpdateOne = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var category, categoryWithSameName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, categoryRepository.findUnique({
                            where: {
                                id: input.id,
                            },
                        })];
                    case 1:
                        category = _a.sent();
                        if (!category) {
                            throw new error_middleware_1.ErrorHandler(404, "category not found");
                        }
                        return [4 /*yield*/, this.GetOneCategoryName(input.category)];
                    case 2:
                        categoryWithSameName = _a.sent();
                        if (categoryWithSameName && categoryWithSameName.id !== input.id) {
                            throw new error_middleware_1.ErrorHandler(403, "already exists a category with same name");
                        }
                        category = new category_model_1.Category(input);
                        return [4 /*yield*/, categoryRepository.update({
                                data: category,
                                where: {
                                    id: input.id,
                                },
                            })];
                    case 3:
                        category = _a.sent();
                        return [2 /*return*/, new category_dto_1.CategoryReadDto(category)];
                }
            });
        });
    };
    CategoryService.prototype.RemoveOneById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var removingCategory;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.GetOneById(id)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, categoryRepository.delete({
                                where: {
                                    id: id,
                                },
                            })];
                    case 2:
                        removingCategory = _a.sent();
                        return [2 /*return*/, new category_dto_1.CategoryReadDto(removingCategory)];
                }
            });
        });
    };
    CategoryService.prototype.GetPagination = function (pageNumber, pageSize, categoryName) {
        return __awaiter(this, void 0, void 0, function () {
            var categories;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, categoryRepository.findMany({
                            select: {
                                category: true,
                                id: true,
                            },
                            skip: (pageNumber - 1) * pageSize,
                            take: pageSize,
                            where: {
                                category: {
                                    contains: categoryName,
                                },
                            },
                        })];
                    case 1:
                        categories = _a.sent();
                        return [2 /*return*/, categories];
                }
            });
        });
    };
    CategoryService.prototype.GetOneCategoryName = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var category;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, categoryRepository.findFirst({
                            where: {
                                category: name,
                            },
                        })];
                    case 1:
                        category = _a.sent();
                        return [2 /*return*/, category];
                }
            });
        });
    };
    return CategoryService;
}());
exports.default = new CategoryService();
//# sourceMappingURL=category.service.js.map