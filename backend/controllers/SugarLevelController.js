import SugarLevel from '../models/SugarLevelModel.js';

export const getValueforSugarLevel = async(req, res)=>{
    try {

        const SugarLevelData = new SugarLevel(req.body);
        await SugarLevelData.deleteOne({'patientId' : SugarLevelData.patientId, 'date': SugarLevelData.date })

        if(!SugarLevelData){
            return res.status(404).json({msg: "Sugar level data not found"});
        }
       

        await SugarLevelData.save();
        res.status(200).json({msg: "Sugar level value added successfully"});

    } catch (error) {
        res.status(500).json({error: error});
    }
}




export const getAll_SugarLevel_RecordsbyId = async (req, res) => {
    try {
        const id = req.params.id; 
        const AllSugarLevelList = await SugarLevel.find({ patientId: id }).sort({ date: -1 }).limit(5);
        
        res.status(200).json(AllSugarLevelList); 
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
};

