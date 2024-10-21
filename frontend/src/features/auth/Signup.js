import React, { useState } from 'react'
import {
  TextField,
  Button,
  MenuItem,
  Grid,
  Typography,
  Box,
  AppBar,
  Toolbar,
  IconButton,
} from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useSignupMutation } from '../../state/api'

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    occupation: '',
    phoneNumber: '',
    role: 'admin',
  })

  const roles = ['user', 'admin', 'superadmin']
  const [signup, { data, isLoading }] = useSignupMutation()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await signup(formData).unwrap() // Call signup mutation with form data
    } catch (error) {
      console.error('Signup failed:', error) // Handle error
    }
  }

  return (
    <Box>
      {/* AppBar for Company Name and Logo */}
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="h6" color="inherit" sx={{ marginRight: 1 }}>
            TechSphere
          </Typography>
          <IconButton edge="end" color="inherit">
            <AccountCircleIcon fontSize="large" />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Signup Form */}
      <Box maxWidth="sm" mx="auto" mt={4}>
        <Typography variant="h4" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                fullWidth
                inputProps={{ minLength: 2, maxLength: 100 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                fullWidth
                inputProps={{ maxLength: 50 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                fullWidth
                inputProps={{ minLength: 5 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Occupation"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Role"
                name="role"
                select
                value={formData.role}
                onChange={handleChange}
                fullWidth
              >
                {roles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  )
}

export default Signup
