import bcrypt from 'bcrypt'
import {user_model} from '../model/model.js'
export  const create_user = async (req,res)=>{
    try{
        const data = req.body
        const {name,email,password }= data

const nameRegex = /^[A-Za-z][A-Za-z' -]{1,49}$/
const emailRegex =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
 const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/

 if (!name) return res.status (400).send({status:false,msg:"name is required"})
if (!nameRegex.test(name))return res.status(400).send ({status:false,msg:"name is not valid"})

     if (!email) return res.status (400).send({status:false,msg:"email is required"})
if (!nameRegex.test(name))return res.status(400).send ({status:false,msg:"email is not valid"})

     if (!password) return res.status (400).send({status:false,msg:"password is required"})
if (!nameRegex.test(name))return res.status(400).send ({status:false,msg:"password is not valid"})


    const Bcryptpassword = await bcrypt.hash(password,10)
    data.password = Bcryptpassword

    const DB = await user_model.create(data)
    res.status(201).send ({status:true,msg:"user created succesfully",DB})
}
catch (err) {res.status (500).send ({status:false ,msg :err.message })} 


}