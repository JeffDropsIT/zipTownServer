
const generic = require("../generic");
const validator = require("../schema/validateSchema");
const empty = require("is-empty");



const createClient = async (ctx) => {

    const data = ctx.request.body;
    const response = await validator.validatePostDataClient(data);
    if(response.response === 422){
        ctx.body = response;
        return  response;
    }
    let client  = {
        userId:data.userId,
        token:data.token,
        created: new Date()
    }


    const isClient = await generic.findClient(client);
    if(isClient){
        let response = {response: 200, message:"already exist"};
        ctx.body = response;
        return  response;
    }
    const results = await generic.insertIntoCollection("clients", client);
    console.log(results);
    if(results._id){
        let response = {response: 200, message:"success"};
        ctx.body = response;
        return  response;
    }else{
        let response = {response: 400, error:"ops something wrong couldn't add user"};
        ctx.body = response;
        return  response;
    }
    
}
const getClient = async ctx => {
    const db = await generic.getDatabaseByName();
    let userId = ctx.params.userId;
    console.log("userId: ", userId)
    if(!userId){
        ctx.body =  {response: 422, error: "missing parameter (Unprocessable Entity)"};
        return  {response: 422, error: "missing parameter (Unprocessable Entity)"};
    }
    const result = await db.db.collection("clients").aggregate([
        {
            $match:{ $and:[{userId:parseInt(userId)}]}
        }
    ])
    const arrResult = await result.toArray();
    if(empty(arrResult)){
        ctx.body = {};
        return {};
    }
    
    const json = JSON.parse(JSON.stringify(arrResult[0]));
    db.connection.close();
    console.log("results: ", json);
    ctx.body = json
    return json;
}
module.exports = {
    createClient,
    getClient
}