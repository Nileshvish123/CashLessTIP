const UserModels = require('../models/user.model');
var bcrypt = require('bcryptjs')
const { base64encode, base64decode } = require('nodejs-base64');
var nodemailer = require('nodemailer')
var sendNotification = require('../core/sendmedia');
exports.addEditEmploye = async (req, res, next) => {
    try {
        if (req.body.updateuser_id) {
            var user = {}
            user.user_id = parseInt(req.body.updateuser_id)
        } else {
            var user = new UserModels()
            /*Auto Increament of User Model */
            let total = await UserModels.find().sort({ user_id: -1 }).limit(1);
            console.log('total', total)
            user.user_id = total.length === 0 ? 1 : Number(total[0].user_id) + 1;
            console.log('user_id', user.user_id)
        }


        // user = await autoincremental(user, user, next);
        user.first_name = req.body.first_name
        user.last_name = req.body.last_name
        user.email = req.body.email
        user.phone = req.body.phone
        user.gender = req.body.gender
        user.date_of_birth = req.body.date_of_birth
        user.user_role_id = 10
        user.city_id = req.body.city_id
        user.jar_id=req.body.jar_id
        /*password*/
        var password = req.body.password
        encryptedPassword = await bcrypt.hash(password, 10);
        user.password = encryptedPassword
        // var existUser = await UserModels.find({ $or: [{ email: req.body.email }, { phone: req.body.phone }] })
       
      
       
            if (req.body.updateuser_id) {
                UserModels.updateOne({ user_id: parseInt(req.body.updateuser_id) }, user).then(() => {
                    return res.status(200).json({
                        success: true,
                        message: 'Data updated successfully',
                        response: user
                    });
                }).catch(err => {
                    return res.status(400).json({
                        success: false,
                        msg: 'error',
                        errors: { msg: err }
                    })
                })
            }else{
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
exports.blockEmploye = async (req, res) => {
    try {
        const user_id = req.body.blockuser_id;

        if(!user_id || user_id=='' || user_id==null){
            return res.status(200).send({
                success: false,
                msg: "blockuser id required"
            }); 
        }

        if (user_id) {
            await UserModels.updateOne({ user_id: user_id }, { is_active: false })
            return res.status(200).send({
                success: true,
                msg: "Employe Blocked"
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