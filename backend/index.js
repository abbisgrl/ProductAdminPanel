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
import './db/index.js'

dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet)
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(morgan)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

app.route('/general', generalRoutes)
app.route('/client', clientRoutes)
app.route('/sales', salesRoutes)
app.route('/management', managementRoutes)

const PORT = process.env.PORT || 8001

app.listen(PORT, () => console.log(`Server Port:${PORT}`))
