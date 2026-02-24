import express from 'express'
import { authentication, authorization } from '../middleware/auth.js'
import multer from 'multer'

const routes = express.Router()
const upload = multer({ storage: multer.diskStorage({}) });

// User API's
import { create_user, user_log_in, user_otp_verification, resenOtp, updated_profile } from '../controller/Controller.js'
routes.post('/create_user', upload.single('profileImg'), create_user)
routes.post('/user_otp_verification/:id', user_otp_verification)
routes.post('/user_log_in', user_log_in)
routes.get('/resenOtp', resenOtp)
routes.put('/updated_profile/:id', authentication, authorization, updated_profile)


// Admin API's
import { admin_log_in, get_all_user } from '../controller/admin_controller.js'
routes.post('/admin_log_in', admin_log_in)
routes.get('/get_all_user', get_all_user)

export default routes

