const { axios } = require("axios");
const { getAxiosInstance } =require("./axios");
const { errorHandler } =require("./helper");

const axiosInstance= getAxiosInstance(process.env.BASE_URL);

function sendMessage(chatId,messageText) {
    return axiosInstance.get("sendMessage",{
        chat_id:chatId,
        text:messageText,
    })
    .catch((err)=>{
        errorHandler(err,"sendMessage",axios)
    })
}

async function handleMessage(messageObj){
    const messageText = messageObj.text || "";
    if (!messageText){
        errorHandler("No message text","handleMessage");
        return "";
    }

    try{
        const chatId=messageObj.chat.id;
        console.log("in handle message",chatId);
        const firstName = messageObj.chat.first_name || "";
        if(messageText.charAt(0) === "/"){
            const command = messageText.substring(1);
            switch(command){
                case "start":
                    return sendMessage(
                        chatId,
                        "Hi I am carnage bot. Let there be some carnage"
                    );
                case "carnage":
                        return sendMessage(
                            chatId,
                            `Hi ${firstName} do you want some carnage??`
                        );    
                default:
                    return sendMessage(chatId,"Hey I do not know that command, do you want some carnage!");    
            }
        }else{
            sendMessage(chatId,messageText);
        }

    }catch(error){
        errorHandler(error,"handleMessage");
    }
}

module.exports ={handleMessage ,sendMessage};