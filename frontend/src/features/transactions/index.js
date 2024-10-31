import React, { useCallback, useEffect, useState } from 'react'
import { Box, IconButton, InputBase, useTheme } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useGetTransactionsListQuery } from '../../state/api.js'
import Header from '../component/SubHeader.js'
import DataGridCustomToolbar from '../component/DataGridCustomToolbar.jsx'
import { debounce } from 'throttle-debounce'
import FlexBetween from '../../styles/FlexBetween.jsx'
import { Search } from '@mui/icons-material'

const Transactions = () => {
  const theme = useTheme()
  // values to be sent to the backend
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(20)
  const [sort, setSort] = useState({})
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [triggerFetch, setTriggerFetch] = useState(false)
  const { data, isLoading, refetch } = useGetTransactionsListQuery(
    { page, pageSize, sort: JSON.stringify(sort), search },
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
  }, [search, fetchList]) // Make sure searchText and fetchList trigger the effect

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const columns = [
    {
      field: 'transactionId',
      headerName: 'ID',
      flex: 1,
    },
    {
      field: 'customerId',
      headerName: 'User ID',
      flex: 1,
    },
    {
      field: 'createdAt',
      headerName: 'CreatedAt',
      flex: 1,
    },
    {
      field: 'products',
      headerName: '# of Products',
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: 'cost',
      headerName: 'Cost',
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ]

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="TRANSACTIONS" />
      <FlexBetween
        backgroundColor={theme.palette.background.alt}
        borderRadius="9px"
        gap="1rem"
        p="0.3rem 1rem" // Reduced padding for a more compact look
        width="400px" // Set a fixed width to limit the search bar size
      >
        <InputBase
          placeholder="Search..."
          value={search}
          onChange={handleSearch}
        />
        <IconButton>
          <Search />
        </IconButton>
      </FlexBetween>
      <Box
        height="80vh"
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
          rows={(data && data.transactions) || []}
          columns={columns}
          rowCount={(data && data.total) || 0}
          rowsPerPageOptions={[20, 50, 100]}
          pagination
          page={page}
          pageSize={pageSize}
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
        />
      </Box>
    </Box>
  )
}

export default Transactions
