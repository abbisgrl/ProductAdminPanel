import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // 30 seconds
  })
  .then(() => console.log('Database connected successfully'))
  .catch((error) => console.log(error))
