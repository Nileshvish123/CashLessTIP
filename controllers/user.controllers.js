const UserModels = require('../models/user.model');
const UserRoleModels = require('../models/userRoles.model');
const countryModels = require('../models/country.model');
const KycModels = require('../models/kyc.model')
const jarModels = require('../models/jar.model');
const cityModels = require('../models/cities.model');
const stateModels = require('../models/states.model');
const jwt = require("jsonwebtoken");
var bcrypt = require('bcryptjs')
const { base64encode, base64decode } = require('nodejs-base64');
var nodemailer = require('nodemailer')
var config = require('../core/config/db.config')
var sendNotification = require('../core/sendmedia');
const e = require('cors');
const { stringify } = require('querystring');
// const userModel = require('../models/user.model');
const autoincremental = require('../core/autoIncreament');

exports.userRegister = async (req, res, next) => {
    try {
        var user = new UserModels()
        let total = await UserModels.find().sort({ user_id: -1 }).limit(1);
        console.log('total', total)
        user.user_id = total.length === 0 ? 1 : Number(total[0].user_id) + 1;
        console.log('user_id', user.user_id)
        // user = await autoincremental(user, user, next);
        user.first_name = req.body.first_name
        user.last_name = req.body.last_name
        user.email = req.body.email
        user.phone = req.body.phone
        user.gender = req.body.gender
        user.jar_id = 0
        user.date_of_birth = req.body.date_of_birth
        user.user_role_id = req.body.user_role_id
        user.city_id = req.body.city_id
        /*password*/
        var password = req.body.password
        encryptedPassword = await bcrypt.hash(password, 10);
        user.password = encryptedPassword
        // var existUser = await UserModels.find({ $or: [{ email: req.body.email }, { phone: req.body.phone }] })
        var existUser = await UserModels.find({ email: req.body.email })
        var existRole = await UserRoleModels.findOne({ role_id: `${req.body.user_role_id}` })
        // sendNotification.mailtransporter(mailObject)

        console.log(existUser, existRole, req.body.user_role_id, { role_id: req.body.user_role_id })
        if (existUser && existUser.length > 0) {
            return res.status(200).json({
                success: false,
                msg: 'User already registered',
                response: {}
            })
        } else if (existRole && existRole.length == 0) {
            return res.status(200).json({
                success: false,
                msg: 'User Role Not Exist!',
                response: {}
            })
        }
        else {
            user.save().then(() => {


                var emailToken = JSON.stringify(req.body.email)
                Token = base64encode(emailToken)

                console.log(Token)
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: `nilesh.espsofttech@gmail.com`,
                        pass: `Nilesh123#`
                    }
                });

                // var transporter = nodemailer.createTransport({
                //     host: 'espsofttechnologies.com',
                //     port: 465,
                //     secure: true,
                //     auth: {
                //         user: 'developer@espsofttechnologies.com',
                //         pass: 'Espsoft123#'
                //     },
                //     tls: {
                //         rejectUnauthorized: false
                //     }
                // });

                var email = req.body.email;
                var mailOptions = {
                    name: `${req.body.first_name} ${req.body.last_name}`,
                    from: 'developer@espsofttechnologies.com',
                    to: `${email}`,
                    subject: 'Account Activation Link',
                    text: `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:25px;text-align:left;color:#000">
                                          <h2>Please Click on given link to activate your account</h2>
                                          <a href='espsofttech.tech/free-crypto-swapping/verifyAccount/${Token}'>Click HERE </a> 
                                     </div>`
                };

                sendNotification.mailtransporter(mailOptions, function (error, info) {
                    if (error) {
                        //   console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });

                return res.status(200).json({
                    success: true,
                    msg: 'User registered successfully. Please activate your account through your registered email',
                    // response: data
                })

            }).catch((err) => {

                console.log(err);
            })
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: 'error',
            errors: { msg: error }
        })
    }

}

