import mongoose from 'mongoose'

const CustomerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    city: String,
    state: String,
    country: String,
    occupation: String,
    phoneNumber: String,
    transactions: Array,
    customerId: String,
  },
  { timestamps: true },
)

const Customer = mongoose.model('Customer', CustomerSchema)
export default Customer
