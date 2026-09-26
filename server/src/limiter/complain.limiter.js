import rateLimit from "express-rate-limit"

const sendComplain = rateLimit({
    windowMs: 24 * 60 * 60 * 1000,
    max: 2,
    message: { message: "Student can only raiesd 2 complain per day" }
});

export default { sendComplain }
