import express from "express";
import { PrismaClient } from "@prisma/client";
import { routeWrapper } from "./route-wrapper";
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

const router = express.Router();
const prisma = new PrismaClient();

router.post(
  "/",
  routeWrapper(async (req, res) => {
    const order: { email: string; fullName: string; items: { productId: number; amount: number }[] } = req.body;
    const { email, fullName, items } = order;
    const itemsByPrices = await prisma.product.findMany({
      where: { id: { in: items.map((p) => p.productId) } },
      select: { price: true, id: true },
    });
    const total = itemsByPrices.reduce(
      (acc, { id, price }) => acc + price * (items.find((p) => p.productId === id)?.amount ?? 0),
      0
    );

    const created = await prisma.order.create({
      data: {
        email,
        fullName,
        total,
        productOrders: {
          create: items,
        },
      },
    });

    const topicClient = new SNSClient({ region: process.env.BUCKET_REGION });
    const command = new PublishCommand({
      Message: `${created.id}`,
      TopicArn: process.env.TOPIC_ARN,
    });
    await topicClient.send(command);

    res.status(200).json({ id: created.id });
  })
);

export const ordersRouter = router;
