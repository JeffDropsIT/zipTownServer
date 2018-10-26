const Koa = require('koa');
const app = new Koa();
const koaBody = require('koa-body');
const logger = require('koa-logger');
const routes = require('./routes/routes');


// log requests

app.use(logger());
app.use(koaBody({ multipart: true, formLimit: 2000 * 1024}));


app.use(routes.router.routes());
app.use(routes.router.allowedMethods());
app.listen(9000);
console.log('listening on port 9000');