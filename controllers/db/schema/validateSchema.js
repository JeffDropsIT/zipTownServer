const validateUserData = data => {
    try {
        let fullName = data.fullName.toLowerCase(),
            city = data.city.toLowerCase(),
            contact = data.contact.toLowerCase(),
            userType = data.userType.toLowerCase();
            password = data.password.toLowerCase();
        
        return {response: 200, message: "success"};
    } catch (error) {
        return {response: 422, error: "missing parameter (Unprocessable Entity)"};
    }
}

const validateId = async(ctx) =>{
    const id = ctx.params.id;

    if(id){
        return  {response: 200, message:"success"};
    }else{
        return {response: 422, error: "missing parameter (Unprocessable Entity)"};
    }

}

const validateIdOnPost = async(ctx) =>{

    const idOnPost = ctx.request.body.id;
    if(idOnPost){
        return  {response: 200, message:"success"};
    }else{
        return {response: 422, error: "missing parameter (Unprocessable Entity)"};
    }

}


const validateLogin = async(ctx) =>{
    const contact = ctx.request.body.contact;
    const password = ctx.request.body.password;
    if(contact && password){
        return  {response: 200, message:"success"};
    }else{
        return {response: 422, error: "missing parameter (Unprocessable Entity)"};
    }

}

const validatePostData = data => {
    console.log("validatePostData: ", data)
    try {
        let publisherId =  String(data.publisherId).toLowerCase(),
            depatureTime = data.depatureTime.toLowerCase(),
            returnTime = data.returnTime.toLowerCase(),
            days = data.days.toLowerCase(),
            origin = data.origin.toLowerCase(),
            destination = data.destination.toLowerCase(),
            city = data.city.toLowerCase(),
            publisher = data.publisher.toLowerCase(),
            contact = data.contact.toLowerCase(),
            postType = data.postType.toLowerCase();
        
        return {response: 200, message: "success"};
    } catch (error) {
        return {response: 422, error: "missing parameter (Unprocessable Entity)"};
    }
}

module.exports = {
    validateUserData,
    validatePostData,
    validateId,
    validateLogin,
    validateIdOnPost
}