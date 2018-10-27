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
const VIRTUAL_NUMBER = conf.keys.from;
const from = 'Nexmo';
const to = '27721197616';


const genText = () => {
    const code = genFourDigitCode();
    const text = `ZIPTOWN code: ${code}. Valid for 3 minutes`;
    return {text: text, code: code};
}
const verifyPhoneNumber = async (contact) => {
    const results = genText();
    nexmo.message.sendSms(
        from, contact, results.text ,
            (err, responseData) => {
            if (err) {
                console.log(err);
                return {response:200, message:"sucess", data:responseData}
            } else {
                responseData["code"] = results.code;
                console.dir(responseData);
                return {response:200, message:"sucess", data:responseData}
        
            }
        
            }
    );
    
}
//verifyPhoneNumber('27721197616');
 module.exports = {
     verifyPhoneNumber
 }