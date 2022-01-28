import User from '../models/user_model';

class UserController {
    // static  async getUser(req, res, next) {
    //     try{
    //          User.find(function(err, result){
    //             if(err)
    //                 console.log("Error", err);
    //             if(result){
    //                 const response = {
    //                     "statusCode": 200,
    //                     "message": "Data",
    //                     "data": result
    //                 }
    //                 res.send(response)
    //             }
    //             else
    //                 res.json({message: err});
    //         })

    //     }catch(err){
    //         console.log("Error", err);
    //     }
    // }

    
    static async postUser(req, res,next) {
        
        const { body } = req;
        try{
    
            // const {errors, isValid} = validationRegister(req.body);
            // if(!isValid){
            //     return res.status(400).json(errors);
            // }

            let user = await User.findOne({email: body.email})
            console.log("body.email",body.email);
            console.log("User", user);
            if(!user){
                const data = await User.create(body)
                const response = {
                    statusCode: 200,
                    message: "Create Successfull",
                    data: data
                }
                res.status(200).json(response)
            }
            else{
                // const response = {
                //     "statusCode": 400,
                //     "message": "Email already Exist",
                    
                // }
                return res.status(400).json({email: "Email already Exist"});
                // res.status(400).json({emailErr:"Email already Exist"})
            }

        }catch(err){
            console.log("Error", err);
            res.json({err});
        }
    }

}

export default UserController;