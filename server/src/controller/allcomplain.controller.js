import userModel from "../model/user.model.js";
import BranchModel from "../model/Branch.model.js";
import BatchModel from "../model/Batch.model.js";
import ProgramModel from "../model/Program.model.js";
import complainBox from "../model/complainBox.model.js"

export async function getAllCompain(req, res) {
    try {
        const complain = await complainBox.find()
            .populate('user', 'username email')
            .populate({
                path: 'batch',
                populate: [{ path: 'program' }, { path: 'branch' }]
            });

        if (complain.length === 0) {
            return res.status(404).json({
                success: false,
                messsage: "complain dose not exist"
            });
        }

        return res.status(200).json({
            success: true,
            messsage: "Complain found",
            data: complain
        });

    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: true,
            messsage: "getAllcomplain controller error"
        })
    }
}

