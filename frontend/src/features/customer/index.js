import React, { useCallback, useEffect, useState } from 'react'
import { Box, IconButton, InputBase, useTheme } from '@mui/material'
import { useGetCustomerListQuery } from '../../state/api.js'
import Header from '../component/SubHeader'
import { DataGrid } from '@mui/x-data-grid'
import { debounce } from 'throttle-debounce'
import FlexBetween from '../../styles/FlexBetween.jsx'
import { Search } from '@mui/icons-material'

const Customers = () => {
  const theme = useTheme()
  const [searchText, setSearchText] = useState('')
  const [triggerFetch, setTriggerFetch] = useState(false)
  const { data, isLoading, refetch } = useGetCustomerListQuery(
    searchText,
    // { skip: !triggerFetch },
  )

  // Effect to handle refetch based on triggerFetch
  useEffect(() => {
    if (triggerFetch) {
      refetch().then(() => {
        setTriggerFetch(false) // Reset trigger after refetch completes
      })
    }
  }, [triggerFetch, refetch])

  // Debounced function to fetch data
  const fetchList = useCallback(() => {
    setTriggerFetch(true)
  }, [])

  useEffect(() => {
    const debouncedFetch = debounce(500, fetchList)
    debouncedFetch() // Directly calling the debounced function here

    return () => {
      debouncedFetch.cancel() // Cancel on cleanup
    }
  }, [searchText, fetchList]) // Make sure searchText and fetchList trigger the effect

  const handleSearch = (event) => {
    setSearchText(event.target.value)
  }

  const columns = [
    {
      field: 'customerId',
      headerName: 'ID',
      flex: 1,
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 0.5,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      flex: 0.5,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, '($1)$2-$3')
      },
    },
    {
      field: 'country',
      headerName: 'Country',
      flex: 0.4,
    },
    {
      field: 'occupation',
      headerName: 'Occupation',
      flex: 1,
    },
  ]

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CUSTOMERS" />
      <FlexBetween
        backgroundColor={theme.palette.background.alt}
        borderRadius="9px"
        gap="1rem"
        p="0.3rem 1rem" // Reduced padding for a more compact look
        width="400px" // Set a fixed width to limit the search bar size
      >
        <InputBase
          placeholder="Search..."
          value={searchText}
          onChange={handleSearch}
        />
        <IconButton>
          <Search />
        </IconButton>
      </FlexBetween>
      <Box
        mt="40px"
        height="75vh"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
            color: 'black',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: theme.palette.primary.light,
          },
          '& .MuiDataGrid-footerContainer': {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: 'none',
          },
          '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
        />
      </Box>
    </Box>
  )
}

export default Customers
