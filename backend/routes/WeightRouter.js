import express from "express";
import { getValueforWeight } from "../controllers/WeightController.js";

const getValueforWeightRouter = express.Router();

getValueforWeightRouter.post("/getValueforWeight",getValueforWeight);

export default getValueforWeightRouter;