import React, { useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    rating: '',
    supply: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you can integrate your backend call to save the product
    console.log('Product Data:', productData)
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

      <Button type="submit" variant="contained" color="primary">
        Add Product
      </Button>
    </Box>
  )
}

export default AddProduct
