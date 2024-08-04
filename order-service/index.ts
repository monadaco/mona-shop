import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { productRouter } from "./routes/product";
import { ordersRouter } from "./routes/order";

console.log(process.env.DATABASE_URL);

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/products", productRouter);
app.use("/api/orders", ordersRouter);

app.use("*", (req, res) => {
  res.send(req.path);
});

app.listen(process.env.PORT ?? 8081, () => console.log("client is up and running"));
