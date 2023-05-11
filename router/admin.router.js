const express = require('express')
const router = express.Router()
const  validator  = require('../core/MiddleWare/validator');
const adminController = require('../controllers/admin.controller')
const imageUpload = require('../public/fileupload')
const userController = require('../controllers/user.controllers')

/*send enquiry message */

router.post('/addEditEmploye',validator.employeValidation, adminController.addEditEmploye)
router.post('/blockEmploye', adminController.blockEmploye)

module.exports = router