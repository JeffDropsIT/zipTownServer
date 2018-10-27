const Router = require("koa-router");
const router = new Router();
const Greetings = require("../controllers/greetings.js")
const userOps = require("../controllers/db/operations/user-operations");
const offersOps = require("../controllers/db/operations/offers-operations");
const sms = require("../controllers/sms");
const requestOps = require("../controllers/db/operations/requests-operations");
router.get("/",Greetings.greeting);

router.post("/ziptown/account/create",userOps.createUser);
router.post("/ziptown/account/login",userOps.userLogin);
router.delete("/ziptown/account/user/offer/:id/",offersOps.deleteOffer);
router.post("/ziptown/account/user/offer",offersOps.getOffers);
router.get("/ziptown/account/user/:id/offer",offersOps.getUsersOffers);
router.delete("/ziptown/account/user/request/:id/",requestOps.deleteRequest);
router.post("/ziptown/account/user/request",requestOps.createRequest);
router.get("/ziptown/account/user/:id/request",requestOps.getUsersRequests);
router.get("/ziptown/account/verify",sms.verifyPhoneNumber);
router.get("/ziptown/app/requests",requestOps.getRequests);
router.get("/ziptown/app/offers",offersOps.getOffers);


module.exports = {
    router
}