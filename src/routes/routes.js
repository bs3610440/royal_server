import express from 'express'
import { create_user, user_log_in, user_otp_verification } from '../controller/Controller.js'
import multer from 'multer'

const routes = express.Router()
const upload = multer({ storage: multer.diskStorage({}) });


routes.post('/create_user', upload.single('profileImg'), create_user)
routes.post('/user_otp_verification/:id', user_otp_verification)
routes.post('/user_log_in', user_log_in)

export default routes