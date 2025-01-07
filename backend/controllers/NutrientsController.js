import UserDailyMealDataModel from "../models/UserDailyMealDataModel.js";
import { convertDate } from '../middleware/dateUtil.js';


export const createMeal = async(req, res)=>{
    try {

        const userData = new UserDailyMealDataModel(req.body);

        if(!userData){
            return res.status(404).json({msg: "Meal data not found"});
        }

        await userData.save();
        res.status(200).json({msg: "Meal data stored successfully"});

    } catch (error) {
        res.status(500).json({error: error});
    }
}


export const updateMeal = async(req, res) =>{
    try {

        const id = req.params.id;
        const userExist = await User.UserDailyMealDataModel(id);
        if(!userExist){
            return res.status(401).json({msg:"User not found"});
        }

        const updatedData = await UserDailyMealDataModel.findByIdAndUpdate(id, req.body, {new:true});
        res.status(200).json({msg: "User's Meal updated successfully"});
        
    } catch (error) {
        res.status(500).json({error: error});
    }
}


export const getAllMealsOfOnePatientByDate = async (req, res) => {
   
    try {
        const id = req.params.id; 
        const dateStr = (req.body.date); 
      
        const allMeals = await UserDailyMealDataModel.find({
            patientId: id,
            date: convertDate(dateStr), 
        });
    
        if (allMeals.length === 0) {
            return res.status(404).json({ msg: "No meal found for this patient on the given date" });
        }
    
        res.status(200).json(allMeals); 
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
    
};

export const deleteMeal = async(req, res) =>{
    try {

        const id = req.params.id;
        const userExist = await UserDailyMealDataModel.findById(id);
        
        if(!userExist){
            return res.status(404).json({msg: "User's meal does not exist"});
        }
        await UserDailyMealDataModel.findByIdAndDelete(id);
        res.status(200).json({msg: "Meal has been deleted successfully"});
        
    } catch (error) {
        res.status(500).json({error: error});
    }
}