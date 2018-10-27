const generic = require("../generic");
const validator = require("../schema/validateSchema");
const schema = require("../schema/schema");
const empty = require("is-empty");



const createRequest = async (ctx) => {

    const data = ctx.request.body;
    const response = await validator.validatePostData(data);
    if(response.response === 422){
        return response;
    }

    const offer =  schema.post(data);
    const results = await generic.insertIntoCollection("requests", await offer);
    if(results._id){
        let response = {response: 200, message:"success"};
        return  response;
    }else{
        let response = {response: 400, error:"ops something wrong couldn't add user"};
        return  response;
    }
    
}
const getRequest = async (ctx) => {
    const response = await validator.validateId(ctx)
    if(response.response === 422){
        return response;
    }
    const id = ctx.params.id;
    const db = await generic.getDatabaseByName();
    const result = await db.db.collection("requests").aggregate(
        [
            {
                $match: {$or:[{id:id}]}
            }
        ])
    const arrResults = await result.toArray();
    db.connection.close();
    return  {response: 200, message:"success", data:JSON.parse(JSON.stringify(arrResults))};

}
const updateRequest = async (ctx) => {
    const response = await validator.validateIdOnPost(ctx)
    if(response.response === 422){
        return response;
    }
    
    const data = ctx.request.body;
    if(empty(data)){
        return {response: 409, message:"no data to update"}
    }
    const result = await generic.updateDocument("requests", data.id, data);
    if(result === 1){
        return {response: 200, message:"success"};
    }else{
        return {response: 409, message:"ops something went wrong"};
    }
}

const deleteRequest = async (ctx) =>{
    const response = await validator.validateIdOnPost(ctx)
    if(response.response === 422){
        return response;
    }
    const data = ctx.request.body;
    const resultResponse = await generic.deleteDocument("requests", data.id);

    return resultResponse;
}


module.exports = {
    deleteRequest
}