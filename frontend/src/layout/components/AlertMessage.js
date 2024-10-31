import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Snackbar, Alert, AlertTitle } from '@mui/material'
import { hideAlert } from '../../state/alertSlice.js'

const AlertMessage = () => {
  const dispatch = useDispatch()
  const { open, severity, title, message, autoHideDuration } = useSelector(
    (state) => state.alert,
  )

  const handleClose = () => {
    dispatch(hideAlert())
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity={severity} variant="filled">
        {title && <AlertTitle>{title}</AlertTitle>}
        {message}
      </Alert>
    </Snackbar>
  )
}

export default AlertMessage
