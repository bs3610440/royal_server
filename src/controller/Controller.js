import { user_model } from '../model/model.js'
import {errorhandling} from '../middleware/all_error.js'
export const create_user = async (req, res) => {
    try {
        const data = req.body
        
        const DB = await user_model.create(data)
        res.status(201).send({ status: true, msg: "user created succesfully", DB })
    }
    catch (err) { errorhandling(err,res)}


}