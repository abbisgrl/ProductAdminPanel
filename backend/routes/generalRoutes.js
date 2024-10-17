import express from 'express'
import {
  getDashboardsDetails,
  getUserDetails,
} from '../controller/generalConroller.js'
import { auth } from '../misc/auth.js'

const router = express.Router()

// Define routes for authentication
router.get('/user/details', auth, getUserDetails)
router.get('/dashboard', auth, getDashboardsDetails)

export default router
