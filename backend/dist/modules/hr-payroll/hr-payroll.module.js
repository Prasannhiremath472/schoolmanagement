"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HrPayrollModule = void 0;
const common_1 = require("@nestjs/common");
const hr_payroll_controller_1 = require("./hr-payroll.controller");
const hr_payroll_service_1 = require("./hr-payroll.service");
let HrPayrollModule = class HrPayrollModule {
};
exports.HrPayrollModule = HrPayrollModule;
exports.HrPayrollModule = HrPayrollModule = __decorate([
    (0, common_1.Module)({ controllers: [hr_payroll_controller_1.HrPayrollController], providers: [hr_payroll_service_1.HrPayrollService], exports: [hr_payroll_service_1.HrPayrollService] })
], HrPayrollModule);
//# sourceMappingURL=hr-payroll.module.js.map