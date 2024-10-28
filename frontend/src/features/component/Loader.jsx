import React from 'react'
import { CircularProgress, Box, useTheme } from '@mui/material'

const Loader = ({ size = 40, thickness = 4, color = 'primary' }) => {
  const theme = useTheme() // Access the current theme

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      width="100%"
    >
      <CircularProgress
        size={size}
        thickness={thickness}
        sx={{ color: theme.palette[color].main }} // Use theme color
      />
    </Box>
  )
}

export default Loader
