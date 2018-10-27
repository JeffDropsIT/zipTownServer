const generic = require("../generic");
const validator = require("../schema/validateSchema");
const schema = require("../schema/schema");
const auth =  require(".../auth");
const empty = require("is-empty");



const createOffer = async (ctx) => {

}
const getOffer = async (ctx) => {

}
const updateOffer = async (ctx) => {

}

const deleteOffer = async (ctx) =>{
    const response = await generic.deleteDocument("offers", 1);

    return response;
}

module.exports = {
    deleteOffer
}