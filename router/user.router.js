const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controllers');
const  validator  = require('../core/MiddleWare/validator');
const imageUpload = require('../public/fileupload')

router.post('/userRegister',validator.signupValidation, userController.userRegister);

router.post('/jarownerRegister',validator.jarownerRegister, userController.jarownerRegister);

router.post('/VerifyToken', userController.VerifyToken);
router.post('/login', userController.login)
router.post('/googleLogin', userController.googleLogin)

router.post('/forgetPassword', validator.forgetPassword,userController.forgetPassword)
router.post('/sendresetPasswordLink',validator.resetPassword, userController.sendresetPasswordLink)

/*Country state cities */

router.get('/getCountrys', userController.getCountrys)
router.get('/getStates', userController.getStates)
router.get('/getCities', userController.getCities)

/*Kyc APis */

router.post('/insertKyc',imageUpload.fields([{name: 'identityPhoto', maxCount: 1}]),validator.kyc,userController.insertKyc)




/*help desk */
// router.post('/submitHelpForm', imageUpload.fields([{
//     name: 'file', maxCount: 1
// }]), userController.submitHelpForm)


module.exports = router