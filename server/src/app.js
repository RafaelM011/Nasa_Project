import express from "express";
import cors from "cors";
import { planetsRouter } from "#routes/planets/planets.router.js";
import { launchesRouter } from "#routes/launches/launches.router.js";

const app = express();
const origin = "http://localhost:4000";

app.use(cors({
  origin,
}))

app.get("/", (_, res) => res.redirect(`${origin}/launch`))

app.use(express.static("public"));
app.use(express.json());
app.use("/planets", planetsRouter);
app.use("/launches", launchesRouter);

app.get("/*route", (_, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
})

export default app;
