import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import { validName, validEmail, validPassword } from '../validation/allvalidation.js'


const userSchema = new mongoose.Schema({
    profileImg: { type: Object },
    name: {
        type: String, required: [true, 'Name is Required...'],
        validate: [validName, "Invalid Name..."], trim: true
    },
    email: {
        type: String, required: [true, 'Email is Required...'],
        validate: [validEmail, "Invalid Email..."], trim: true, unique: true
    },
    gender: {
        type: String, enum: ['male', 'female', 'other'], trim: true, required: true
    },
    role: {
        type: String, enum: ['user', 'admin'], trim: true, required: true
    },
    password: {
        type: String, required: [true, 'Password is Required...'],
        validate: [validPassword, "Invalid Password..."], trim: true
    },
    verification: {
        userOtp: { type: Number, required: true, default: 0 },
        optExipre: { type: Number, required: true, default: 0 },
        isDelete: { type: Boolean, required: true, default: false },
        isVerified: { type: Boolean, required: true, default: false },
    },
},
    { timestamps: true }
)

userSchema.pre('save', async function () { this.password = await bcrypt.hash(this.password, 10); });


export const user_model = mongoose.model('user', userSchema)

