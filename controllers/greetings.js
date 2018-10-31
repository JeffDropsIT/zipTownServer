
const greeting = function(ctx){
    ctx.body = JSON.parse(JSON.stringify("Welcome to ZipTown, a product of DevDesign Pty Ltd."));
}
module.exports = {
    greeting
}