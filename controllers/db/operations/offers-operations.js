const generic = require("../generic");
const validator = require("../schema/validateSchema");
const empty = require("is-empty");



const createOffer = async (ctx) => {

    const data = ctx.request.body;
    const response = await validator.validatePostData(data);
    if(response.response === 422){
        ctx.body = response;
        return  response;
    }
    const offer =  await require("../schema/schema").postData(data);
    const results = await generic.insertIntoCollection("offers", offer);
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
const getOffers = async (ctx) => {

    const db = await generic.getDatabaseByName();
    const result = await db.db.collection("offers").find({city:ctx.query.city});
    const arrResults = await result.toArray();
    db.connection.close();
    ctx.body = JSON.parse(JSON.stringify(arrResults));
    return  JSON.parse(JSON.stringify(arrResults));

}

const getUsersOffers = async (ctx) => {
    const response = await validator.validateId(ctx)
    if(response.response === 422){
        ctx.body = response;
        return  response;
    }
    const id = ctx.params.id;
    const db = await generic.getDatabaseByName();
    const result = await db.db.collection("offers").aggregate(
        [
            {
                $match: {$or:[{publisherId:parseInt(id)}]}
            }
        ])
    const arrResults = await result.toArray();
    db.connection.close();
    ctx.body =  JSON.parse(JSON.stringify(arrResults));
    return JSON.parse(JSON.stringify(arrResults));

}

const updateOffer = async (ctx) => {
    const response = await validator.validateIdOnPost(ctx)
    if(response.response === 422){
        ctx.body = response;
        return  response;
    }
    
    const data = ctx.request.body;
    if(empty(data)){
        ctx.body = {response: 409, error:"no data to update"}
        return {response: 409, error:"no data to update"}
    }
    const result = await generic.updateDocument("offers", data.id, data);
    if(result === 1){
        ctx.body = {response: 200, message:"success"};
        return {response: 200, message:"success"};
    }else{
        ctx.body = {response: 409, error:"ops something went wrong"};
        return {response: 409, error:"ops something went wrong"};
    }
}

const deleteOffer = async (ctx) =>{
    const response = await validator.validateId(ctx)
    if(response.response === 422){
        ctx.body = response;
        return  response;
    }
    const data = ctx.params.id;

    const resultResponse = await generic.deleteDocument("offers", parseInt(data));
    let res;
    if(resultResponse == 1){
        res  = {response: 200, message:"success"}
    }else{
        res = {response: 500, error:"Ops something went wrong couldn't delete document"};
    }
    ctx.body = res;
    return res;
}


module.exports = {
    deleteOffer,
    getOffers,
    getUsersOffers,
    createOffer,
    updateOffer
}