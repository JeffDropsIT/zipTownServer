const Router = require("koa-router");
const router = new Router();
const Greetings = require("../controllers/greetings.js")
const userOps = require("../controllers/db/operations/user-operations");
const offersOps = require("../controllers/db/operations/offers-operations");
const clientOps = require("../controllers/db/operations/clients-operations");
const messageOps = require("../controllers/db/operations/messaging-operations");
const sms = require("../controllers/sms");
const requestOps = require("../controllers/db/operations/requests-operations");
router.get("/",Greetings.greeting);

router.post("/ziptown/account/create",userOps.createUser);
router.post("/ziptown/account/login",userOps.userLogin);
router.delete("/ziptown/account/user/offer/:id/",offersOps.deleteOffer);
router.post("/ziptown/account/user/offer",offersOps.createOffer);
router.post("/ziptown/account/user/request",requestOps.createRequest);
router.get("/ziptown/account/user/:id",userOps.getUser);
router.put("/ziptown/account/user/edt/:id",userOps.updateUserPassword);
router.post("/ziptown/account/user/edt/:id",userOps.updateUser);
router.post("/ziptown/account/user/data/client",clientOps.createClient); 
router.get("/ziptown/account/user/data/client/:userId",clientOps.getClient); 
router.get("/ziptown/account/user/:id/offers",offersOps.getUsersOffers);
router.delete("/ziptown/account/user/request/:id/",requestOps.deleteRequest);
router.get("/ziptown/account/user/:id/requests",requestOps.getUsersRequests);
router.get("/ziptown/account/verify",sms.verifyPhoneNumber);
router.get("/ziptown/app/requests",requestOps.getRequests);
router.post("/ziptown/app/search/requests",requestOps.searchOnRequests);
router.get("/ziptown/app/offers",offersOps.getOffers);
router.post("/ziptown/app/search/offers",offersOps.searchOnOffers);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
router.post("/ziptown/account/notification/user/data",messageOps.createMessage); 


module.exports = {
    router
}