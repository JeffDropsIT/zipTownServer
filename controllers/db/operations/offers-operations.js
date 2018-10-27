const generic = require("../generic");
const validator = require("../schema/validateSchema");
const schema = require("../schema/schema");
const empty = require("is-empty");



const createOffer = async (ctx) => {

    const data = ctx.request.body;
    const response = await validator.validatePostData(data);
    if(response.response === 422){
        ctx.body = response;
        return  response;
    }

    const offer =  schema.post(data);
    const results = await generic.insertIntoCollection("offers", await offer);
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
    ctx.body = {response: 200, message:"success", data:JSON.parse(JSON.stringify(arrResults))};
    return  {response: 200, message:"success", data:JSON.parse(JSON.stringify(arrResults))};

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
    ctx.body =  {response: 200, message:"success", data:JSON.parse(JSON.stringify(arrResults))};
    return  {response: 200, message:"success", data:JSON.parse(JSON.stringify(arrResults))};

}

const updateOffer = async (ctx) => {
    const response = await validator.validateIdOnPost(ctx)
    if(response.response === 422){
        ctx.body = response;
        return  response;
    }
    
    const data = ctx.request.body;
    if(empty(data)){
        ctx.body = {response: 409, message:"no data to update"}
        return {response: 409, message:"no data to update"}
    }
    const result = await generic.updateDocument("offers", data.id, data);
    if(result === 1){
        ctx.body = {response: 200, message:"success"};
        return {response: 200, message:"success"};
    }else{
        ctx.body = {response: 409, message:"ops something went wrong"};
        return {response: 409, message:"ops something went wrong"};
    }
}

const deleteOffer = async (ctx) =>{
    const response = await validator.validateIdOnPost(ctx)
    if(response.response === 422){
        ctx.body = response;
        return  response;
    }
    const data = ctx.request.body;

    const resultResponse = await generic.deleteDocument("offers", data.id);
    ctx.body = resultResponse;
    return resultResponse;
}


module.exports = {
    deleteOffer,
    getOffers,
    getUsersOffers,
    createOffer,
    updateOffer
}