import BloodPressure from '../models/BloodPressure.js';

export const getValueforBP = async(req, res)=>{
    try {

        const bpData = new BloodPressure(req.body);
        await bpData.deleteOne({'patientId' : bpData.patientId, 'date': bpData.date })

        if(!bpData){
            return res.status(404).json({msg: "Blood Pressure data not found"});
        }
       

        await bpData.save();
        res.status(200).json({msg: "Blood Pressure value added successfully"});

    } catch (error) {
        res.status(500).json({error: error});
    }
}

