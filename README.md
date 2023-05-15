# AzureLabs

This repository is a collection of practice labs that I have created to help me hone my skills and gain practical experience working with various Azure services and technologies.

Below are the labs completed so far. More will be added.

### [Azure Durable Functions]

1. [Durable Function](https://github.com/Jhedie/AzureLabs/tree/main/DurableFunctions)
    - creating simple durable function that converts denary to binary. The function will use orchestration to chain together calls to a function which in this case will convert a given denary number to binary.
    - [Following lab](https://learn.microsoft.com/en-us/azure/azure-functions/durable/quickstart-ts-vscode?pivots=nodejs-model-v4)
2. [Approval System Function App](https://github.com/Jhedie/AzureLabs/tree/main/approvalSystemFuncApp)
    - Orchestrating a long-running workflow as a set of activities using Durable Functions.
    - [Following lab](https://learn.microsoft.com/en-us/training/modules/create-long-running-serverless-workflow-with-durable-functions/1-introduction)
3. [Simple Function App](https://github.com/Jhedie/AzureLabs/tree/main/SimpleFunctionApp)
    - Simple function that takes a name as parameter and returns a string
    - It function can also take an image from one blob storage space to another using bindings
