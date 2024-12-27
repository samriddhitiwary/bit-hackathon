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

