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

const AddTransaction = () => {
  const [transactionData, setTransactionData] = useState({
    userId: '',
    cost: '',
    products: [],
  })
  const [users, setUsers] = useState([])
  const [products, setProducts] = useState([])

  // Fetch users and products from API (placeholder functions)
  useEffect(() => {
    const fetchUsers = async () => {
      // Replace with your API call to get users
      const userResponse = [
        { _id: '1', name: 'User One' },
        { _id: '2', name: 'User Two' },
      ]
      setUsers(userResponse)
    }

    const fetchProducts = async () => {
      // Replace with your API call to get products
      const productResponse = [
        { _id: '101', name: 'Product A' },
        { _id: '102', name: 'Product B' },
      ]
      setProducts(productResponse)
    }

    fetchUsers()
    fetchProducts()
  }, [])

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
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here, like sending data to the backend
    console.log('Transaction Data:', transactionData)
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
          name="userId"
          value={transactionData.userId}
          onChange={handleChange}
          required
        >
          {users.map((user) => (
            <MenuItem key={user._id} value={user._id}>
              {user.name}
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
          required
        >
          {products.map((product) => (
            <MenuItem key={product._id} value={product._id}>
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
