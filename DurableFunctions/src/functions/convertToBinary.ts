import {
  app,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  InvocationContext,
} from "@azure/functions";
import * as df from "durable-functions";
import {
  ActivityHandler,
  OrchestrationContext,
  OrchestrationHandler,
} from "durable-functions";

const activityName = "convertToBinary";

const convertToBinaryOrchestrator: OrchestrationHandler = function* (
  context: OrchestrationContext
) {
  const outputs = [];
  outputs.push(yield context.df.callActivity(activityName, 256));
  outputs.push(yield context.df.callActivity(activityName, 2));
  outputs.push(yield context.df.callActivity(activityName, 8));

  return outputs;
};
df.app.orchestration(
  "convertToBinaryOrchestrator",
  convertToBinaryOrchestrator
);

const convertToBinary: ActivityHandler = (input: number): string => {
  // convert input to binary
  const binaryString = input.toString(2);
  return `DecimalNumber: ${input} in binary is: ${binaryString}`;
};
df.app.activity(activityName, { handler: convertToBinary });

const convertToBinaryHttpStart: HttpHandler = async (
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponse> => {
  const client = df.getClient(context);
  const body: unknown = await request.text();
  const instanceId: string = await client.startNew(
    request.params.orchestratorName,
    { input: body }
  );

  context.log(`Started orchestration with ID = '${instanceId}'.`);

  return client.createCheckStatusResponse(request, instanceId);
};

app.http("convertToBinaryHttpStart", {
  route: "orchestrators/{orchestratorName}",
  extraInputs: [df.input.durableClient()],
  handler: convertToBinaryHttpStart,
});
