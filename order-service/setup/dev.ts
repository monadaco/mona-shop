import { PrismaClient, Product } from "@prisma/client";
const prisma = new PrismaClient();

const products: Product[] = [
  {
    id: 1,
    image: `https://${process.env.BUCKET_NAME}.s3.${process.env.BUCKET_REGION}.amazonaws.com/image_1.webp`,
    title: "cups",
    description: "cups description",
    price: 29,
  },
  {
    id: 2,
    image: `https://${process.env.BUCKET_NAME}.s3.${process.env.BUCKET_REGION}.amazonaws.com/image_2.webp`,
    title: "cups",
    description: "cups description",
    price: 34,
  },
  {
    id: 3,
    image: `https://${process.env.BUCKET_NAME}.s3.${process.env.BUCKET_REGION}.amazonaws.com/image_3.webp`,
    title: "cups",
    description: "cups description",
    price: 12,
  },
  {
    id: 4,
    image: `https://${process.env.BUCKET_NAME}.s3.${process.env.BUCKET_REGION}.amazonaws.com/image_4.webp`,
    title: "cups",
    description: "cups description",
    price: 38,
  },
];

async function run() {
  for (let product of products) {
    await prisma.product.upsert({
      where: {
        id: Number(product.id),
      },
      create: product,
      update: product,
    });
  }
}

run();
