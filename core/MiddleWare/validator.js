const { check,validationResult  } = require('express-validator');
let validator={}
validator.signupValidation = [
    check('email')
    .exists()
    .withMessage('email is required')
    .isEmail()
    .withMessage('email not valid'),
    check('first_name')
    .exists()
    .withMessage('first name is required'),
    check('last_name')
    .exists()
    .withMessage('last name is required'),
    check('password')
    .exists()
    .withMessage('password name is required'),
    check('phone')
    .exists()
    .withMessage('phone is required'),
    check('user_role_id')
    .exists()
    .withMessage('user_role_id is required'),
    check('city_id')
    .exists()
    .withMessage('city id is required'),
    check('gender')
    .exists()
    .withMessage('gender is required'),
    check('date_of_birth')
    .exists()
    .withMessage('date_of_birth is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array()[0] });
        next();
    },
]
validator.employeValidation = [
    check('email')
    .exists()
    .withMessage('email is required')
    .isEmail()
    .withMessage('email not valid'),
    check('first_name')
    .exists()
    .withMessage('first name is required'),
    check('last_name')
    .exists()
    .withMessage('last name is required'),
    check('password')
    .exists()
    .withMessage('password name is required'),
    check('phone')
    .exists()
    .withMessage('phone is required'),
    check('user_role_id')
    .exists()
    .withMessage('user_role_id is required'),
    check('jar_id')
    .exists()
    .withMessage('jar_id is required'),
    check('city_id')
    .exists()
    .withMessage('city id is required'),
    check('gender')
    .exists()
    .withMessage('gender is required'),
    check('date_of_birth')
    .exists()
    .withMessage('date_of_birth is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array()[0] });
        next();
    },
]

validator.jarownerRegister=[
    check('email')
    .exists()
    .withMessage('email is required')
    .isEmail()
    .withMessage('email not valid'),
    check('first_name')
    .exists()
    .withMessage('first name is required'),
    check('last_name')
    .exists()
    .withMessage('last name is required'),
    check('password')
    .exists()
    .withMessage('password name is required'),
    check('phone')
    .exists()
    .withMessage('phone is required'),
    check('city_id')
    .exists()
    .withMessage('city id is required'),
    check('gender')
    .exists()
    .withMessage('gender is required'),
    check('date_of_birth')
    .exists()
    .withMessage('date_of_birth is required'),
    check('category_id')
    .exists()
    .withMessage('category id is required'),
    check('jar_type')
    .exists()
    .withMessage('jar_type is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array()[0] });
        next();
    },
]

validator.resetPassword = [
    check('email')
    .exists()
    .withMessage('email is required')
    .isEmail()
    .withMessage('email not valid'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array()[0] });
        next();
    },
]
validator.forgetPassword = [
    check('email')
    .exists()
    .withMessage('email is required')
    .isEmail()
    .withMessage('email not valid'),
    check('password')
    .exists()
    .withMessage('password  is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array()[0] });
        next();
    },
]
validator.kyc = [
    check('user_id')
    .exists()
    .withMessage('user_id  is required'),
    check('identityNumber')
    .exists()
    .withMessage('identityNumber  is required'),
  
    check('address')
    .exists()
    .withMessage('address  is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array()[0] });
        next();
    },
]

module.exports = validator