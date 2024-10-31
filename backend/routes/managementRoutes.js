import express from 'express'
import { withRoles } from '../misc/auth.js'
import {
  getUsersOnly,
  updateUsersDetails,
} from '../controller/managementController.js'

const router = express.Router()

router.get('/users', withRoles(['S', 'A']), getUsersOnly)

router.post('/user/update', withRoles(['S', 'A']), updateUsersDetails)

export default router
