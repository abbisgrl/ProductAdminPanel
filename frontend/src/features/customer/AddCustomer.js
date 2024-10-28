import React, { useState } from 'react'
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from '@mui/material'
import { useAddCustomerMutation, useAddProductMutation } from '../../state/api'
import countriesData from '../../utils/countryData'

const AddCustomer = () => {
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    city: '',
    state: '',
    country: '',
    occupation: '',
    phoneNumber: '',
  })

  const [addCustomer, { data, isLoading }] = useAddCustomerMutation()

  const handleChange = (e) => {
    const { name, value } = e.target
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Here you can integrate your backend call to save the product
    try {
      const result = await addCustomer(customerData).unwrap() // Call signup mutation with form data
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

      {/* Country Dropdown */}
      <FormControl fullWidth>
        <InputLabel id="country-select-label">Country</InputLabel>
        <Select
          labelId="country-select-label"
          name="country"
          value={customerData.country}
          onChange={handleChange}
          label="Country"
          required
        >
          {countriesData.map((country) => (
            <MenuItem key={country.iso2} value={country.iso2}>
              {country.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

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
