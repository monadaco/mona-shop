import express from "express";
import {resolve} from "path";
import {createProxyMiddleware} from "http-proxy-middleware";

const app = express();

app.use(
  "/api",
  createProxyMiddleware({
    target: `http://${process.env.API_URL ?? "localhost:8081"}`,
    changeOrigin: true,
  })
);
app.use(express.static(resolve(__dirname, "./public/dist")));

app.listen(process.env.PORT ?? 8080, () => console.log("client is up and running"));
