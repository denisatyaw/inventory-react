const { body, validationResult } = require('express-validator');

// Middleware validasi untuk register user
const validateRegisterUser = [
    body('username')
        .notEmpty().withMessage('Username is required')
        .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can only contain letters, numbers, and underscores'),
    
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .matches(/\d/).withMessage('Password must contain at least one number'),

    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format'),

    body('address')
        .optional()
        .isString().withMessage('Address must be a string'),

    body('phone')
        .optional()
        .matches(/^\d{10,15}$/).withMessage('Phone number must contain only numbers and be between 10 to 15 digits'),

    body('roles')
        .optional()
        .isArray().withMessage('Roles must be an array'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                success: false, 
                message: 'Validation failed', 
                errors: errors.array() 
            });
        }
        next();
    }
];

module.exports = {
    validateRegisterUser
};
