import express from 'express'

import { auth } from '../misc/auth.js'
import { totalStats } from '../controller/salesController.js'

const router = express.Router()

// Defines routes of sales details
router.get('/totalSales', auth, totalStats)

export default router
