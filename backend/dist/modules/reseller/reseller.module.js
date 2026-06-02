"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResellerModule = void 0;
const common_1 = require("@nestjs/common");
const reseller_controller_1 = require("./reseller.controller");
const reseller_portal_controller_1 = require("./reseller-portal.controller");
const reseller_service_1 = require("./reseller.service");
let ResellerModule = class ResellerModule {
};
exports.ResellerModule = ResellerModule;
exports.ResellerModule = ResellerModule = __decorate([
    (0, common_1.Module)({
        controllers: [reseller_controller_1.ResellerController, reseller_portal_controller_1.ResellerPortalController],
        providers: [reseller_service_1.ResellerService],
        exports: [reseller_service_1.ResellerService],
    })
], ResellerModule);
//# sourceMappingURL=reseller.module.js.map