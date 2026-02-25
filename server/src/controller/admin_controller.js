import { user_model } from '../model/model.js'
import { errorhandling } from '../middleware/all_error.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export const admin_log_in = async (req, res) => {
    try {

        const data = req.body

        const { email, password } = data

        if (!email) return res.status(400).send({ status: false, msg: "email is required!" })
        if (!password) return res.status(400).send({ status: false, msg: "PASSWORD IS REQUIRED!" })

        const DB = await user_model.findOne({ email: email, role: "admin" })
        if (!DB) return res.status(400).send({ status: false, msg: "User not found!" })

        if (DB) {
            const { isDelete, isVerified } = DB.verification
            if (isDelete) return res.status(400).send({ status: false, msg: "Account Deleted!" })
            if (!isVerified) return res.status(400).send({ status: false, id: DB._id, email: DB.email, msg: "Pls verify otp" })
        }

        const comparePasswod = await bcrypt.compare(password, DB.password)

        if (!comparePasswod) return res.status(400).send({ status: false, msg: "wrong password" })

        const token = jwt.sign({ userId: DB._id }, process.env.AdminToken, { expiresIn: '1d' })
        res.status(200).send({ status: true, msg: "Login Successfully", token, id: DB._id })

    }
    catch (e) { errorhandling(e, res) }
}

export const get_all_user = async (req, res) => {
    try {

        const getData = await user_model.find({ role: 'user' }).select({name:1, email:1, gender:1, profileImg:1})

        res.status(200).send({ status: true, data: getData })

    }
    catch (err) {
        errorhandling(err)
    }
}