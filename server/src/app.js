import express from "express";
import cors from "cors";
import { api_v1 } from "#routes/api.v1.js";

const app = express();
const origin = "http://localhost:4000";

app.use(cors({origin}));

app.get("/", (_, res) => res.redirect(`${origin}/launch`))

app.use(express.static("public"));
app.use(express.json());
app.use("/v1", api_v1);

app.get("/*route", (_, res) => res.sendFile(`${__dirname}/public/index.html`));

export default app;
