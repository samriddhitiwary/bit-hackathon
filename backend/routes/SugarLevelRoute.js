import express from "express";
import { getValueforSugarLevel } from "../controllers/SugarLevelController.js";

const getValueforSugarLevelRouter = express.Router();

getValueforSugarLevelRouter.post("/getValueforSugarLevel",getValueforSugarLevel);

export default getValueforSugarLevelRouter;