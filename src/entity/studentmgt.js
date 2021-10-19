"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentmgt = void 0;
var typeorm_1 = require("typeorm");
var studentmgt = /** @class */ (function () {
    function studentmgt() {
        this.isDisabled = false;
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], studentmgt.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: "name" }),
        __metadata("design:type", String)
    ], studentmgt.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: "grade" }),
        __metadata("design:type", String)
    ], studentmgt.prototype, "grade", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: "17.1" }),
        __metadata("design:type", String)
    ], studentmgt.prototype, "batchno", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: "0000000" }),
        __metadata("design:type", String)
    ], studentmgt.prototype, "indexNo", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: "email@sample.com" }),
        __metadata("design:type", String)
    ], studentmgt.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], studentmgt.prototype, "image", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Boolean)
    ], studentmgt.prototype, "isDisabled", void 0);
    studentmgt = __decorate([
        (0, typeorm_1.Entity)()
    ], studentmgt);
    return studentmgt;
}());
exports.studentmgt = studentmgt;
