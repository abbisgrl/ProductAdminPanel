import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database connected successfully'))
  .catch((error) => console.log(error))
