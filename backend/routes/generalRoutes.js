import express from 'express'
import {
  getDashboardsDetails,
  getUserDetails,
} from '../controller/generalConroller.js'
import { withRoles } from '../misc/auth.js'

const router = express.Router()

// Define routes for authentication
router.get('/user/details', withRoles(['S', 'A', 'T']), getUserDetails)

router.get('/dashboard', withRoles(['S', 'A', 'T']), getDashboardsDetails)

export default router
