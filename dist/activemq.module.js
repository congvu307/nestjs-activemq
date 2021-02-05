"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ActiveMQModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActiveMQModule = void 0;
const common_1 = require("@nestjs/common");
const activemq_handler_1 = require("./activemq.handler");
const activemq_prodiver_1 = require("./activemq.prodiver");
const provide = (options) => {
    return {
        provide: 'ACTIVEMQ_PROVIDER',
        useFactory: () => activemq_prodiver_1.activeMQProvier(options),
    };
};
let ActiveMQModule = ActiveMQModule_1 = class ActiveMQModule {
    static forRoot(options) {
        return {
            module: ActiveMQModule_1,
            providers: [
                activemq_handler_1.ActiveMQHandler,
                {
                    provide: 'ACTIVEMQ_CONFIG',
                    useValue: options,
                },
                provide(options),
            ],
            exports: [
                activemq_handler_1.ActiveMQHandler,
                provide(options),
            ],
        };
    }
};
ActiveMQModule = ActiveMQModule_1 = __decorate([
    common_1.Global(),
    common_1.Module({})
], ActiveMQModule);
exports.ActiveMQModule = ActiveMQModule;