exports.jarownerRegister = async (req, res, next) => {
    try {
        var user = new UserModels()
        var jar = new jarModels()
        /*Auto increament for User Model */
        let total = await UserModels.find().sort({ user_id: -1 }).limit(1);
        console.log('total', total)
        user.user_id = total.length === 0 ? 1 : Number(total[0].user_id) + 1;
        console.log('user_id', user.user_id)

        /*Auto Increament for jar model */

        let jartotal = await jarModels.find().sort({ id: -1 }).limit(1);
        console.log('jartotal', jartotal)
        jar.id = jartotal.length === 0 ? 1 : Number(jartotal[0].id) + 1;
        jar.category_id = Number(req.body.category_id)
        jar.jar_type = req.body.jar_type
        jar.owner_id = user.user_id
        user.jar_id = 0
        user.first_name = req.body.first_name
        user.last_name = req.body.last_name
        user.email = req.body.email
        user.phone = req.body.phone
        user.gender = req.body.gender
        user.date_of_birth = req.body.date_of_birth
        user.user_role_id = 9
        user.city_id = req.body.city_id
        /*password*/
        var password = req.body.password
        encryptedPassword = await bcrypt.hash(password, 10);
        user.password = encryptedPassword
        // var existUser = await UserModels.find({ $or: [{ email: req.body.email }, { phone: req.body.phone }] })
        var existUser = await UserModels.find({ email: req.body.email })
        var existRole = await UserRoleModels.findOne({ role_id: `${req.body.user_role_id}` })
        // sendNotification.mailtransporter(mailObject)

        console.log(existUser, existRole, req.body.user_role_id, { role_id: req.body.user_role_id })
        if (existUser && existUser.length > 0) {
            return res.status(200).json({
                success: false,
                msg: 'User already registered',
                response: {}
            })
        } else if (existRole && existRole.length == 0) {
            return res.status(200).json({
                success: false,
                msg: 'User Role Not Exist!',
                response: {}
            })
        }
        else {
            user.save().then(() => {


                var emailToken = JSON.stringify(req.body.email)
                Token = base64encode(emailToken)

                console.log(Token)
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: `nilesh.espsofttech@gmail.com`,
                        pass: `Nilesh123#`
                    }
                });

                // var transporter = nodemailer.createTransport({
                //     host: 'espsofttechnologies.com',
                //     port: 465,
                //     secure: true,
                //     auth: {
                //         user: 'developer@espsofttechnologies.com',
                //         pass: 'Espsoft123#'
                //     },
                //     tls: {
                //         rejectUnauthorized: false
                //     }
                // });

                var email = req.body.email;
                var mailOptions = {
                    name: `${req.body.first_name} ${req.body.last_name}`,
                    from: 'developer@espsofttechnologies.com',
                    to: `${email}`,
                    subject: 'Account Activation Link',
                    text: `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:25px;text-align:left;color:#000">
                                          <h2>Please Click on given link to activate your account</h2>
                                          <a href='espsofttech.tech/free-crypto-swapping/verifyAccount/${Token}'>Click HERE </a> 
                                     </div>`
                };

                sendNotification.mailtransporter(mailOptions, function (error, info) {
                    if (error) {
                        //   console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
                jar.save().then((data) => {
                    return res.status(200).json({
                        success: true,
                        msg: 'User registered successfully. Please activate your account through your registered email',
                        // response: data
                    })
                }).catch((err) => {
                    return res.status(400).json({
                        success: false,
                        msg: 'Something went wrong!',
                        errors: { msg: err }
                        // response: data
                    })
                })
            }).catch((err) => {
                return res.status(400).json({
                    success: false,
                    msg: 'Something went wrong!',
                    errors: { msg: err }
                    // response: data
                })
            })
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: 'error',
            errors: { msg: error }
        })
    }

}


exports.VerifyToken = async (req, res) => {
    try {
        const { token } = req.body;

        if (token) {
            let email = base64decode(token);
            var email1 = JSON.parse(email);
            console.log(email1)
            await UserModels.updateOne({ email: email1 }, { is_verified: true })
            return res.status(200).send({
                success: true,
                msg: "Account  verified successfully"
            });

        } else {
            return res.status(400).send({
                success: false,
                msg: "something went wrong",
                errors: { msg: "something went wrong" }
            });
        }
    } catch (err) {
        res.status(400).json({
            success: false,
            msg: 'err',
            errors: err
        });
    }

}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            res.status(200).send("All input is required");
        }

        const verifyUser = await UserModels.findOne({ email: email, is_verified: false });
        if (verifyUser) {
            res.status(200).json({
                success: false,
                msg: 'Please verify your account',
                response: {}
            });
        }
        const user = await UserModels.findOne({ email: email });

        if (user && user.is_active == false) {
            res.status(200).json({
                success: false,
                msg: 'Your account deactivated please contact to admin',
                response: {}
            });
        }

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { user_id: user.user_id, user_role_id: user.user_role_id },
                "My_Token_Key"
            );
            user.token = token
            // await UserModels.updateOne({ user_id: user.user_id }, { token: token })
            res.status(200).json({
                success: true,
                msg: 'Login successfully',
                response: user
            });
        } else {
            res.status(200).json({
                success: false,
                msg: 'Invalid credential!',
                response: {}
            });
        }

    } catch (err) {
        res.status(400).json({
            success: false,
            msg: 'err',
            errors: { msg: "something went wrong" }
        });
    }

}

exports.googleLogin = async (req, res) => {
    const email = req.body.email
    const user = await UserModels.findOne({ email: email, is_active: true });
    if (user) {
        const token = jwt.sign(
            { user_id: user.user_id, user_role: user.user_role },
            "My_Token_Key"
        );
        user.token = token
        await UserModels.updateOne({ user_id: user.user_id }, { token: token })
        res.status(200).json({
            success: true,
            msg: 'User login Successfully',
            response: user
        });
    } else {
        const user = new UserModels()
        user.first_name = req.body.first_name
        user.last_name = req.body.last_name
        user.email = req.body.email
        user.user_role = 'user'
        user.phone = ''
        user.password = ''
        user.is_verified = true
        await user.save()
        const exist = await UserModels.findOne({ email: email });
        if (exist) {
            const token = jwt.sign(
                { user_id: exist.user_id, user_role: exist.user_role },
                "My_Token_Key"
            );
            user.token = token
            await UserModels.updateOne({ user_id: exist.user_id }, { token: token })
            res.status(200).json({
                success: true,
                msg: 'User login successfully done',
                response: exist
            });
        }

    }

}

