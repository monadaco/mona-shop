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

// app.get("*", (req, res) => {
//   res.sendFile(join(__dirname, "./public/dist", "index.html"));
// });

const port = process.env.PORT ?? 8080;

app.listen(process.env.PORT ?? 8080, () => console.log(`client is up and running on port ${port}`));
