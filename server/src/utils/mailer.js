import axios from 'axios'
import config from '../config/config.js';

//  Base Template 
function emailTemplate(bodyHTML) {
    return `
    <div>
        <div> CampusVoice </div>
        <div>${bodyHTML}</div>
        <div>© ${new Date().getFullYear()} CampusVoice</div>
    </div>
    `;
}


//  Core Sender 
const sendEmail = async ({ to, subject, html }) => {
    try {
        await axios.post('https://api.brevo.com/v3/smtp/email', {
            sender: { name: 'CampusVoice', email: process.env.BREVO_SENDER_EMAIL },
            to: [{ email: to }],
            subject,
            htmlContent: html
        }, {
            headers: {
                'api-key': process.env.BREVO_API_KEY,
                'Content-Type': 'application/json'
            }
        });
    } catch (err) {
        console.error('❌ Email failed:', err.response?.data || err.message);
        throw err;
    }
};
export async function sendWelcomeEmail(email, username) {
    await sendEmail({
        to: email,
        subject: "Welcome to CampusVoice!",
        html: emailTemplate(
            `<h2> welcome ${username}!🎉</h2>
            <p>We're excited to have you on CampusVoice.</p>
            <p></p>
            `
        )
    });
}

export async function sendOTPEmail(email, otp, purpose = "verify") {
    // console.log("OTP Email Function Called");
    // console.log({ email, otp, purpose });
    const subject = {
        verify: "verify your Email - CampusVoice",
        forgot: "Reset password OTP - CampusVoice",
    };

    await sendEmail({
        to: email,
        subject: subject[purpose],
        html: emailTemplate(
            `
         <h2>Your OTP Code</h2>
            <p>Use the OTP below to ${purpose} your account:</p>
            <div>${otp}</div>
            <p>This OTP expires in <strong>5 minutes</strong>.</p>
            <p>If you didn't request this, ignore this email.</p>
        `
        )
    })
}


//  Password Reset Email 
export async function sendPasswordResetEmail(email, username) {
    await sendEmail({
        to: email,
        subject: "Password Reset Successful - CampusVoice",
        html: emailTemplate(`
            <h3>Hi ${username}, 👋</h3>
            <p >Your password has been changed successfully.</p>
            <div>✅ Password Updated</div>
            <p>If you didn't make this change, contact support immediately.</p>
            <div>
                <a href="${config.CLIENT_URL}/Profile"
                   target="_blank" rel="noopener">
                    Go to Account
                </a>
            </div>
        `)
    });
}

//complain box email  To admin
export async function sendComplainEmailNotification(complain) {
    try {
        await sendEmail({
            to: config.BREVO_SENDER_EMAIL,
            subject: `Complain from ${complain.branch} Branch`,
            html: emailTemplate(`
                <h2> New Complaibn Arrive form ${complain.batch}</h2>
                <p><strong>Student name </strong> = ${complain.user}</p>
                <p> <strong>Student email </strong>= ${complain.email}</p>
                <p><strong>Complain </strong>=${complain.message} </p>
                <p>${complain.message} </p>
                `)
        })

    } catch (error) {
        console.log("sendComplainEmailNotification having error", message.err);
        throw error;
    }
}

// complain notificatiion to student
export async function sendComplainConfirmation(complain) {
    try {
        await sendEmail({
            to: complain.email,
            subject: `We recived your message = CampusVoice`,
            html: emailTemplate(`
                <h2>Submitted new complain regarding ${complain.subject}</h2>
                <p>Thanks for reaching out${complain.username} </p>
                <p></p>
                <p></p>
                `)
        })

    } catch (error) {
        console.error("send complain confernametion having error", message.error);
        throw error;
    }
}

