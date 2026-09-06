import userModel from '../model/user.model.js'
import Program from '../model/Program.model.js'
import Branch from '../model/Branch.model.js'
import Batch from '../model/Batch.model.js'

export async function UserProfile(req, res) {
    try {
        const { program, branch, year, sem, phone } = req.body;
        if (!program || !year || !sem || !phone) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const batch = await Batch.findOne({
            program, branch: branch || null, year
        });

        if (!batch) {
            console.error(error)
            return res.status(404).json({ success: false, message: "Invalid batch combination" });
        }
        const yearNum = Number(year)
        const validSem = [(yearNum * 2 - 1), yearNum * 2]

        if (!validSem.includes(Number(sem))) {
            return res.status(400).json({
                success: false,
                message: `Invalid sem for year ${year} . Valid option: ${validSem.join(' or ')}`
            })
        }

        const updateUser = await userModel.findByIdAndUpdate(req.user.id,
            {
                batch: batch._id,
                sem:Number(sem),
                phone,
                isProfileComplete: true
            },
            { new: true }
        )

        return res.status(200).json({
            success: true,
            message: "Profile update succesfully",
            data: updateUser
        });
    } catch (error) {
        console.error("UserProfile error:", error);   // ← ye line add karo
        res.status(500).json({ success: false, message: "Something went wrong in userprofile page file" });
    }
}

export async function getProfile(req, res) {
    try {
        const student = await userModel.findById(req.user.id).populate({
            path: 'batch',
            populate: [
                { path: 'program' },
                { path: 'branch' }
            ]
        });

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "User not exist "
            });
        }

        return res.status(200).json({ success: true, message: "user found", data: student });
    } catch (error) {
        console.error("getprofile error: ", error)
        res.status(500).json({
            success: false,
            message: "Something went wrong in getProfile",
        })
    }
}

