import Router from "express";
import { httpGetAllLaunches, httpSubmitLaunch, httpDeleteLaunch } from "#routes/launches/launches.controller.js";
import { validateLaunch } from "../../requests/launches.request.js";

export const launchesRouter = Router();

launchesRouter.get("/", httpGetAllLaunches);
launchesRouter.post("/", [validateLaunch, httpSubmitLaunch]);
launchesRouter.delete("/:id", httpDeleteLaunch);
