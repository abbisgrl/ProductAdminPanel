import express from 'express'
import { auth } from '../misc/auth.js'
import {
  addCustomer,
  addProduct,
  addTransaction,
  getCustomerList,
  getGeographyData,
  getProductList,
  getTransactionsList,
} from '../controller/clientController.js'

const router = express.Router()

router.get('/productList', auth, getProductList)

router.post('/addProduct', auth, addProduct)

router.get('/customerList', auth, getCustomerList)

router.post('/addCustomer', auth, addCustomer)

router.get('/transactionsList', auth, getTransactionsList)

router.post('/addTransaction', auth, addTransaction)

router.get('/geographicData', auth, getGeographyData)

export default router
