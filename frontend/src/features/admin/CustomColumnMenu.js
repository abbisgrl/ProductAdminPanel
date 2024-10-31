import React from 'react'
import { GridColumnMenuContainer } from '@mui/x-data-grid'
import { Button } from '@mui/material'

const CustomColumnMenu = (props) => {
  const { hideMenu, currentColumn, open } = props

  const handleFilterClick = () => {
    // Implement your custom filter logic here
    hideMenu() // Close the menu after the action
  }

  const handleHideColumn = () => {
    // Implement your logic to hide the column here
    hideMenu() // Close the menu after the action
  }

  return (
    <GridColumnMenuContainer
      hideMenu={hideMenu}
      currentColumn={currentColumn}
      open={open}
    >
      <Button onClick={handleFilterClick} color="primary">
        Custom Filter
      </Button>
      <Button onClick={handleHideColumn} color="secondary">
        Hide Column
      </Button>
    </GridColumnMenuContainer>
  )
}

export default CustomColumnMenu
