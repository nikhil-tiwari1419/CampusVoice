import ratelimiter from 'express-rate-limit'


const loginLimiter = ratelimiter({ // 15 min
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { message: "To many login request attemps! Try after 15 minutes" }
});

const registerLimiter = ratelimiter({ //30 min
    windowMs: 30 * 60 * 1000,
    max: 18,
    message: { message: "Too many account created! Try after 30 min" }
});

const otpLimiter = ratelimiter({ // 10 min
    windowMs: 10 * 60 * 1000,
    max: 3,
    message: { message: "Too many OTP attempts! Try after 10 minutes" }
});

const forgotLimiter = ratelimiter({ // 30 min 
    windowMs: 30 * 60 * 1000,
    max: 3,
    message: { message: "Too Many requests! Try after 30 minutes " }
});

export default { loginLimiter, registerLimiter, otpLimiter, forgotLimiter }

