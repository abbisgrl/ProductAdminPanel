/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Link,
} from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useLoginMutation } from '../../state/api'
import { showAlert } from '../../state/alertSlice'
import { useDispatch } from 'react-redux'
import AlertMessage from '../../layout/components/AlertMessage'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const navigate = useNavigate()
  const [login, { data, isLoading }] = useLoginMutation()
  const dispatch = useDispatch()

  useEffect(() => {
    if (data?.token) {
      localStorage.setItem('token', data.token)
      navigate('/')
    }
  }, [data])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(formData).unwrap() // Call signup mutation with form data
    } catch (error) {
      dispatch(
        showAlert({
          severity: 'error',
          title: 'Failed',
          message: error.data.message,
          autoHideDuration: 3000, // Custom duration in milliseconds
        }),
      )
    }
  }

  return (
    <Box>
      <AlertMessage />
      {/* AppBar for Company Name and Logo */}
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="h6" color="inherit" sx={{ marginRight: 1 }}>
            MarketMetrix
          </Typography>
          <IconButton edge="end" color="inherit">
            <AccountCircleIcon fontSize="large" />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Login Form */}
      <Box maxWidth="sm" mx="auto" mt={4}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                fullWidth
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
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isLoading}
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography align="center" variant="body2">
                Don't have an account? <Link href="/signup">Sign Up</Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  )
}

export default Login
