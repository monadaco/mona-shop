import express from "express";
import {join} from "path";

const app = express();

const root = join(__dirname, "./public/build");

app.use(express.static(root));

app.get("*", (req, res) => {
  res.sendFile("index.html", {root});
});

app.listen(process.env.PORT ?? 8080, () => console.log("client is up and running"));
