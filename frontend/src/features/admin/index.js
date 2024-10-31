import React from 'react'
import { Box, useTheme, MenuItem, Select } from '@mui/material'
import {
  // useGetUserQuery,
  useGetUsersListQuery,
  useUpdateUserDetailsMutation,
} from '../../state/api.js'
import { DataGrid } from '@mui/x-data-grid'
import Header from '../component/SubHeader.js'
import CustomColumnMenu from './CustomColumnMenu.js'

const UsersList = () => {
  const theme = useTheme()
  const { data, isLoading } = useGetUsersListQuery()
  const [updateUserDetails] = useUpdateUserDetailsMutation()
  // const { data: userData } = useGetUserQuery('defaultUserId', {
  //   skip: false,
  // })

  const handleEditCellChange = async (params) => {
    const { userId, field, value } = params
    const userDetails = { userId, role: value }
    if (field === 'role') {
      try {
        await updateUserDetails({ userDetails })
        window.location.reload()
      } catch (error) {
        console.error('Failed to update user role:', error)
      }
    }
  }

  const RoleEditInputCell = (props) => {
    const { row, api, value } = props
    const { userId } = row
    const handleChange = async (event) => {
      const newValue = event.target.value
      api.setEditCellValue({ userId, field: 'role', value: newValue }, event)
      handleEditCellChange({ userId, field: 'role', value: newValue })
    }

    return (
      <Select
        value={value}
        onChange={handleChange}
        sx={{ width: '100%' }}
        autoFocus
      >
        <MenuItem value="superadmin">Superadmin</MenuItem>
        <MenuItem value="admin">Admin</MenuItem>
        <MenuItem value="admin">User</MenuItem>
      </Select>
    )
  }

  const columns = [
    { field: 'userId', headerName: 'UserId', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 0.5 },
    { field: 'email', headerName: 'Email', flex: 1 },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      flex: 0.5,
      renderCell: (params) =>
        params.value.replace(/^(\d{3})(\d{3})(\d{4})/, '($1)$2-$3'),
    },
    { field: 'country', headerName: 'Country', flex: 0.4 },
    { field: 'occupation', headerName: 'Occupation', flex: 1 },
    {
      field: 'role',
      headerName: 'Role',
      flex: 0.5,
      editable: true,
      renderEditCell: (params) => <RoleEditInputCell {...params} />, // Render dropdown editor
    },
  ]

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Users And Admin" />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          '& .MuiDataGrid-root': { border: 'none', color: 'black' },
          '& .MuiDataGrid-cell': { borderBottom: 'none' },
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
          components={{
            ColumnMenu: CustomColumnMenu,
          }}
        />
      </Box>
    </Box>
  )
}

export default UsersList
