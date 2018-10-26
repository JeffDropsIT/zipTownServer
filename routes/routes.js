const Router = require("koa-router");
const router = new Router();
const Greetings = require("../controllers/greetings.js")


router.get("/",Greetings.greeting);

module.exports = {
    router
}