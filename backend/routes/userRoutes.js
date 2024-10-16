import express from 'express'
import {
  loginController,
  signupController,
} from '../controller/userController.js'

const router = express.Router()

// Define routes for authentication
router.post('/login', loginController)

router.post('/signup', signupController)

export default router
