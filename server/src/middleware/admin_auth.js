import { errorhandling } from './all_error.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
  
export const admin_authentication = (req, res, next) => {
    try {
        const token =  req.headers['x-api-key']

        if(!token) return res.status(400).send({ status: false, msg: "token is required!" })
        const decoded = jwt.verify(token, process.env.AdminToken)
        if(!decoded) return res.status(400).send({ status: false, msg: "invalid token" })
        next()
    }
    catch (e) { errorhandling(e, res) }
}
export const admin_authorization = (req, res, next) => {
    try {
        const token = req.headers['x-api-key']
        const id = req.params.Adminid;

        if (!id) return res.status(400).send({ status: false, msg: "id is required!" })
        if (!token) return res.status(400).send({ status: false, msg: "token is required!" })

        const decoded = jwt.verify(token, process.env.AdminToken)

        if (decoded.adminId !== id) return res.status(400).send({ status: false, msg: "invalid token" })

        next()
    }
    catch (e) { errorhandling(e, res) }
}