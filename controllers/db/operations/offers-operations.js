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
const searchOnOffers = async(ctx) => {
    const response = await validator.validateSearch(ctx);
    if(response.response != 200){
        return response;
    }
    const data = ctx.request.body;
    const db = await generic.getDatabaseByName();
    const result = await db.db.collection("offers").aggregate([
        {$match:{$or : [
          {"city": { '$regex' : data.city.toLowerCase(), '$options' : 'i' }},
          {"returnTime": { '$regex' : data.returnTime.toLowerCase(), '$options' : 'i' }},
          {"depatureTime": { '$regex' : data.depatureTime.toLowerCase(), '$options' : 'i' }},
          {"days": { '$regex' : data.days.toLowerCase(), '$options' : 'i' }},
          {"origin": { '$regex' : data.origin.toLowerCase(), '$options' : 'i' }},
          {"destination": { '$regex' : data.destination.toLowerCase(), '$options' : 'i' }}
        ]}}
    ])
    const arrResults = await result.toArray();
    db.connection.close();
    ctx.body =  JSON.parse(JSON.stringify(arrResults));
    return   JSON.parse(JSON.stringify(arrResults));

}
const getOffers = async (ctx) => {

    const db = await generic.getDatabaseByName();
    const response = await validator.validateCity(ctx);
    if(response.response != 200){
        return response;
    }

    let city = ctx.query.city;
    city = city.toLowerCase()
    let fallback = ctx.query.fallback;
    if(fallback){
        city = city.toLowerCase()
        const result = await db.db.collection("requests").find({});
        const arrResults = await result.toArray();
        db.connection.close();
        ctx.body =  JSON.parse(JSON.stringify(arrResults));
        return   JSON.parse(JSON.stringify(arrResults));
    }
    const result = await db.db.collection("offers").aggregate([{$match:{$or : [
        {"city": { '$regex' :city, '$options' : 'i' }}
      ]}}]);
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
    updateOffer,
    searchOnOffers
}