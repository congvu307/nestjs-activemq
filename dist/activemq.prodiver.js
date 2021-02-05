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
Object.defineProperty(exports, "__esModule", { value: true });
exports.activeMQProvier = void 0;
const activemq_handler_1 = require("./activemq.handler");
const activeMQProvier = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const handler = new activemq_handler_1.ActiveMQHandler(options);
    yield handler.init();
    return handler;
});
exports.activeMQProvier = activeMQProvier;
