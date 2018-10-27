const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const generic = require("../controllers/db/generic")



const hashPassword = async (password) =>{
    const hash = await bcrypt.hashSync(password, salt);
    return hash;
};

const getUserAuth = async (contact)=>{
    try{
        const status = await generic.checkIfUserContactExist(contact);
        if( status === 0){ 
            console.log("username or phone number does not exit"+ contact);
            return {response: 404, message:"contact or password incorrect"};
        }
        const db = await generic.getDatabaseByName();
        const result = await db.db.collection("users").aggregate([{$match: {$or:[{contact:contact}]}}])
        const arrResults = await result.toArray();
        db.connection.close();
        return  {response: 200, message:"success", data:JSON.parse(JSON.stringify(arrResults[0]))};
    }catch(err){
        throw new Error(err);
    }
}
//not jest tested
const authenticateUser = async (contact, password) =>{
    const response = await getUserAuth(contact, password);
    if(response.response === 404){
        return response.response;
    }
    const user = response.data;
    const isPassword = await bcrypt.compareSync(password, user.password);
    if(isPassword){
        delete user.password
        return {response: 200, message:"success", data:[user]};
    }else{
        return {response: 404, message:"contact or password incorrect"};
    }
}

//not jest tested
const updateUserPassword = async (contact, password) =>{
    const response = await getUserAuth(contact, password);
    if(response.response === 404){
        return response.response;
    }
    const user = response.data;
    const isPassword = await bcrypt.compareSync(password, user.password);
    if(isPassword){
        //update password
        const result = await generic.updateUserDocument("users", contact, {password:password});
        if(result === 1){
            return {response: 200, message:"success"};
        }else{
            return {response: 409, message:"ops something went wrong"};
        }
        
    }else{
        return {response: 409, message:"password incorrect"};
    }
}


//updateUserPassword("+2771008479811", "password123").then(data => console.log(data));


module.exports = {
    hashPassword,
    authenticateUser,
    updateUserPassword
}