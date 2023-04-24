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
const functions_1 = require("@azure/functions");
const df = require("durable-functions");
const activityName = "convertToBinary";
const convertToBinaryOrchestrator = function* (context) {
    const outputs = [];
    outputs.push(yield context.df.callActivity(activityName, 256));
    outputs.push(yield context.df.callActivity(activityName, 2));
    outputs.push(yield context.df.callActivity(activityName, 8));
    return outputs;
};
df.app.orchestration("convertToBinaryOrchestrator", convertToBinaryOrchestrator);
const convertToBinary = (input) => {
    // convert input to binary
    const binaryString = input.toString(2);
    return `DecimalNumber: ${input} in binary is: ${binaryString}`;
};
df.app.activity(activityName, { handler: convertToBinary });
const convertToBinaryHttpStart = (request, context) => __awaiter(void 0, void 0, void 0, function* () {
    const client = df.getClient(context);
    const body = yield request.text();
    const instanceId = yield client.startNew(request.params.orchestratorName, { input: body });
    context.log(`Started orchestration with ID = '${instanceId}'.`);
    return client.createCheckStatusResponse(request, instanceId);
});
functions_1.app.http("convertToBinaryHttpStart", {
    route: "orchestrators/{orchestratorName}",
    extraInputs: [df.input.durableClient()],
    handler: convertToBinaryHttpStart,
});
//# sourceMappingURL=convertToBinary.js.map