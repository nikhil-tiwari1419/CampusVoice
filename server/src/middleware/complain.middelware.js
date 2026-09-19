import userModel from "../model/user.model.js";

export async function checkProfileComplete(req, res, next){
    try {
        const user = await userModel.findById(req.user.id);

        if(!user){
            return res.status(404).josn({
                success:false,
                message:"Student not found"
            });
        }
        
        if(!user.isProfileComplete) {
            return res.status(403).json({
                success:false,
                message:"Please complaet your profile"
            });
        }
        next();

    } catch (error) {
        console.error("checkProfileComplet error:",error);
       return res.status(500).json({
            success:false,
            message:"Error verifying profile status"
        });
    }
}
