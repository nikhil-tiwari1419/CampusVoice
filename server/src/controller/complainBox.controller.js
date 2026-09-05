import complaintModel from "../model/complainBox.model.js";
import BatchModel from "../model/Batch.model.js";
import userModel from "../model/user.model.js"
import { sendComplainConfirmation, sendComplainEmailNotification } from '../utils/mailer'


export async function Writecomplain(req, res) {
    try {
        const { subject, message } = req.body;
        if (!subject || !message) {
            return res.status(400).json({
                success: false,
                message: "All field's are required"
            });
        }

        const student = await userModel.findById(req.user.id);
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Please complain your profile first"
            })
        }
        const complain = await complaintModel.create({
            user: req.user.id,
            batch: student.batch,
            subject: subject || "General",
            message,

        })

        const populateComplain = await complaintModel.findById(complain._id)
            .populate('user', 'username', 'email')
            .populate({
                path: 'batch',
                populate: [{ path: 'program' }, { path: 'branch' }]
            });

        try {
            sendComplainEmailNotification(complain).catch(err => console.err("send Complain Email Notification error", err.message));
            sendComplainConfirmation(complain).catch(err => console.err("send complain confirmation error", err.message));
        } catch (error) {
            console.error("error in send email notification complain box", error.message)
        }

        return res.status(200).json({
            success: true,
            message: "Notification send successFully ",
            data: complain
        })
    } catch (error) {
        console.errro("Error aucuring in complain box controller", message.error);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
}