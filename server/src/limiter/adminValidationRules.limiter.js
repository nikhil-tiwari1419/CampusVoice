import { body, validationResult } from 'express-validator';

function validateResult(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }
    next();
}

// Reusable field validators - used by register AND admin creation

const usernameValidator = body("username")
    .trim()
    .isString().withMessage("Username must be a string")
    .isLength({ min: 5, max: 20 }).withMessage("Username must be between 5 and 20 characters")
    .matches(/^[a-zA-Z0-9_]+$/).withMessage("Username can only contain letters, numbers and underscores");

const emailValidator = body("email")
    .trim()
    .isEmail().withMessage("Invalid email address")
    .normalizeEmail();

const passwordValidator = body("password")
    .isLength({ min: 8, max: 20 }).withMessage("Password must be between 8 and 20 characters")
    .matches(/[A-Z]/).withMessage("Password must contain at least 1 uppercase letter")
    .matches(/[a-z]/).withMessage("Password must contain at least 1 lowercase letter")
    .matches(/[0-9]/).withMessage("Password must contain at least 1 number")
    .matches(/[@$!%*&]/).withMessage("Password must contain at least 1 special character (@$!%*&)");

const registerUserValidationRules = [
    usernameValidator,
    emailValidator,
    passwordValidator,
    validateResult
];

// Reuse the exact same rules for admin creation
const createAdminValidationRules = [
    usernameValidator,
    emailValidator,
    passwordValidator,
    validateResult
];

export { registerUserValidationRules, createAdminValidationRules, validateResult };
