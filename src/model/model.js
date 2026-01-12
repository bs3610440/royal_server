import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import { validName, validEmail, validPassword } from '../validation/allvalidation.js'

const deviceSchema = new mongoose.Schema({
    deviceId: { type: String, required: true },
    deviceType: { type: String, enum: ['mobile', 'tablet', 'browser'], required: true },
    browser: String,
    os: String,
    ipAddress: String,
    location: String,
    lastLogin: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true }
}, { timestamps: true })     

const userSchema = new mongoose.Schema({
    name: {
        type: String, required: [true, 'Name is Required...'],
        validate: [validName, "Invalid Name..."], trim: true
    },
    email: {
        type: String, required: [true, 'Email is Required...'],
        validate: [validEmail, "Invalid Email..."], trim: true, unique: true
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
    NoOfLoginDevice: deviceSchema
},
    { timestamps: true }
)

userSchema.pre('save', async function () { this.password = await bcrypt.hash(this.password, 10); });


export const user_model = mongoose.model('user', userSchema)

