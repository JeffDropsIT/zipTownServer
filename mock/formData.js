
const generateContact = () =>{
    let contact = "+27";
    for(let i = 0; i < 10; i++){
        contact += getRandomNumber();
    }
    return contact;
}
const getRandomNumber = () => {
    return Math.floor((Math.random() * 10) + 1);
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
    query: sampleUser
}
const sampleQueryStringDublicateParam = {
    query: sampleUser
}
const sampleQueryStringMissingParam = {
    query: sampleUserMissingParam
}


const samplePostRequest = {
    publisherId: "publisherId",
    depatureTime: "depatureTime",
    returnTime: "returnTime",
    days: "days",
    origin: "origin",
    destination: "destination",
    city: "city",
    publisher: "publisher",
    contact: "contact",
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
    sampleQueryStringMissingParam
}