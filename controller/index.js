const { handleMessage, sendMessage } = require("./lib/telegram")
const { errorHandler } = require ("./lib/helper");

async function handler(req,method){
    try {
        if(method==="GET"){
            return "Hello Get";
        }

        const {body} = req;
        if(body && body.message){
            console.log("message body",body.message);
            const messageObj = body.message;
            console.log("in handler");
            await handleMessage(messageObj);
            return "success";
        }
        return "unknown request";
    } catch (error) {
        
    }
}

module.exports ={handler};