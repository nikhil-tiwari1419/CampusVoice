import ratelimiter from 'express-rate-limit'


const loginLimiter = ratelimiter({ // 5 min
    windowMs: 5 * 60 * 1000,
    max: 5,
    message: { message: "To many login request attemps! Try after 5 minutes" }
});

const registerLimiter = ratelimiter({ //10 min
    windowMs: 10 * 60 * 1000,
    max: 18,
    message: { message: "Too many account created! Try after 10 min" }
});

const otpLimiter = ratelimiter({ // 5 min
    windowMs: 5 * 60 * 1000,
    max: 3,
    message: { message: "Too many OTP attempts! Try after 5 minutes" }
});

const forgotLimiter = ratelimiter({ // 30 min 
    windowMs: 5 * 60 * 1000,
    max: 3,
    message: { message: "Too Many requests! Try after 5 minutes " }
});

export default { loginLimiter, registerLimiter, otpLimiter, forgotLimiter }

