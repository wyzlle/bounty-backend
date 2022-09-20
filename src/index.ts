import Koa from "koa";
import { router } from "./routes/";
import bodyParser from "koa-bodyparser";

const app = new Koa();

app.use(bodyParser());
app.use(router.routes());

app.listen(3000);
