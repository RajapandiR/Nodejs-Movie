import  crypto  from "crypto";
import nodemailer from 'nodemailer';

import User from '../models/user_model';
// import Email from '../controllers/sendEmail'
import config from "../../config/config";
function sendEmail1(req, token, user, subject= ""){
    
    
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.email,
            pass: process.env.pass
        },
      newline: 'windows',
      tls : true,
    
    });
    const mailOptions = {
    // to: user.email,
    to : 'rajapandibsc12@gmail.com',
    from : 'rajapandibsc12@gmail.com',
    subject: 'Password Reset',
    text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/api/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
    };
    console.log('http://' + req.headers.host + '/api/reset/' + token );
    transporter.sendMail(mailOptions, (err, info) => {
        if(err)
            console.log("err", err);
    })

}
class ForgotController{
    
    static async postForgot(req, res){
        const { body } = req;
        let token;
        crypto.randomBytes(20, function(err, buf) {
            token = buf.toString('hex');
          })
        
        User.findOne({email: body.email}, async (err, user) => {
            if(!user){
                return res.status(400).send({"msg": "Not User"})
            }
            user.resetPasswordToken = token;
            user.resetPasswordExpires = Date.now() + 3600000;
            user.save()
            await sendEmail1(req, token, user)
            res.status(200).send({"msg": "Please check your mail"})
        })
    
        
    }

    static async postReset(req, res){
        // const { body } = req;
        const { params } = req;
        User.findOne({resetPasswordToken: params.token, resetPasswordExpires: { $gt: Date.now() }}, (err, user) => {
            if(!user){
                return res.status(400).send({"msg": "Invalid token"})
            }
            user.password = req.body.password;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            user.save()
            // sendEmail1(req, token, user)
            res.status(200).send({"msg": "Password Changed"})
        })
    }

}

export default ForgotController;