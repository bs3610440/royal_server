import { user_model } from '../model/model.js'
import { errorhandling } from '../middleware/all_error.js'
export const create_user = async (req, res) => {
    try {
        const data = req.body

        const userOtp = Math.floor(1000 + Math.random() * 9000)
        const optExipre = Date.now() + 5 * 60 * 1000

        const checkUser = await user_model.findOne({ email: data.email })
        if (checkUser) {
            const { isDelete, isVerified } = checkUser.verification
            if (isDelete) return res.status(400).send({ status: false, msg: "user already deleted" })
            if (isVerified) return res.status(400).send({ status: false, msg: "user already verified" })

            await user_model.findOneAndUpdate({ email: data.email },
                { verification: { userOtp: userOtp, optExipre: optExipre } }, { new: true })
            return res.status(200).send({ status: true, msg: "succesfully Send new Otp" })
        }
        const verification = { userOtp: userOtp, optExipre: optExipre }

        data.verification = verification
        const DB = await user_model.create(data)
        const userDb = { _id: DB._id, name: DB.name, email: DB.email, }
        res.status(201).send({ status: true, msg: "user created succesfully", userDb })
    }
    catch (err) { errorhandling(err, res) }
}