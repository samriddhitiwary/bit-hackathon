import Weight from '../models/WeightModel.js';

export const getValueforWeight = async(req, res)=>{
    try {

        const WeightData = new Weight(req.body);
        await WeightData.deleteOne({'patientId' : WeightData.patientId, 'date': WeightData.date })

        if(!WeightData){
            return res.status(404).json({msg: "Weight data not found"});
        }
       

        await WeightData.save();
        res.status(200).json({msg: "Value for weight is added successfully"});

    } catch (error) {
        res.status(500).json({error: error});
    }
}





export const getAll_WeightLevel_RecordsbyId = async (req, res) => {
    try {
        const id = req.params.id; 
        const AllWeightLevelList = await Weight.find({ patientId: id }).sort({ date: -1 }).limit(5);
        
        res.status(200).json(AllWeightLevelList); 
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
};

