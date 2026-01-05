import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes/routes.js';

const  app = express()

const PORT = 8080
const MongoDBUrl = "mongodb+srv://bs3610440_db_user:eoccCnbn4y4G5iMd@cluster0.dzmqjdg.mongodb.net/databaseroyal"


dotenv.config()
app.use(cors())
app.use(express.json())

mongoose.connect(MongoDBUrl)
.then(()=>console.log("MongoDB connected"))
.catch((err)=>console.log("MongoDB Error=> ",err.message))

app.use('/',routes)

app.listen(PORT,()=>console.log(`server is running port => ${PORT}`))









