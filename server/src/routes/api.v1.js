import express from "express";
import { planetsRouter } from "#routes/planets/planets.router.js";
import { launchesRouter } from "#routes/launches/launches.router.js";

export const api_v1 = express.Router();

api_v1.use("/planets", planetsRouter);
api_v1.use("/launches", launchesRouter);
