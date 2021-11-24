"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
var ErrorHandler = /** @class */ (function () {
    function ErrorHandler(statusCode, message) {
        this.statusCode = statusCode;
        this.message = message;
    }
    ErrorHandler.prototype.handleError = function (res) {
        res.status(this.statusCode).json({
            message: this.message,
        });
    };
    return ErrorHandler;
}());
exports.ErrorHandler = ErrorHandler;
//# sourceMappingURL=error-middleware.js.map