
const notify = require("../../cloud/cloud-messaging")
const generic = require("../generic");
const validator = require("../schema/validateSchema");
const counters = require("../counters/counters")
const empty = require("is-empty");




const createMessage = async ctx => {
    const data = ctx.request.body;
    const response = await validator.validatePostDataMessage(data);
    if(response.response === 422){
        ctx.body = response;
        return  response;
    }
    const message = {
        username: data.username,
        from: data.from,
        to: data.to, 
        roomMembers: [data.from, data.to],
        message: data.message,
        messageId: await counters.getNextSequenceValue("messageId", "messagesIndex"),
        senderClientId: data.token,
        status: data.status,
        timeSent: data.timeSent,
        created: new Date()
    }
    const results = await generic.insertIntoCollection("messages", message);
    console.log(results);
    if(results._id){
        let response = {response: 200, message:"success"};
        notify.sendMessage("message", data.token, message);
        ctx.body = response;
        return  response;
    }else{
        let response = {response: 400, error:"ops something wrong couldn't sent message"};
        ctx.body = response;
        return  response;
    }
    
}



module.exports = {
    createMessage
}