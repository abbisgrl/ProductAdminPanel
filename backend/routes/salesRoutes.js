import express from 'express'

import { withRoles } from '../misc/auth.js'
import { totalStats } from '../controller/salesController.js'

const router = express.Router()

// Defines routes of sales details
router.get('/totalSales', withRoles(['S', 'A', 'T']), totalStats)

export default router
