"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExaminationModule = void 0;
const common_1 = require("@nestjs/common");
const examination_controller_1 = require("./examination.controller");
const examination_service_1 = require("./examination.service");
const bull_1 = require("@nestjs/bull");
let ExaminationModule = class ExaminationModule {
};
exports.ExaminationModule = ExaminationModule;
exports.ExaminationModule = ExaminationModule = __decorate([
    (0, common_1.Module)({
        imports: [bull_1.BullModule.registerQueue({ name: 'report-cards' })],
        controllers: [examination_controller_1.ExaminationController],
        providers: [examination_service_1.ExaminationService],
        exports: [examination_service_1.ExaminationService],
    })
], ExaminationModule);
//# sourceMappingURL=examination.module.js.map