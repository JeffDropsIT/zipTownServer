const Nexmo = require('nexmo');
const conf = require("./config");
const getRandomNumber = require("../mock/formData").getRandomNumber
const nexmo = new Nexmo({
 apiKey: conf.keys.api_key,
 apiSecret: conf.keys.api_secret
});


const genFourDigitCode = () => {
    
    let OTP = "";
    for(let i = 0; i < 4; i++){
        OTP += getRandomNumber();
    }
    return OTP;

}

const genText = () => {
    const code = genFourDigitCode();
    const text = `ZIPTOWN code: ${code}. Valid for 3 minutes`;
    return {text: text, code: code};
}
const verifyPhoneNumber = async (ctx) => {
    const contact = ctx.query.contact;
    const results = genText();
    const VIRTUAL_NUMBER = conf.keys.from;
    nexmo.message.sendSms(
        VIRTUAL_NUMBER, contact, results.text ,
        async(err , responseData) =>{
        if (err) {
            console.log(err);
            ctx.body = {response:500, message:"error occured"};
            return {response:500, message:"error occured"}
        } else {
            responseData["code"] = results.code;
            ctx.body = responseData;
            console.log("body ",ctx.body)
            return {response:200, message:"sucess", data:responseData}
    
        }
        }
    );
    await timeout(1500);
    
};

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const verify = async (err , responseData, ctx) => {
    if (err) {
        console.log(err);
        ctx.body = {response:200, message:"sucess", data:responseData};
        return {response:200, message:"sucess", data:responseData}
    } else {
        //responseData["code"] = results.code;
        console.dir(responseData);
        ctx.body = responseData;
        console.log("body ",ctx.body)
        return {response:200, message:"sucess", data:responseData}

    }
}
//verifyPhoneNumber('27721197616');
 module.exports = {
     verifyPhoneNumber
 }