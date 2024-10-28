import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  InputLabel,
  FormControl,
} from '@mui/material'
import {
  useAddTransactionMutation,
  useGetCustomerListQuery,
  useGetProductsListQuery,
} from '../../state/api'

const AddTransaction = () => {
  const [transactionData, setTransactionData] = useState({
    customerId: '',
    cost: '',
    products: [],
  })
  const [users, setUsers] = useState([])
  const [products, setProducts] = useState([])
  const [open, setOpen] = useState(false)

  const { data: customerData, isLoading: customerIsLoading } =
    useGetCustomerListQuery()
  const { data: productData, isLoading: productIsLoading } =
    useGetProductsListQuery()
  const [addTransaction, { data, isLoading }] = useAddTransactionMutation()

  // Fetch users and products from API (placeholder functions)
  useEffect(() => {
    if (customerData && !customerIsLoading) {
      const customerArray = []
      customerData.forEach((item) => {
        const customerDataUpdated = {
          customerId: item.customerId,
          name: item.name,
        }
        customerArray.push(customerDataUpdated)
      })
      setUsers(customerArray)
    }
  }, [customerData])

  useEffect(() => {
    if (productData && !productIsLoading) {
      const productArray = []
      productData.forEach((item) => {
        const productDataUpdated = {
          productId: item.productId,
          name: item.name,
        }
        productArray.push(productDataUpdated)
      })
      setProducts(productArray)
    }
  }, [productData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setTransactionData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleProductSelect = (e) => {
    const { value } = e.target
    setTransactionData((prevData) => ({
      ...prevData,
      products: value,
    }))
    setOpen(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Here you can integrate your backend call to save the product
    try {
      const result = await addTransaction(transactionData).unwrap()
    } catch (error) {
      console.error('Adding transaction failed', error) // Handle error
    }
  }

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 400,
        margin: '0 auto',
        padding: 2,
      }}
      onSubmit={handleSubmit}
    >
      <Typography variant="h4" gutterBottom>
        Add Transaction
      </Typography>

      <FormControl fullWidth>
        <InputLabel>User</InputLabel>
        <Select
          label="User"
          name="customerId"
          value={transactionData.customerId}
          onChange={handleChange}
          required
        >
          {users.map((customer) => (
            <MenuItem key={customer.customerId} value={customer.customerId}>
              {customer.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Cost"
        name="cost"
        value={transactionData.cost}
        onChange={handleChange}
        required
        fullWidth
      />

      <FormControl fullWidth>
        <InputLabel>Products</InputLabel>
        <Select
          label="Products"
          name="products"
          multiple
          value={transactionData.products}
          onChange={handleProductSelect}
          onOpen={() => setOpen(true)} // Set open state to true
          onClose={() => setOpen(false)} // Set open state to false
          open={open} // Control the open state
          required
        >
          {products.map((product) => (
            <MenuItem key={product.productId} value={product.productId}>
              {product.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button type="submit" variant="contained" color="primary">
        Add Transaction
      </Button>
    </Box>
  )
}

export default AddTransaction
