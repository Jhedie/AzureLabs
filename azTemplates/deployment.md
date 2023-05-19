### Set some variables

templateFile="azuredeploy.json"
today=$(date +"%d-%b-%Y")
DeploymentName="addnameparameter-"$today

### Deploy template

az deployment group create \
 --name $DeploymentName \
 --template-file $templateFile \
 --parameters storageName={your-unique-name}

### Get All account with subsription conceige...

az account list \
 --refresh \
 --query "[?contains(name, 'Concierge Subscription')].id" \
 --output table
