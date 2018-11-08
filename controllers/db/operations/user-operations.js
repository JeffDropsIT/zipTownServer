const generic = require("../generic");
const validator = require("../schema/validateSchema");
const schema = require("../schema/schema");
const auth =  require("../../../controllers/auth");
const empty = require("is-empty");
const offersOps = require("../operations/offers-operations");
const reqOps = require("../operations/requests-operations");
//tested
const createUser = async(ctx) =>{
    try {
        const data = ctx.request.body;
        const response = await validator.validateUserData(data);
        if(response.response === 422){
            ctx.body = response;
            return response;
        }

        const status = await generic.checkIfUserContactExist(data.contact);

        if(status === 1){ 
            let response = {response: 409, error:"phone number already exist"};
            ctx.body = response;
            return  response;
        }else{
            const user = await schema.user(data);
            const results = await generic.insertIntoCollection("users",  user);
            if(results._id){
                const ctxT = {
                    params: {
                        id:user.id
                    }
                }
                let response = await getUser(ctxT);
                ctx.body = response;
                return  response;
            }else{
                let response = {response: 400, error:"ops something wrong couldn't add user"};
                ctx.body = response;
                return  response;
            }
            
        }
        
    } catch (error) {
        throw new(error);
    }
}


//not jest tested
const getUser = async (ctx) => {
    const response = await validator.validateId(ctx)
    if(response.response === 422){
        ctx.body = response;
        return response;
    }
    const id = ctx.params.id;
    const db = await generic.getDatabaseByName();
    //change returning the password to client
    const result = await db.db.collection("users").aggregate(
        [
            {
                $match: {$or:[{id:parseInt(id)}]}
            },
            {
                $project: {fullName: 1, contact:1, userType: 1, city: 1, created:1, id:1, password:1}
                    
            }
        ])
    const arrResults = await result.toArray();
    db.connection.close();
    const offers =  offersOps.getUsersOffers(ctx);
    const requests = reqOps.getUsersRequests(ctx);

    const res = {user:JSON.parse(JSON.stringify(arrResults[0])), offers: await offers, requests: await requests}
    ctx.body =  res;
    return  res


}

const userLogin = async (ctx) => {
    const response = await validator.validateLogin(ctx)
    if(response.response === 422){
        ctx.body = response;
        return response;
    }
    const authenticateUser = await auth.authenticateUser(ctx.request.body.contact, ctx.request.body.password);
    ctx.body = authenticateUser;
    return authenticateUser
}
const updateUser = async (ctx) => {
    const response = await validator.validateIdOnPost(ctx)
    if(response.response === 422){
        ctx.body = response;
        return response;
    }
    
    const data = ctx.request.body;
    
    const id = data.id;
    delete data.id;
    delete data.password;
    delete data.contact;
    if(empty(data)){
        ctx.body =  {response: 409, error:"no data to update"};
        return {response: 409, error:"no data to update"}
    }
    const result = await generic.updateDocument("users", id, data);
    if(result === 1){
        ctx.body = {response: 200, message:"success"};;
        return {response: 200, message:"success"};
    }else{
        ctx.body = {response: 409, error:"ops something went wrong"};;
        return {response: 409, error:"ops something went wrong"};
    }
}
const updateUserPassword = async (ctx) => {
    const response = await validator.validateLogin(ctx)
    if(response.response === 422){
        ctx.body = response;
        return response;
    }
    const resultResponse = await auth.updateUserPassword(ctx.request.body.contact, ctx.request.body.password);
    ctx.body = resultResponse;
    return resultResponse;
}




module.exports = {
    createUser,
    getUser,
    userLogin,
    updateUser,
    updateUserPassword
}
