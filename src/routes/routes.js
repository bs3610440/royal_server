import express from 'express'
import {create_user} from '../controller/Controller.js'
import multer from 'multer'

const routes = express.Router()
const upload = multer({ storage: multer.diskStorage({}) });


routes.post ('/create_user',upload.single('profileImg'),create_user)

export default routes