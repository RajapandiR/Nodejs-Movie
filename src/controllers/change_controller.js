import jwt from '../utils/jwt';
import BcryptHelper from '../utils/bcrypt';

import User from '../models/user_model';

class ChangeController {

    static async postChange(req, res) {
        const { body } = req;
        try{
            const token = req.cookies.access_token;
            if (!token) {
                return res.status(404).json({"message": "You are not authenticated"});
            }

            const decoded = await jwt.verifyToken(token);
            User.findOne({_id: decoded.userId}, async (err, user) => {
                if(!user){
                    return res.status(400).send({"msg": "Not User"})
                }
                const checkPassword = await BcryptHelper.compare(body.oldpassword, user.password)
                if(!checkPassword){
                    return res.status(400).json("Old password incorrect")    
                }
                user.password = body.password;
                // user.resetPasswordExpires = Date.now() + 3600000;
                user.save()
                // sendEmail1(req, token, user)
                const response = {
                statusCode: 200,
                message: "Change Successfull",
                    
                }
                res.status(200).json(response)
                
            })
            // const data = await User.findOne({_id: decoded.userId})
            // const checkPassword = await BcryptHelper.compare(body.oldpassword, data.password)
            // if(!checkPassword){
            //     return res.status(400).send("Old password incorrect")    
            // }
            // const response = {
            //     statusCode: 200,
            //     message: "Change Successfull",
                
            // }
            // res.status(200).json(response)
        }catch(err){
            res.status(400).json({
                // message: "",
                error: err.message
            })
        }
    }
}

export default ChangeController;