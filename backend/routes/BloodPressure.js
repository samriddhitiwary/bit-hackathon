import express from 'express';
import { getValueforBP } from '../controllers/BloodPressure.js';
import BPModel from '../models/BloodPressure.js'; 
const getValueforBPRouter = express.Router();


getValueforBPRouter.post("/getValueforBP", getValueforBP);


getValueforBPRouter.get("/getLatestBPData/:patientId", async (req, res) => {
//   try {
//     const patientId = req.params.patientId;
//     const bpData = await BPModel.find({ patientId })
//       .sort({ date: -1 }) 
//       .limit(5); 
//     res.json(bpData);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error fetching BP data');
//   }
});

export default getValueforBPRouter;
