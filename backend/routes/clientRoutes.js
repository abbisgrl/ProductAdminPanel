import express from 'express'
import { auth } from '../misc/auth.js'
import {
  getCustomerList,
  getProductList,
  getTransactionsList,
} from '../controller/clientController.js'

const router = express.Router()

router.get('/productList', auth, getProductList)

router.get('/customerList', auth, getCustomerList)

router.get('/transactionsList', auth, getTransactionsList)

export default router
