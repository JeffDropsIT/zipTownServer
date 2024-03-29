
const generateContact = () =>{
    let contact = "+27";
    for(let i = 0; i < 10; i++){
        contact += getRandomNumber();
    }
    return contact;
}
const getRandomNumber = () => {
    return Math.floor((Math.random() * 9));
}

const sampleUser = {
    fullName: "Phindile Sthah Ngobese",
    city: "Pretoria",
    contact:   generateContact(),
    userType: "Driver",
    password: "password123"
}
const sampleUserMissingParam = {
    fullName: "Phindile Sthah Ngobese",
    city: "Pretoria",
    contact: generateContact(),
   // userType: "Driver",
    password: "password123"
}
const sampleQueryString = {
    request: {body:sampleUser}
}

const sampleReqUpdateUser = {
    request: {
        body:
        {
            id:13,
            fullName: "Jane",
            city: "Durbane",
            password: "password123",
            contact: "+2771008479811"
        }
    }
}
const sampleUserRequestLogin = {
    request: {
        body:
        {
        password: "password123",
        contact: "+2771008479811"
        }
    }
}
const sampleQueryStringDublicateParam = {
    request: {body:sampleUser}
}
const sampleQueryStringMissingParam = {
    request: {body:sampleUserMissingParam}
}

const sampleOffer = {
    publisherId: 13,
    depatureTime: "8 AM",
    returnTime: "16 PM",
    days: "Mon, Wed, Tue, Thur, Fri",
    origin: "Pretoria",
    destination: "Randburg",
    city: "Durbane",
    publisher: "jane",
    contact: "+2710248161134",
    postType: "request"
        
}

const sampleOfferPosted = {
    request: {body:sampleOffer}
}
const samplePostRequest = {
    publisherId: 13,
    depatureTime: "8 AM",
    returnTime: "16 PM",
    days: "Mon, Wed, Tue, Thur, Fri",
    origin: "Pretoria",
    destination: "Randburg",
    city: "Pretoria",
    publisher: "Phindile Sthah Ngobese",
    contact: generateContact(),
    postType: "request"
        
}


const samplePostOffer = {
    publisherId: "publisherId",
    depatureTime: "depatureTime",
    returnTime: "returnTime",
    days: "days",
    origin: "origin",
    destination: "destination",
    city: "city",
    publisher: "publisher",
    contact: "contact",
    postType: "offer"
        
}
const cleanUserData = {
    fullName: "fullName",
    city: "city",
    contact: "contact",
    userType: "userType",
    password: "password"
}

const missingParameterUserData = {
    fullName: "fullName",
    city: "city",
    //contact: "contact",
    userType: "userType"
}

const cleanPostData = {
    publisherId: "publisherId",
    depatureTime: "depatureTime",
    returnTime: "returnTime",
    days: "days",
    origin: "origin",
    destination: "destination",
    city: "city",
    publisher: "publisher",
    contact: "contact",
    postType: "postType"
        
}
const missingParameterPostData = {
    publisherId: "publisherId",
    depatureTime: "depatureTime",
    returnTime: "returnTime",
    days: "days",
    destination: "destination",
    //city: "city",
    origin: "origin",
    publisher: "publisher",
    contact: "contact",
    postType: "postType"
        
}
module.exports = {
    cleanUserData,
    missingParameterUserData,
    cleanPostData,
    missingParameterPostData,
    samplePostOffer,
    samplePostRequest, 
    sampleUser,
    sampleQueryStringDublicateParam,
    sampleQueryString, 
    sampleQueryStringMissingParam,
    sampleUserRequestLogin,
    sampleReqUpdateUser,
    sampleOfferPosted,
    getRandomNumber
}