import jwt from 'jsonwebtoken';
// import config from '../../config/config';
require('dotenv').config();

class Twt{
    static issueToken(payload) {
        console.log("config.TOKEN_SECRET", process.env.TOKEN_SECRET);
        return jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn: '1d'});
      }
    static verifyToken(payload){
        return jwt.verify(payload, process.env.TOKEN_SECRET)
    }
} 

export default Twt;