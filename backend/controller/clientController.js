import { v4 as uuidv4 } from 'uuid' // random
import Customer from '../model/Customers.js'
import ProductMetrics from '../model/ProductMetrics.js'
import Product from '../model/Products.js'
import Transaction from '../model/Transaction.js'
import getCountryISO3 from 'country-iso-2-to-3'

export const getProductList = async (req, res, next) => {
  const { searchText } = req.query || {}
  try {
    const getProducts = await Product.aggregate([
      {
        $match: {
          $or: [
            { name: { $regex: searchText, $options: 'i' } }, // Case-insensitive search for name
            { productId: { $regex: searchText, $options: 'i' } }, // Case-insensitive search for productId
            { description: { $regex: searchText, $options: 'i' } }, // Case-insensitive search for description
          ],
        },
      },
      {
        $lookup: {
          from: ProductMetrics.collection.name,
          localField: 'productId',
          foreignField: 'productId',
          as: 'stat',
        },
      },
      { $unwind: { path: '$stat', preserveNullAndEmptyArrays: true } },
    ])

    res.status(200).json(getProducts)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const addProduct = async (req, res, next) => {
  const productArray = [{ ...req.body, productId: uuidv4() }]
  try {
    const result = await Product.insertMany(productArray)
    const response = { message: 'Product Succefully Added' }
    res.status(200).json(response)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getCustomerList = async (req, res, next) => {
  const { searchText } = req.query || {}
  let query
  // Check if searchText is empty or undefined
  if (!searchText) {
    // Return all customers if searchText is empty
    query = {} // No filter applied
  } else {
    // Construct the regex search query
    query = {
      $or: [
        { name: { $regex: searchText, $options: 'i' } },
        { email: { $regex: searchText, $options: 'i' } },
        { phoneNumber: { $regex: searchText, $options: 'i' } },
      ],
    }
  }

  try {
    const customerList = await Customer.find(query)
    res.status(200).json(customerList)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const addCustomer = async (req, res, next) => {
  const customerArray = [{ ...req.body, customerId: uuidv4() }]
  try {
    const result = await Customer.insertMany(customerArray)
    const response = { message: 'Customer Succefully Added' }
    res.status(200).json(response)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getTransactionsList = async (req, res, next) => {
  try {
    // sort should look like this: { "field": "customerId", "sort": "desc"}
    const { page = 1, pageSize = 20, sort = null, search = '' } = req.query

    // formatted sort should look like { customerId: -1 }
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
        { customerId: { $regex: new RegExp(search, 'i') } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize)

    const total = await Transaction.countDocuments(
      search
        ? {
            $or: [
              { cost: { $regex: search, $options: 'i' } },
              { customerId: { $regex: search, $options: 'i' } },
            ],
          }
        : {},
    )

    res.status(200).json({
      transactions,
      total,
    })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const addTransaction = async (req, res, next) => {
  const transactionId = uuidv4()
  const transactionArray = [{ ...req.body, transactionId }]
  try {
    const result = await Transaction.insertMany(transactionArray)
    await Customer.updateOne(
      { customerId: req.body.customerId },
      {
        $push: {
          transactions: transactionId,
        },
      },
    )
    const response = { message: 'Transaction Succefully Added' }
    res.status(200).json(response)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getGeographyData = async (req, res, next) => {
  try {
    const getGeographicData = await Customer.aggregate([
      { $group: { _id: '$country', count: { $sum: 1 } } },
    ])

    const countryData = getGeographicData.reduce((acum, currentValue) => {
      const getCountryIso3Name = getCountryISO3(currentValue._id)
      if (getCountryIso3Name) {
        acum.push({ id: getCountryIso3Name, value: currentValue.count })
      }
      return acum
    }, [])
    res.status(200).json(countryData)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}
