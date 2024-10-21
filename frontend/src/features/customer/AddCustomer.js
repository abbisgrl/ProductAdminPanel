import React, { useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'

const AddCustomer = () => {
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    password: '',
    city: '',
    state: '',
    country: '',
    occupation: '',
    phoneNumber: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here, like sending data to the backend
    console.log('Customer Data:', customerData)
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
        Add Customer
      </Typography>

      <TextField
        label="Name"
        name="name"
        value={customerData.name}
        onChange={handleChange}
        required
        fullWidth
        inputProps={{ minLength: 2, maxLength: 100 }}
      />

      <TextField
        label="Email"
        name="email"
        type="email"
        value={customerData.email}
        onChange={handleChange}
        required
        fullWidth
        inputProps={{ maxLength: 50 }}
      />

      <TextField
        label="Password"
        name="password"
        type="password"
        value={customerData.password}
        onChange={handleChange}
        required
        fullWidth
        inputProps={{ minLength: 5 }}
      />

      <TextField
        label="City"
        name="city"
        value={customerData.city}
        onChange={handleChange}
        fullWidth
      />

      <TextField
        label="State"
        name="state"
        value={customerData.state}
        onChange={handleChange}
        fullWidth
      />

      <TextField
        label="Country"
        name="country"
        value={customerData.country}
        onChange={handleChange}
        fullWidth
      />

      <TextField
        label="Occupation"
        name="occupation"
        value={customerData.occupation}
        onChange={handleChange}
        fullWidth
      />

      <TextField
        label="Phone Number"
        name="phoneNumber"
        value={customerData.phoneNumber}
        onChange={handleChange}
        fullWidth
      />

      <Button type="submit" variant="contained" color="primary">
        Add Customer
      </Button>
    </Box>
  )
}

export default AddCustomer
