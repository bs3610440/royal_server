import { user_model } from '../model/model.js'
import { errorhandling } from '../middleware/all_error.js'
import { sendUserOtpMail } from '../mail/mail.js'
import { uploadProfileImg } from '../image/Image.js'
export const create_user = async (req, res) => {
    try {
        const data = req.body
        const img = req.file;
        const userOtp = Math.floor(1000 + Math.random() * 9000)
        const optExipre = Date.now() + 5 * 60 * 1000



        const checkUser = await user_model.findOne({ email: data.email })

        if (checkUser) {
            const { isDelete, isVerified } = checkUser.verification
            if (isDelete) return res.status(400).send({ status: false, msg: "user already deleted" })
            if (isVerified) return res.status(400).send({ status: false, msg: "user already verified pls LogIn" })

            await user_model.findOneAndUpdate({ email: data.email },
                { $set: { verification: { userOtp: userOtp, optExipre: optExipre } } }, { new: true })
            const userDb = { _id: checkUser._id, name: checkUser.name, email: checkUser.email, profileImg: checkUser.profileImg }
            sendUserOtpMail(checkUser.email, checkUser.name, userOtp)
            return res.status(200).send({ status: true, msg: "succesfully Send new Otp", userDb })
        }
        const verification = { userOtp: userOtp, optExipre: optExipre }

        data.verification = verification


        if (img) {
            data.profileImg = await uploadProfileImg(img.path)
        }

        const DB = await user_model.create(data)
        const userDb = { _id: DB._id, name: DB.name, email: DB.email, profileImg: DB.profileImg }
        sendUserOtpMail(DB.email, DB.name, userOtp)
        res.status(201).send({ status: true, msg: "user created succesfully", userDb })
    }
    catch (err) { errorhandling(err, res) }
}


export const user_otp_verification = async (req, res) => {
    try {
        const id = req.params.id
        const otp = req.body.otp
        if (!id) return res.status(400).send({ status: false, msg: "id is required" })
        if (!otp) return res.status(400).send({ status: false, msg: "otp is required" })

        const user = await user_model.findById(id)

        if (!user) return res.status(404).send({ status: false, msg: "user not found" })
        if (user) {
            const { isDelete, isVerified, optExipre, userOtp } = user.verification

            if (isDelete) return res.status(400).send({ status: false, msg: "Account Deleted!" })
            if (isVerified) return res.status(400).send({ status: false, msg: "Account Already Verify Pls LogIn!" })

            if (Date.now() >= optExipre) return res.status(400).send({ status: false, msg: "Otp Expire" })
            if (parseInt(otp) !== parseInt(userOtp)) return res.status(400).send({ status: false, msg: "Wrong Otp" })

            await user_model.findOneAndUpdate(
                { email: user.email },
                { $set: { 'verification.optExipre': null, 'verification.userOtp': null, 'verification.isVerified': true, } }
            )
            res.status(200).send({ status: true, msg: 'Verify Otp' })
        }

    }
    catch (e) { errorhandling(e, res) }
}


export const user_log_in = async (req, res) => {
    try {

    }
    catch (e) { errorhandling(e, res) }
}

