import Router from "@koa/router";
import { prisma } from "../../db/prisma";
import { Bounty } from "@prisma/client";
export const apiBountyRouter = new Router({
  prefix: "/bounty",
});

apiBountyRouter.get("/(.*)", async (ctx) => {
  let id = ctx.params[0] === undefined ? "" : ctx.params[0];
  let response: Bounty = {
    id: id,
    amount: 0,
    assignee: "",
  };
  let bounty;

  try {
    bounty = await prisma.bounty.findFirst({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.error(error);
  }

  if (bounty) {
    response = bounty;
  }

  ctx.body = response;
});

apiBountyRouter.put("/", async (ctx) => {
  let bounty: Bounty = { id: "", amount: 0, assignee: "" };

  if (typeof ctx.request.body!.id === "string") {
    bounty.id = ctx.request.body!.id;
  } else {
    return (ctx.response.res.statusCode = 400);
  }
  if (
    typeof ctx.request.body!.amount === "number" &&
    ctx.request.body!.amount > 0
  ) {
    bounty.amount = ctx.request.body!.amount;
  } else {
    return (ctx.response.res.statusCode = 400);
  }
  if (typeof ctx.request.body!.assignee === "string") {
    bounty.assignee = ctx.request.body!.assignee;
  }

  await prisma.bounty.create({
    data: bounty,
  });
  ctx.response.res.statusCode = 204;
});

apiBountyRouter.delete("/(.*)", async (ctx) => {
  let id = ctx.params[0] === undefined ? "" : ctx.params[0];

  try {
    await prisma.bounty.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.error(error);
    return (ctx.response.res.statusCode = 400);
  }

  ctx.response.res.statusCode = 204;
});
