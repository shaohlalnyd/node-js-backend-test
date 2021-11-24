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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var express_1 = __importDefault(require("express"));
var supertest_1 = __importDefault(require("supertest"));
var category_controller_1 = __importDefault(require("../controllers/category.controller"));
var category_dto_1 = require("../dtos/category.dto");
var app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use("/category", category_controller_1.default);
test("responds to /", function () { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, supertest_1.default(app).get("/category/get-all")];
            case 1:
                res = _a.sent();
                expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
                expect(res.statusCode).toBe(200);
                return [2 /*return*/];
        }
    });
}); });
test("get-one-category-by-id-test-if-categories-exists-and-category-founded", function () { return __awaiter(void 0, void 0, void 0, function () {
    var categoriesRes, categories, id, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, supertest_1.default(app).get("/category/get-all")];
            case 1:
                categoriesRes = _a.sent();
                categories = categoriesRes.body;
                id = categories[0].id;
                return [4 /*yield*/, supertest_1.default(app).get("/category/get-one-by-id/" + id)];
            case 2:
                res = _a.sent();
                expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
                expect(res.statusCode).toBe(200);
                return [2 /*return*/];
        }
    });
}); });
test("get one category by id test if categories exists and category not founded", function () { return __awaiter(void 0, void 0, void 0, function () {
    var id, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = 1000;
                return [4 /*yield*/, supertest_1.default(app).get("/category/get-one-by-id/" + id)];
            case 1:
                res = _a.sent();
                expect(res.header["content-type"]).toBe("text/html; charset=utf-8");
                expect(res.statusCode).toBe(404);
                return [2 /*return*/];
        }
    });
}); });
test("add new category if not exists", function () { return __awaiter(void 0, void 0, void 0, function () {
    var creatingCategory, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                creatingCategory = new category_dto_1.CategoryCreateDto({
                    category: Math.random().toString(36).slice(2),
                    longitude: 1,
                    latitude: 1,
                    counter: 1,
                });
                return [4 /*yield*/, supertest_1.default(app).post("/category/add-new")
                        .set("Content-Type", "application/json")
                        .send(creatingCategory)];
            case 1:
                res = _a.sent();
                expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
                expect(res.statusCode).toBe(200);
                return [4 /*yield*/, supertest_1.default(app).delete("/category/remove-one/" + res.body.id)];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
test("add new category if  exists", function () { return __awaiter(void 0, void 0, void 0, function () {
    var creatingCategory, creatingRes, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                creatingCategory = new category_dto_1.CategoryCreateDto({
                    category: Math.random().toString(36).slice(2),
                    longitude: 1,
                    latitude: 1,
                    counter: 1,
                });
                return [4 /*yield*/, supertest_1.default(app).post("/category/add-new")
                        .set("Content-Type", "application/json")
                        .send(creatingCategory)];
            case 1:
                creatingRes = _a.sent();
                return [4 /*yield*/, supertest_1.default(app).post("/category/add-new")
                        .set("Content-Type", "application/json")
                        .send(creatingRes.body)];
            case 2:
                res = _a.sent();
                expect(res.header["content-type"]).toBe("text/html; charset=utf-8");
                expect(res.statusCode).toBe(403);
                return [4 /*yield*/, supertest_1.default(app).delete("/category/remove-one/" + creatingRes.body.id)];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
test("update category if correct", function () { return __awaiter(void 0, void 0, void 0, function () {
    var creatingCategory, creatingRes, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                creatingCategory = new category_dto_1.CategoryCreateDto({
                    category: Math.random().toString(36).slice(2),
                    longitude: 1,
                    latitude: 1,
                    counter: 1,
                });
                return [4 /*yield*/, supertest_1.default(app).post("/category/add-new")
                        .set("Content-Type", "application/json")
                        .send(creatingCategory)];
            case 1:
                creatingRes = _a.sent();
                return [4 /*yield*/, supertest_1.default(app).put("/category/update-one")
                        .set("Content-Type", "application/json")
                        .send(creatingRes.body)];
            case 2:
                res = _a.sent();
                expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
                expect(res.statusCode).toBe(200);
                return [4 /*yield*/, supertest_1.default(app).delete("/category/remove-one/" + creatingRes.body.id)];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
test("update category if exists", function () { return __awaiter(void 0, void 0, void 0, function () {
    var categoriesRes, categories, id, oneCategory, creatingCategory, creatingRes, categoryCreated, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, supertest_1.default(app).get("/category/get-all")];
            case 1:
                categoriesRes = _a.sent();
                categories = categoriesRes.body;
                id = categories[0].id;
                return [4 /*yield*/, supertest_1.default(app).get("/category/get-one-by-id/" + id)];
            case 2:
                oneCategory = _a.sent();
                creatingCategory = new category_dto_1.CategoryCreateDto({
                    category: Math.random().toString(36).slice(2),
                    longitude: 1,
                    latitude: 1,
                    counter: 1,
                });
                return [4 /*yield*/, supertest_1.default(app).post("/category/add-new")
                        .set("Content-Type", "application/json")
                        .send(creatingCategory)];
            case 3:
                creatingRes = _a.sent();
                categoryCreated = creatingRes.body;
                categoryCreated.category = oneCategory.body.category;
                return [4 /*yield*/, supertest_1.default(app).put("/category/update-one")
                        .set("Content-Type", "application/json")
                        .send(categoryCreated)];
            case 4:
                res = _a.sent();
                expect(res.header["content-type"]).toBe("text/html; charset=utf-8");
                expect(res.statusCode).toBe(403);
                return [4 /*yield*/, supertest_1.default(app).delete("/category/remove-one/" + creatingRes.body.id)];
            case 5:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=category.test.js.map