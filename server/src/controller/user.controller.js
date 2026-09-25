import userModel from "../model/user.model.js";
import BranchModel from "../model/Branch.model.js";
import BatchModel from "../model/Batch.model.js";
import ProgramModel from "../model/Program.model.js";
import complainBox from "../model/complainBox.model.js"
import Vote from '../model/vote.model.js'

export async function getMyBranchAllCompain(req, res) {
    try {
        const userId = req.user.id; // ye token verify ho ke ayega middelware se 

        const student = await userModel.findById(userId).populate({
            path: 'batch',
            populate: ['program', 'branch']
        });

        if (!student || !student.batch) {
            return res.status(404).json({
                success: false,
                message: "Batch information not found for this student"
            });
        }

        // find branches and program to fetch complain
        const { program, branch } = student.batch;
        let batchIds;

        if (branch) {
            const batchesInBranch = await BatchModel.find({ branch: branch._id }).select('_id');
            batchIds = batchesInBranch.map(b => b._id)
        } else {
            const batchesInProgram = await BatchModel.find({ program: program._id, branch: null }).select('_id');
            batchIds = batchesInProgram.map(b => b._id)
        }

        const complaints = await complainBox.find({ batch: { $in: batchIds } })
            .populate('user', 'username email')
            .populate({
                path: 'batch',
                populate: [
                    { path: 'program' },
                    { path: 'branch' },
                ]
            })
            .sort({ createdAt: -1 })
            .lean();

        const complaintsWithVotes = await Promise.all(
            complaints.map(async (complaint) => {
                const voteCount = await Vote.countDocuments({ complaint: complaint._id });
                const hasVoted = await Vote.exists({ complaint: complaint._id, user: userId });

                // flag for private 
                // now it  is for all categoeries leter we can make it for only Anti - ragging ke liye 
                const isOwncomplain = String(complaint.user._id) === String(userId);
                const displayUser = (complaint.isAnonymous && !isOwncomplain)
                    ? { username: "Anonymous", email: null }
                    : complaint.user;

                return {
                    ...complaint,
                    user: displayUser,
                    voteCount,
                    hasVoted: !!hasVoted
                };
            })
        );
        return res.status(200).json({
            success: true,
            message: complaints.length === 0 ? "No complaints found for this batch" : "Complaints found",
            data: complaintsWithVotes
        });

    } catch (error) {
        console.error("getComplainsById controller error", error.message);
        res.status(500).json({
            success: false,
            message: "Error fetching complaints"
        });

    }
}

export async function UserProfile(req, res) {
    try {
        const { program, branch, year, sem, phone } = req.body;
        if (!program || !year || !sem || !phone) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const batch = await BatchModel.findOne({
            program, branch: branch || null, year
        });

        if (!batch) {
            // console.error("invalid combination",error.message)
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
                sem: Number(sem),
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
        console.error("UserProfile error:", error);
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

