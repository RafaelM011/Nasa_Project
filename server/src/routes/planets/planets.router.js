import Router from "express";
import { httpGetAllPlanets } from "./planets.controller.js";

export const planetsRouter = Router();

planetsRouter.get("/", httpGetAllPlanets);
