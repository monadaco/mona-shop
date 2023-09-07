import express from "express";
import { PrismaClient } from "@prisma/client";
import { routeWrapper } from "./route-wrapper";
import bodyParser from "body-parser";
import { createInvoice } from "./invoice-generator";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const router = express.Router();
const prisma = new PrismaClient();

router.post(
  "/order",
  bodyParser.text({ type: "*/*" }),
  routeWrapper(async (req, res) => {
    const id = req.body;
    console.log({ id });
    const order = await prisma.order.findFirst({
      where: { id: Number(id) },
      select: {
        id: true,
        date: true,
        fullName: true,
        email: true,
        total: true,
        ProductOrders: {
          select: {
            amount: true,
            Product: {
              select: {
                image: true,
                title: true,
                description: true,
                price: true,
              },
            },
          },
        },
      },
    });

    if (order) {
      const bucketClient = new S3Client({});
      const key = `${id}-${Date.now()}.html`;
      const command = new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: key,
        Body: createInvoice(order),
        ContentType: "text/html",
      });
      await bucketClient.send(command);

      // do stuff
      res
        .status(200)
        .json({ url: `https://${process.env.BUCKET_NAME}.s3.${process.env.BUCKET_REGION}.amazonaws.com/${key}` });
      return;
    }

    res.status(404).send("No order");
  })
);

export const invoiceRouter = router;