exports.sendresetPasswordLink = async (req, res) => {
    try {
        var email = req.body.email
        const user = await UserModels.findOne({ email: email })
        if (user) {
            var emailToken = JSON.stringify(req.body.email)
            var Token = base64encode(emailToken)
            //   console.log(user)
            var mailObject = {
                name: `${user.first_name} ${user.last_name}`,
                to: email,
                from: 'nilesh.espsofttech@gmail.com',
                subject: 'Password Reset',
                text: `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:25px;text-align:left;color:#000">
            <h2>Please Click on given link to change your account password </h2>
            <a href='espsofttech.tech/free-crypto-swapping/enternew-password/${Token}'>Click HERE </a> 
              </div>`

            };
            sendNotification.mailtransporter(mailObject)
            return res.status(200).json({
                success: true,
                msg: 'if email exist Link send on mail address please open',
                response: {}
            })
        } else {
            res.status(200).json({
                success: false,
                msg: 'User Not Exist!',
                response: {}
            })
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            msg: 'error',
            errors: { msg: "something went wrong" }
        })
    }


}

exports.forgetPassword = async (req, res) => {
    try {
        const { user_id, password } = req.body;
        var email = base64decode(user_id);
        email = JSON.parse(email);

        var encryptedPassword = await bcrypt.hash(password, 10);
        await UserModels.updateOne({ email: email }, { password: encryptedPassword })
        const user = await UserModels.findOne({ email: email })

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { user_id: user.user_id, user_role: user.user_role },
                "My_Token_Key"
            );
            user.token = token
            await UserModels.updateOne({ user_id: user.user_id }, { token: token })
            res.status(200).json({
                success: true,
                msg: 'Password reset successfully',
                response: user
            });
        }

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: 'error',
            errors: { msg: error }
        });
    }


}

exports.getCountrys = async (req, res) => {
    try {

        const country = await countryModels.find({}).exec()
        console.log('country', country)
        if (country.length > 0) {

            return res.status(200).json({
                success: true,
                msg: 'get country list',
                response: country
            })
        } else {
            res.status(200).json({
                success: false,
                msg: 'Countrys Not Exist!',
                response: {}
            })
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: 'error',
            errors: { msg: error }
        })
    }


}

exports.getStates = async (req, res) => {
    try {
        const country_id = req.query.country_id
        if (country_id == null || !country_id || country_id == "") {
            return res.status(200).json({
                success: false,
                msg: 'country_id required',
                response: {}
            })
        }
        const states = await stateModels.find({ country_id: country_id }).exec()
        console.log('states', states)
        if (states.length > 0) {

            return res.status(200).json({
                success: true,
                msg: 'get states list',
                response: states
            })
        } else {
            res.status(200).json({
                success: false,
                msg: 'State Not Exist!',
                response: {}
            })
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            msg: 'error',
            errors: { msg: error }
        })
    }


}

exports.getCities = async (req, res) => {
    try {
        const state_id = req.query.state_id
        if (state_id == null || !state_id || state_id == "") {
            return res.status(200).json({
                success: false,
                msg: 'state_id required',
                response: {}
            })
        }
        const citys = await cityModels.find({ state_id: state_id }).exec()
        console.log('citys', citys)
        if (citys.length > 0) {

            return res.status(200).json({
                success: true,
                msg: 'get states list',
                response: citys
            })
        } else {
            res.status(200).json({
                success: false,
                msg: 'State Not Exist!',
                response: {}
            })
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            msg: 'error',
            errors: { msg: error }
        })
    }


}

exports.insertKyc = async (req, res) => {
    var kyc = new KycModels()

    /*Auto Increament */
    let total = await KycModels.find().sort({ id: -1 }).limit(1);
    kyc.id = total.length === 0 ? 1 : Number(total[0].id) + 1;

    kyc.user_id = req.body.user_id
    kyc.identityNumber = req.body.identityNumber
    kyc.identityPhoto = (!req.files['identityPhoto']) ? null : req.files['identityPhoto'][0].filename;

    if (kyc.identityPhoto == null) {
        return res.status(400).json({
            success: false,
            msg: 'error',
            errors: { msg: "identityPhoto required" }
        })
    }
    kyc.address = req.body.address

    let exist = await KycModels.find({ user_id: req.body.user_id })
    console.log(exist)
    if (exist.length > 0) {
        KycModels.updateOne({ user_id: parseInt(req.body.user_id) }, kyc).then(() => {
            return res.status(200).json({
                success: true,
                message: 'Kyc Re-uploaded ',
                response: kyc
            });
        }).catch(err => {
            return res.status(400).json({
                success: false,
                msg: 'error',
                errors: { msg: err }
            })
        })
    } else {
        kyc.save().then((response) => {
            return res.status(200).json({
                success: true,
                msg: 'kyc document uploaded',
                response: response
            })
        }).catch((errr) => {
            return res.status(200).json({
                success: false,
                msg: 'error',
                errors: { msg: errr }
            })
        })
    }

}




