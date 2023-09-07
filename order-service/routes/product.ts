import express, { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { routeWrapper } from "./route-wrapper";
import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import multer from "multer";

const router = express.Router();
const prisma = new PrismaClient();

const uploadFile = async (file: Express.Multer.File) => {
  const key = file.originalname;

  const bucketClient = new S3Client({});
  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: key,
    Body: file?.buffer,
    ContentType: file?.mimetype,
  });
  await bucketClient.send(command);
  return `https://${process.env.BUCKET_NAME}.s3.${process.env.BUCKET_REGION}.amazonaws.com/${key}`;
};

const formatProductUpdate = async (req: express.Request) => {
  const product = req.body;
  if (req.file) {
    product.image = await uploadFile(req.file);
  }
  if (product.price) {
    product.price = typeof product.price === "string" ? Number(product.price) : product.price;
  }
  return product;
};

const getAll = async (res: Response) => {
  const products = await prisma.product.findMany({});
  res.status(200).json({
    products,
  });
};

router.get(
  "/",
  routeWrapper(async (req, res) => {
    await getAll(res);
  })
);

router.post(
  "/",
  multer().single("image"),
  routeWrapper(async (req, res) => {
    await prisma.product.create({ data: await formatProductUpdate(req) });
    await getAll(res);
  })
);

router.put(
  "/:id",
  multer().single("image"),
  routeWrapper(async (req, res) => {
    await prisma.product.update({
      where: {
        id: Number(req.params.id),
      },
      data: await formatProductUpdate(req),
    });
    await getAll(res);
  })
);

router.delete(
  "/:id",
  routeWrapper(async (req, res) => {
    const product = await prisma.product.findFirst({
      where: {
        id: Number(req.params.id),
      },
      select: {
        image: true,
      },
    });

    if (product?.image) {
      const imageNameSplit = product.image.split("/");
      const bucketClient = new S3Client({});
      const command = new DeleteObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: imageNameSplit[imageNameSplit.length - 1],
      });
      await bucketClient.send(command);
    }

    await prisma.product.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    await getAll(res);
  })
);

export const productRouter = router;
