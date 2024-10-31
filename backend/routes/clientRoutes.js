import express from 'express'
import { withRoles } from '../misc/auth.js'
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

router.get('/productList', withRoles(['S', 'A', 'T']), getProductList)

router.post('/addProduct', withRoles(['S', 'A']), addProduct)

router.get('/customerList', withRoles(['S', 'A', 'T']), getCustomerList)

router.post('/addCustomer', withRoles(['S', 'A']), addCustomer)

router.get('/transactionsList', withRoles(['S', 'A', 'T']), getTransactionsList)

router.post('/addTransaction', withRoles(['S', 'A']), addTransaction)

router.get('/geographicData', withRoles(['S', 'A', 'T']), getGeographyData)

export default router
