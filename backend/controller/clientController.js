import Customer from '../model/Customers.js'
import ProductMetrics from '../model/ProductMetrics.js'
import Product from '../model/Products.js'
import Transaction from '../model/Transaction.js'

export const getProductList = async (req, res, next) => {
  try {
    const getProducts = await Product.aggregate([
      {
        $lookup: {
          from: ProductMetrics.collection.name,
          let: { productId: { $toString: '$_id' } }, // Convert _id (ObjectId) to string
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$productId', '$$productId'], // Compare foreignField 'productId' with the converted _id
                },
              },
            },
          ],
          as: 'stat',
        },
      },
      { $unwind: '$stat' },
    ])
    res.status(200).json(getProducts)
  } catch (error) {
    console.dir({ error }, { depth: null })
  }
}

export const getCustomerList = async (req, res, next) => {
  try {
    const customerList = await Customer.find()
    res.status(200).json(customerList)
  } catch (error) {
    console.dir({ error }, { depth: null })
  }
}

export const getTransactionsList = async (req, res, next) => {
  try {
    // sort should look like this: { "field": "userId", "sort": "desc"}
    const { page = 1, pageSize = 20, sort = null, search = '' } = req.query

    // formatted sort should look like { userId: -1 }
    const generateSort = () => {
      const sortParsed = JSON.parse(sort)
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = 'asc' ? 1 : -1),
      }

      return sortFormatted
    }
    const sortFormatted = Boolean(sort) ? generateSort() : {}

    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search, 'i') } },
        { userId: { $regex: new RegExp(search, 'i') } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize)

    const total = await Transaction.countDocuments({
      name: { $regex: search, $options: 'i' },
    })

    res.status(200).json({
      transactions,
      total,
    })
  } catch (error) {
    console.dir({ error }, { depth: null })
  }
}
