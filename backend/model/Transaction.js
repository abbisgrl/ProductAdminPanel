import mongoose from 'mongoose'

const TransactionSchema = new mongoose.Schema(
  {
    customerId: String,
    cost: String,
    products: [{ type: String }],
    transactionId: String,
  },
  { timestamps: true },
)

const Transaction = mongoose.model('Transaction', TransactionSchema)
export default Transaction
