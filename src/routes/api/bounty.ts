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
    benefactor: "",
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
  const req: any = ctx.request.body;
  let bounty: Bounty = {
    id: req.id || "",
    amount: req.amount || 0,
    assignee: req.assignee || "",
    benefactor: req.benefactor || "",
  };

  if (bounty.id === "" || bounty.amount <= 0 || bounty.benefactor === "") {
    return (ctx.response.res.statusCode = 400);
  }
  try {
    let bty = await prisma.bounty.findFirst({
      where: {
        id: bounty.id,
      },
    });
    if (bty) {
      await prisma.bounty.update({
        where: {
          id: bounty.id,
        },
        data: {
          amount: bounty.amount,
          assignee: bounty.assignee,
          benefactor: bounty.benefactor,
        },
      });
    } else {
      await prisma.bounty.create({
        data: bounty,
      });
    }
    ctx.response.res.statusCode = 204;
  } catch (error) {
    console.log(error);
    return (ctx.response.res.statusCode = 400);
  }
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
