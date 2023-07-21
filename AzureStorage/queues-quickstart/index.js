const { QueueClient } = require("@azure/storage-queue");
const { DefaultAzureCredential } = require("@azure/identity")
const {  v1: uuidv1 } = require("uuid")

async function main() {
    console.log("Azure Queue Storage client library - JavaScript quickstart sample");
    
    //create a unique queue name
    // const queueName = "lunarqueue" + uuidv1();
    const queueName = "lunarqueue50a8b020-270b-11ee-9703-c10239655bff";
    //Instantiate a Queueclient wich will be be used to create and interact with a queue
    const queueClient = new QueueClient(`https://lunarvaults.queue.core.windows.net/${queueName}`, new DefaultAzureCredential());
    const createQueueResponse = await queueClient.createIfNotExists();
    console.log("Queue created, requestId:", createQueueResponse.requestId);

    console.log("\nAdding messages to the queue...");

    // Send several messages to the queue ..All sends are unique. so running the program everytime will add the names
    await queueClient.sendMessage("Fox");
    await queueClient.sendMessage("Rex");
    await queueClient.sendMessage("Ben");
    
    await getNumberOfMessages();
    
    await getMessagesFromQueue();

    
    //Dequeue message queue whist updating:

    /**
     * after first run will look like this:
     * Printing Messages in the queue
         Rex
         Ben
         Dequeued and updated was Fox
     */
    const  {receivedMessageItems}  = await queueClient.receiveMessages({ messages: 32 });
    for (const message of receivedMessageItems) {
        const updatedContent = "Dequeued and updated" + " was " + message.messageText;
        const updateMessageResponse = await queueClient.updateMessage(
            message.messageId,
            message.popReceipt,
            updatedContent
        );
        console.log("Message updated, requestId:", updateMessageResponse.requestId);
    }
    
 
    await getMessagesFromQueue();     
    
    // uncomment to delete messages
    // await clearMessages();

    

    async function getNumberOfMessages() {
        //get queue length
        const properties = await queueClient.getProperties();
        console.log("Approximate queue length: ", properties.approximateMessagesCount);
        return properties.approximateMessagesCount - 1;
    }

    async function clearMessages() {
        console.log("\nDeleting queue...");
        const deleteQueueResponse = await queueClient.delete();
        console.log("Queue deleted, requestId:", deleteQueueResponse.requestId);
    }

    async function getMessagesFromQueue() {
        console.log("Printing Messages in the queue");
        // console.log("\nPeek at the messages in the queue");
        //peek at messages in the queue
        const peekedMessages = await queueClient.peekMessages({ numberOfMessages: 31 });
    
        for (let index = 0; index < peekedMessages.peekedMessageItems.length; index++) {
            console.log("\t", peekedMessages.peekedMessageItems[index].messageText);
    
        }
    }
}


main().then(() => console.log("\nDone")).catch((ex) => console.log(ex.message));

/**
 * Queues messages are stored as strings.
 * If you need to send a different data type, 
 * you must serialize that data type into a string 
 * when sending the message and deserialize the string 
 * format when reading the message.
 */

function jsonToBase64(jsonObj) {
    const jsonString = JSON.stringify(jsonObj)
    return  Buffer.from(jsonString).toString('base64')
}
function encodeBase64ToJson(base64String) {
    const jsonString = Buffer.from(base64String,'base64').toString()
    return JSON.parse(jsonString)
}

    

