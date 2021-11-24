"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
require("reflect-metadata");
var category_controller_1 = __importDefault(require("./controllers/category.controller"));
var app = express_1.default();
var port = 3000;
// Middleware
app.use(cors_1.default());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
// Controllers
app.use("/category", category_controller_1.default);
app.use(function (error, req, res, next) {
    error.handleError(res);
});
app.listen(port, function () {
    console.log("app listening on port " + port + "!");
});
//# sourceMappingURL=app.js.map