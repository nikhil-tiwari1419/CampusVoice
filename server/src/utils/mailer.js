import axios from 'axios'
import config from '../config/config.js';

//  Base Template 
function emailTemplate(bodyHTML) {
    return `
    <div>
        <div> MusicMenia</div>
        <div>${bodyHTML}</div>
        <div>© ${new Date().getFullYear()} MusicMenia</div>
    </div>
    `;
}


//  Core Sender 
const sendEmail = async ({ to, subject, html }) => {
    try {
        await axios.post('https://api.brevo.com/v3/smtp/email', {
            sender: { name: 'Beacon', email: process.env.BREVO_SENDER_EMAIL },
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
        subject: "Welcome to Beacon!",
        html: emailTemplate(
            `<h2> welcome ${username}!🎉</h2>
            <p>We're excited to have you on Beacon.</p>
            <p></p>
            `
        )
    });
}

export async function sendOTPEmail(email, otp, purpose = "verify") {
    // console.log("OTP Email Function Called");
    // console.log({ email, otp, purpose });
    const subject = {
        verify: "verify your Email - Beacon",
        forgot: "Reset password OTP - Beacon",
    };

    await sendEmail({
        to: email,
        subject: subject[purpose],
        html: emailTemplate(
            `
         <h2>Your OTP Code</h2>
            <p>Use the OTP below to ${purpose} your account:</p>
            <div>${otp}</div>
            <p>This OTP expires in <strong>10 minutes</strong>.</p>
            <p>If you didn't request this, ignore this email.</p>
        `
        )
    })
}


//  Password Reset Email 
export async function sendPasswordResetEmail(email, username) {
    await sendEmail({
        to: email,
        subject: "Password Reset Successful - MusicMenia",
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
