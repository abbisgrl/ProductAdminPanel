import React, { useMemo, useState } from 'react'
import { Box, useMediaQuery } from '@mui/material'
import Navbar from './components/Navbar.js'
import { useGetUserQuery } from '../state/api.js'
import Sidebar from './components/Sidebar.js'
import Loader from '../features/component/Loader.jsx'
import AlertMessage from './components/AlertMessage.js'

const MemoizedSidebar = React.memo(Sidebar)
const MemoizedNavbar = React.memo(Navbar)

const MainLayout = ({ children }) => {
  const isNonMobile = useMediaQuery('(min-width: 600px)')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const { data, isLoading } = useGetUserQuery()

  const user = useMemo(() => data?.[0] || {}, [data])

  // Memoizing the user object and other props
  const sidebarProps = useMemo(
    () => ({
      user,
      isNonMobile,
      drawerWidth: '250px',
      isSidebarOpen,
      setIsSidebarOpen,
    }),
    [user, isNonMobile, isSidebarOpen],
  )

  const navbarProps = useMemo(
    () => ({
      user,
      isSidebarOpen,
      setIsSidebarOpen,
    }),
    [user, isSidebarOpen],
  )

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Box
          display={isNonMobile ? 'flex' : 'block'}
          width="100%"
          height="100%"
        >
          <MemoizedSidebar {...sidebarProps} />

          <Box flexGrow={1}>
            <MemoizedNavbar {...navbarProps} />
            <AlertMessage />
            {children}
          </Box>
        </Box>
      )}
    </>
  )
}

export default MainLayout
