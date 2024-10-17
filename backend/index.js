import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import helmet from 'helmet'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import generalRoutes from './routes/generalRoutes.js'
import clientRoutes from './routes/clientRoutes.js'
import salesRoutes from './routes/salesRoutes.js'
import managementRoutes from './routes/managementRoutes.js'
import userRoutes from './routes/userRoutes.js'
import './db/index.js'
import Product from './model/Products.js'
import {
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataUser,
} from './data/index.js'
import ProductMetrics from './model/ProductMetrics.js'
import Customer from './model/Customers.js'
import Transaction from './model/Transaction.js'

dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(morgan('common'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

app.use('/general', generalRoutes)
app.use('/client', clientRoutes)
app.use('/sales', salesRoutes)
app.use('/management', managementRoutes)
app.use('/auth', userRoutes)

const PORT = process.env.PORT || 8001

app.listen(PORT, () => console.log(`Server Port:${PORT}`))
