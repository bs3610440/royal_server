import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes/routes.js';
import dotenv from 'dotenv';

const  app = express()

const PORT = 8080


dotenv.config()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MongoDB)
.then(()=>console.log("MongoDB connected"))
.catch((err)=>console.log("MongoDB Error=> ",err.message))

app.use('/',routes)

app.listen(PORT,()=>console.log(`server is running port => ${PORT}`))









