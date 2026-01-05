import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:{type:String, required:true,trim:true},
    name:{type:String, required:true,trim:true, unique:true},
    name:{type:String, required:true,trim:true},
},
{timestamps:true}
)
export const user_model= mongoose.model('user',userSchema)