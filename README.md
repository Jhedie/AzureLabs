# AzureLabs

This repository is a collection of practice labs that I have created to help keep track and gain practical experience working with various Azure services and technologies.

Below is a list of the labs explored:

### Azure Functions

1. [Durable Function](https://github.com/Jhedie/AzureLabs/tree/main/DurableFunctions)
   - creating simple durable function that converts denary to binary. The function will use orchestration to chain together calls to a function which in this case will convert a given denary number to binary.
   - [Following lab](https://learn.microsoft.com/en-us/azure/azure-functions/durable/quickstart-ts-vscode?pivots=nodejs-model-v4)
2. [Approval System Function App](https://github.com/Jhedie/AzureLabs/tree/main/approvalSystemFuncApp)
   - Orchestrating a long-running workflow as a set of activities using Durable Functions.
   - [Following lab](https://learn.microsoft.com/en-us/training/modules/create-long-running-serverless-workflow-with-durable-functions/1-introduction)
3. [Simple Function App](https://github.com/Jhedie/AzureLabs/tree/main/SimpleFunctionApp)
   - Simple function that takes a name as parameter and returns a string
   - It function can also take an image from one blob storage space to another using bindings

### Azure VMs

1. [Azure Managed Identities](https://learn.microsoft.com/en-us/azure/active-directory/managed-identities-azure-resources/qs-configure-portal-windows-vm):
   - This helps to avoid passing credentials or hardcode them in virtual machines.
2. Connecting to Azure VMs:
   - [Azure Bastion](https://learn.microsoft.com/en-us/azure/bastion/bastion-connect-vm-rdp-windows)
   - RDP(Remote Desktop Protocol)
   - ssh

### ARM Templates

1. [Deploy Azure infrastructure by using JSON ARM templates](https://github.com/Jhedie/AzureLabs/tree/main/azTemplates):

   - [Following Lab](https://learn.microsoft.com/en-us/training/modules/create-azure-resource-manager-template-vs-code/)

2. Deploy and manage resources in Azure by using JSON ARM templates:
   - [Following Lab](https://learn.microsoft.com/en-us/training/modules/modify-azure-resource-manager-template-reuse/1-introduction)

### Azure Container Instances

1. [Run Docker with Azure Container Instances](https://learn.microsoft.com/en-us/training/modules/run-docker-with-azure-container-instances/)
   - Learning how to create containers
   - configure restart policies,
   - connect to resources for example, COSMOS DB using environment variables to pass the connection information in a secure way.
   - Mount an Azure file share to an Azure container instance for later access
   - Troubleshoot Azure Container Instances using logs, metrics and running executions

### Azure Container Registry

1.  [Create Azure Container Registry](https://learn.microsoft.com/en-us/azure/container-registry/container-registry-get-started-portal?tabs=azure-cli)

    - Create azure container registry instance and push container image into the registry

2.  Prepare a geo-replicated Azure Container Registry
    - [Follwing Lab](https://learn.microsoft.com/en-us/azure/container-registry/container-registry-tutorial-prepare-registry)

    - Preparation
      - Create a azure container registry and replicated in another region
      - Clone a sample web application that serves an HTML page that displays the region from which the image was deployed by Azure Container Registry.
      - build docker image and pushed to ACR which should show in both regions.
    - Deploy
      - Deploy web app from the geo-replicated Azure container registry
    - Update:
      - Push an updated container image to the geo-replicated container registry for automatic regional web app deployments
      - modify application
      - rebuild image
      - push to ACR
      - view webhook logs
      - view updated webapps
      - The idea is once a new version of the app is pushed to the ACR, webhooks work    like a notification system, they tell containers of the webapps to locally pull the latest changes from the nearest replica of the registry.
     - Issues discovered: Project uses .NET version 2 which is not [compatible](https://github.com/NuGet/Home/issues/12227#issuecomment-1548221158) on M1 chips. Switch to different OS to save time.

### Azure Storage Queues
1. [Azure Queue Storage client library for JavaScript](https://github.com/Jhedie/AzureLabs/tree/main/AzureStorage/queues-quickstart)
   - [Following lab](https://learn.microsoft.com/en-us/azure/storage/queues/storage-quickstart-queues-nodejs?tabs=passwordless%2Croles-azure-cli%2Cenvironment-variable-windows%2Csign-in-azure-cli#update-a-message-in-a-queue)

### Resources:

1. [ExamPro](https://app.exampro.co/)
2. [Microsoft Learn](https://learn.microsoft.com/en-us/)
3. [Whizlabs](https://www.whizlabs.com/learn/course/microsoft-azure-certification-az-204/300)
