import express from 'express'
import { auth } from '../misc/auth.js'
import {
  getCustomerList,
  getGeographyData,
  getProductList,
  getTransactionsList,
} from '../controller/clientController.js'

const router = express.Router()

router.get('/productList', auth, getProductList)

router.get('/customerList', auth, getCustomerList)

router.get('/transactionsList', auth, getTransactionsList)

router.get('/geographicData', auth, getGeographyData)

export default router
