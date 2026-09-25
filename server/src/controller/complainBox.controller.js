import complaintModel from "../model/complainBox.model.js";
import BatchModel from "../model/Batch.model.js";
import userModel from "../model/user.model.js"
import Vote from '../model/vote.model.js'
import { sendComplainConfirmation, sendComplainEmailNotification } from '../utils/mailer.js'


export async function Writecomplain(req, res) {
    try {
        const { subject, message, categories } = req.body;
        if (!categories) {
            return res.status(400).json({
                success: false,
                message: "please select categories"
            })
        }
        if (!subject || !message) {
            return res.status(400).json({
                success: false,
                message: "All field's are required"
            });
        }

        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "student not found"
            });
        }

        if (!user.isProfileComplete) {
            return res.status(403).json({
                success: false,
                message: "Please complete your profile before submitting a complaint"
            });
        }
        const complain = await complaintModel.create({
            user: req.user.id,
            batch: user.batch,
            subject: subject,
            categories: categories,
            message,
        });

        const populateComplain = await complaintModel.findById(complain._id)
            .populate('user', 'username email')
            .populate({
                path: 'batch',
                populate: [
                    { path: 'program' },
                    { path: 'branch' }
                ]
            });

        try {
            sendComplainEmailNotification(populateComplain).catch(err => console.error("send Complain Email Notification error", err.message));
            sendComplainConfirmation(populateComplain).catch(err => console.error("send complain confirmation error", err.message));
        } catch (error) {
            console.error("error in send email notification complain box", error.message)
        }

        return res.status(201).json({
            success: true,
            message: "Notification send successFully ",
            data: populateComplain
        });

    } catch (error) {
        console.error("Error occurring in complain box controller", error.message);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
}

export async function deleteComplain(req, res) {
    try {
        const userId = req.user.id;
        const { complaintId } = req.params;

        const complaint = await complaintModel.findById(complaintId);

        if (!complaint) {
            return res.status(404).json({
                success: false,
                message: "Complaint not found"
            });
        }

        //check uwnerchip
        if (String(complaint.user) !== String(userId)) {
            return res.status(403).json({
                success: false,
                message: "You can only delete your own complaint"
            });
        }

        // Time window check  1 houre 

        const ONE_HOUR_MS = 60 * 60 * 1000;
        const timeSinceCreation = Date.now() - new Date(complaint.createdAt).getTime();

        if (timeSinceCreation > ONE_HOUR_MS) {
            return res.status(403).json({
                success: false,
                message: "This complaint can no longer be deleted. The 1-hour edit window has expired."
            });
        }

        // Delete the complaint and its votes (cleanup)
        await Vote.deleteMany({ complaint: complaintId });
        await complaintModel.deleteOne({ _id: complaintId });

        return res.status(200).json({
            success: true,
            message: "Complaint deleted successfully"
        });

    } catch (error) {

        console.error("deleteComplain error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Error deleting complaint"
        });
    }
}
