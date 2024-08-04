import express from "express";
import {resolve} from "path";

const app = express();

app.use(express.static(resolve(__dirname, "./public/dist")));

app.listen(process.env.PORT ?? 8080, () => console.log("client is up and running"));
