import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import routers from './src/routers'
require('dotenv').config();

import cors from 'cors';

const port = process.env.PORT || 8080;
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
app.use(cookieParser())

// mongodb://localhost:27017/movie", 
// process.env.MONGO_URI
mongoose.connect(process.env.MONGO_URI , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  
})
app.get('/', (req, res) => {
    res.send("Hello!")
})
app.use('/api', routers);

console.log("port", port);
app.listen(port, () => console.log(`Server start on ${port}`));
