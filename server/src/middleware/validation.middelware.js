import { body, check, validationResult } from 'express-validator';
// import { registerUser } from '../controller/auth.controler.js'


async function validateResult(req, res, next) {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
    next();
}

const registerUserValidationRules = [
    body("username")
        .isString()
        .withMessage("Username must be a String")
        .isLength({ min: 5, max: 20 })
        .withMessage("Username must be between 5 and 20 characters"),


    body("email")
        .isEmail()
        .withMessage("Invalid email address"),


    body("password")
        .isLength({ min: 8, max: 20 })
        .withMessage("password must be at least 8 character long")
        .matches(/[A-Z]/)
        .withMessage("Password must contain at least 1 uppercase leatter")
        .matches(/[a-z]/)
        .withMessage("password must conatain 1 lowercase letter")
        .matches(/[0-9]/)
        .withMessage("password must conatain at least 1 number")
        .matches(/[@$!%*&]/)
        .withMessage("password must conatin at least 1 special character"),

    validateResult

]


export default { registerUserValidationRules };


