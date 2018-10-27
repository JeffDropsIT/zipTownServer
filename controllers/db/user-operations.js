const generic = require("./generic");
const validator = require("./schema/validateSchema");
const schema = require("./schema/schema");




const createUser = async(ctx) =>{
    try {
        const data = ctx.query;
        const response = await validator.validateUserData(data);
        if(response.response === 422){
            return response;
        }

        const status = await generic.checkIfUserContactExist(data.contact);

        if(status === 1){ 
            let response = {response: 409, error:"phone number already exist"};
            return  response;
        }else{
            const user =  schema.user(data);
            const results = await generic.insertIntoCollection("users", await user);
            if(results._id){
                let response = {response: 200, message:"success"};
                return  response;
            }else{
                let response = {response: 400, error:"ops something wrong couldn't add user"};
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
        return response;
    }
    const id = ctx.params.id;
    const db = await generic.getDatabaseByName();
    const result = await db.db.collection("users").aggregate(
        [
            {
                $match: {$or:[{id:id}]}
            },
            {
                $project: {fullName: 1, contact:1, userType: 1, city: 1, created:1, id}
                    
            }
        ])
    const arrResults = await result.toArray();
    db.connection.close();
    return  {response: 200, message:"success", data:JSON.parse(JSON.stringify(arrResults))};


}


module.exports = {
    createUser
}