import React, { useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useAddProductMutation } from '../../state/api'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { showAlert } from '../../state/alertSlice'

const AddProduct = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [productData, setProductData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    rating: '',
    supply: '',
  })

  const [addProduct, { isLoading }] = useAddProductMutation()

  const handleChange = (e) => {
    const { name, value } = e.target
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Here you can integrate your backend call to save the product
    try {
      await addProduct(productData).unwrap() // Call signup mutation with form data
      dispatch(
        showAlert({
          severity: 'success',
          title: 'Success',
          message: 'Product added successfully',
          autoHideDuration: 3000, // Custom duration in milliseconds
        }),
      )
      navigate('/products')
    } catch (error) {
      console.error('Signup failed:', error) // Handle error
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
        Add Product
      </Typography>

      <TextField
        label="Product Name"
        name="name"
        value={productData.name}
        onChange={handleChange}
        required
        fullWidth
      />

      <TextField
        label="Price"
        name="price"
        type="number"
        value={productData.price}
        onChange={handleChange}
        required
        fullWidth
      />

      <TextField
        label="Description"
        name="description"
        value={productData.description}
        onChange={handleChange}
        required
        fullWidth
        multiline
        rows={3}
      />

      <TextField
        label="Category"
        name="category"
        value={productData.category}
        onChange={handleChange}
        required
        fullWidth
      />

      <TextField
        label="Rating"
        name="rating"
        type="number"
        value={productData.rating}
        onChange={handleChange}
        required
        fullWidth
        inputProps={{ min: 0, max: 5, step: 0.1 }}
      />

      <TextField
        label="Supply"
        name="supply"
        type="number"
        value={productData.supply}
        onChange={handleChange}
        required
        fullWidth
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isLoading}
      >
        Add Product
      </Button>
    </Box>
  )
}

export default AddProduct
