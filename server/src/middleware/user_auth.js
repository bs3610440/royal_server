import { errorhandling } from './all_error.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
  
export const user_authentication = (req, res, next) => {
    try {
        const token =  req.headers['x-api-key']

        if(!token) return res.status(400).send({ status: false, msg: "token is required!" })
        const decoded = jwt.verify(token, process.env.UserToken)
        if(!decoded) return res.status(400).send({ status: false, msg: "invalid token" })
        next()
    }
    catch (e) { errorhandling(e, res) }
}
export const user_authorization = (req, res, next) => {
    try {

    }
    catch (e) { errorhandling(e, res) }
}