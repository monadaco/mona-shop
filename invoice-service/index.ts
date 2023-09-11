import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { invoiceRouter } from "./routes/invoice";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/invoice", invoiceRouter);

app.listen(process.env.PORT ?? 8082, () => console.log("client is up and running"));
