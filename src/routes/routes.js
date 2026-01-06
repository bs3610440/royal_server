import express from 'express'
import {create_user} from '../controller/Controller.js'

const routes = express.Router()
routes.post ('/create_user',create_user)

export default routes