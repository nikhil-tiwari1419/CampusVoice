import complaintModel from "../model/complainBox.model.js";
import BatchModel from "../model/Batch.model.js";
import userModel from "../model/user.model.js"
import { sendComplainConfirmation, sendComplainEmailNotification } from '../utils/mailer.js'


export async function Writecomplain(req, res) {
    try {
        const { subject, message } = req.body;
        if (!message) {
            return res.status(400).json({
                success: false,
                message: "All field's are required"
            });
        }

        const student = await userModel.findById(req.user.id);
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "user not foudn"
            })
        }
        if(!student.batch){
            return res.status(404).json({
                success:false,
                message:"Please complet your profile"
            })
        }
        const complain = await complaintModel.create({
            user: req.user.id,
            batch: student.batch,
            subject: subject,
            message,

        })

        const populateComplain = await complaintModel.findById(complain._id)
            .populate('user', 'username email')
            .populate({
                path: 'batch',
                populate: [{ path: 'program' }, { path: 'branch' }]
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
        })
    } catch (error) {
        console.error("Error occurring in complain box controller", error.message);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
} 
