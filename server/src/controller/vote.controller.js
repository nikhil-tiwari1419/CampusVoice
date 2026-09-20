import Vote from "../model/vote.model.js";
import complainModel from '../model/complainBox.model.js'
import userModel from "../model/user.model.js";

export async function togglevote(req, res) {
    try {
        const userId = req.user.id;
        const { complaintId } = req.params;

        const complaint = await complainModel.findById(complaintId).populate('batch')

        if (!complaint) {
            return res.status(404).json({
                success: false,
                message: "Complain not found"
            });
        }

        const student = await userModel.findById(userId).select('batch');
        if (!student.batch || String(student.batch) !== String(complaint.batch._id)) {
            return res.status(403).json({
                success: false,
                message: "You can only vote on complaints from your own batch"
            });
        }

        const existingVote = await Vote.findOne({ complaint: complaintId, user: userId });

        if (existingVote) {
            await Vote.deleteOne({ _id: existingVote._id });
            const voteCount = await Vote.countDocuments({ complaint: complaintId });
            return res.status(200).json({
                success: true,
                message: "Vote removed",
                voted: false,
                voteCount
            });
        }

        await Vote.create({ complaint: complaintId, user: userId });
        const voteCount = await Vote.countDocuments({ complaint: complaintId });
        return res.status(200).json({
            success: true,
            message: "Vote added",
            voted: true,
            voteCount
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ success: false, message: "You already voted on this complaint" });
        }
        console.error("toggleVote error:", error.message);
        res.status(500).json({ success: false, message: "Error processing vote" });
    }
}

export async function getVoteStatus(req, res) {
    try {
        const userId = req.user.id;
        const { complaintId } = req.params;

        const voteCount = await Vote.countDocuments({ complaint: complaintId });
        const hasVoted = await Vote.exists({ complaint: complaintId, user: userId });

        return res.status(200).json({
            success: true,
            voteCount,
            hasVoted: !!hasVoted
        });

    } catch (error) {
        console.error("getVoteStatus error:", error.message);
        res.status(500).json({ success: false, message: "Error fetching vote status" });
    }
}
