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
var express_1 = __importDefault(require("express"));
var express_validator_1 = require("express-validator");
var category_dto_1 = require("../dtos/category.dto");
var category_service_1 = __importDefault(require("../services/category.service"));
var router = express_1.default.Router();
router.get("/get-all", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var categoryName, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                categoryName = req.query.categoryName || "";
                return [4 /*yield*/, category_service_1.default.findAll(categoryName)];
            case 1:
                result = _a.sent();
                res.json(result);
                return [2 /*return*/];
        }
    });
}); });
router.get("/get-one-by-id/:id", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = Number(req.params.id);
                return [4 /*yield*/, category_service_1.default.GetOneById(id)];
            case 1:
                result = _a.sent();
                res.json(result);
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                next(e_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post("/add-new", express_validator_1.body("category").not().isEmpty(), express_validator_1.body("counter").not().isEmpty(), express_validator_1.body("latitude").not().isEmpty(), express_validator_1.body("longitude").not().isEmpty(), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, creatingModel, result, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(400).json({ error: errors.array() })];
                }
                creatingModel = new category_dto_1.CategoryCreateDto(req.body);
                return [4 /*yield*/, category_service_1.default.CreateOne(creatingModel)];
            case 1:
                result = _a.sent();
                res.json(result);
                return [3 /*break*/, 3];
            case 2:
                e_2 = _a.sent();
                next(e_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.put("/update-one", express_validator_1.body("category").not().isEmpty(), express_validator_1.body("counter").not().isEmpty(), express_validator_1.body("latitude").not().isEmpty(), express_validator_1.body("longitude").not().isEmpty(), express_validator_1.body("id").not().isEmpty(), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, updatingModel, result, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(400).json({ error: errors.array() })];
                }
                updatingModel = new category_dto_1.CategoryUpdateDto(req.body);
                return [4 /*yield*/, category_service_1.default.UpdateOne(updatingModel)];
            case 1:
                result = _a.sent();
                res.json(result);
                return [3 /*break*/, 3];
            case 2:
                e_3 = _a.sent();
                next(e_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.delete("/remove-one/:id", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = Number(req.params.id);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, category_service_1.default.RemoveOneById(id)];
            case 2:
                result = _a.sent();
                res.json(result);
                return [3 /*break*/, 4];
            case 3:
                e_4 = _a.sent();
                next(e_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.get("/get-pagination/:pageNumber/:pageSize", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var pageNumber, pageSize, categoryName, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                pageNumber = Number(req.params.pageNumber);
                pageSize = Number(req.params.pageSize);
                categoryName = req.query.categoryName || "";
                return [4 /*yield*/, category_service_1.default.GetPagination(pageNumber, pageSize, categoryName)];
            case 1:
                result = _a.sent();
                res.json(result);
                return [2 /*return*/];
        }
    });
}); });
exports.default = router;
//# sourceMappingURL=category.controller.js.map