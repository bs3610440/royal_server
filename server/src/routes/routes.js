import express, { Router } from 'express'
import multer from 'multer'

const routes = express.Router()
const upload = multer({ storage: multer.diskStorage({}) });

// User API's
import { create_user, user_log_in, user_otp_verification, resenOtp, updated_profile,
    delete_profile,change_profile_img} from '../controller/Controller.js'
import {user_authentication,user_authorization} from '../middleware/user_auth.js'
routes.post('/create_user', upload.single('profileImg'), create_user)
routes.post('/user_otp_verification/:id', user_otp_verification)
routes.post('/user_log_in', user_log_in)
routes.get('/resenOtp', resenOtp)
routes.put('/updated_profile/:id', user_authorization, updated_profile)
routes.delete('/delete_profile/:id',user_authorization, delete_profile)
routes.put('/change_profile_img/:id',user_authorization,upload.single('profileImg'), change_profile_img)


// product model
import{create_product} from '../controller/product_controller.js'

routes.post('/create_product',upload.fields([
    { name: 'poster', maxCount: 1 },
    { name: 'images', maxCount: 10 },]) ,create_product) 

// Admin API's
import { admin_log_in, get_all_user } from '../controller/admin_controller.js'
import { authentication, authorization } from '../middleware/admin_auth.js'

routes.post('/admin_log_in', admin_log_in)
routes.get('/get_all_user', authentication, get_all_user)

export default routes



