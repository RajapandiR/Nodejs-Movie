import User from '../models/user_model';
//import AuthSchemas  from '../schemas/auth_schema';
import Jwt  from '../utils/jwt';
//import JsonSchemaValidator from '../utils/jsonSchemaValidator';
//import CreateError from 'http-errors'
import BcryptHelper from '../utils/bcrypt';

class AuthController{
    static async login(req, res){
        const { body } = req;
       
        try{
           
            var userData;
            if(body.email)
                userData = await User.findOne({email: body.email })

            if(!userData){
                throw {status: 400, user:"Not User"}
                // const response = {
                //     "statusCode" :400,
                //     "message": "Not User",
                    
                // }
                // res.status(400).json(response)
            }
            const checkPassword = await BcryptHelper.compare(body.password, userData.password)
            if(!checkPassword){
                throw {status: 400, password:"Password Wrong"}
                // const response = {
                //     "statusCode" :400,
                //     "message": "Password Wrong",
                    
                // }
                // res.status(400).json(response)
            }
            const payload = {
                userId: userData._id,
                // email: userData.email
            }
            
            // const token = await Jwt.issueToken(payload);
            const token = await Jwt.issueToken(payload);
            const userDataJson = userData.toJSON()
            userDataJson.token = token;
            const response = {
                "statusCode" :200,
                "message": "Login Successfull",
                "data": userDataJson 
            }
            res.cookie("access_token", token, {
              httpOnly: true}).status(200).json(response);
            
        }catch(err){
            console.log("Error", err);
            res.status(400).json({err});
        }
    }
    static async logout(req, res){
        return res.clearCookie("access_token")
        .status(200)
        .json({ message: "logged out Successfully " });
    }
}

export default AuthController;