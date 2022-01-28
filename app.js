import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import routers from './src/routers'


// import cors from 'cors';

const port = 8080;
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
// app.use(cors())
app.use(cookieParser())


mongoose.connect("mongodb://localhost:27017/movie", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  
})
app.get('/', (req, res) => {
    res.send("Hello!")
})
app.use('/api', routers);


app.listen(port, () => console.log(`Server start on ${port}`));
