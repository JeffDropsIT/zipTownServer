const genId = require("../counters/counters").getNextSequenceValue
const auth = require("../../auth");

const user = async (data) => {
    const form = {
        id: await  genId("userId", "usersIndex"),
        fullName: data.fullName.toLowerCase(),
        city: data.city.toLowerCase(),
        contact: data.contact,
        created: new Date(),
        userType: data.userType.toLowerCase(),
        password: await auth.hashPassword(data.password)
    }

    return form;
}
const getId = async (data) =>{
    let id;
    if(String(data.postType) === "offer"){
        
        id = await genId("offerId", "offersIndex");
        console.log("offerId: "+id);
    }else if(String(data.postType) === "request"){
        
        id = await genId("requestId", "requestsIndex");
        console.log("reqId: "+id);
    }
    return id;
}
const postData = async (data) => {
    console.log("post") ;
    const form = {
        id: await getId(data),
        publisherId: data.publisherId,
        depatureTime: data.depatureTime,
        returnTime: data.returnTime,
        days: data.days,
        origin: data.origin,
        destination: data.destination,
        city: data.city,
        publisher: data.publisher,
        created: new Date(),
        contact: data.contact,
        postType: data.postType,
    }
    return form;
}


module.exports = {
    user,
    postData
}