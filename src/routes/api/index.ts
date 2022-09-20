import Router from "@koa/router";
import { apiBountyRouter } from "./bounty";

export const apiRouter = new Router({
  prefix: "/api",
});

apiRouter.use(apiBountyRouter.routes()).use(apiBountyRouter.allowedMethods());
