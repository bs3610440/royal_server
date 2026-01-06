import bcrypt from 'bcrypt'
import { user_model } from '../model/model.js'
import {validName,validEmail,validPassword} from '../validation/allvalidation.js'
export const create_user = async (req, res) => {
    try {
        const data = req.body
        
        const DB = await user_model.create(data)
        res.status(201).send({ status: true, msg: "user created succesfully", DB })
    }
    catch (err) { res.status(500).send({ status: false, msg: err.message }) }


}