import express from 'express';
import mongoDBConnect from './db.js';
import dotenv from 'dotenv';
import router1 from './routes/index.js';
import cors from 'cors';

// load env variables
dotenv.config();

const app = express();



// allow all the origins to access the api
app.use(cors());
// parse the request body -json
app.use(express.json());


const port = process.env.PORT || 3000;
mongoDBConnect();

app.use('/api/v1',router1);
app.listen(port,()=>{
 console.log('Server connected on: ',port);
})