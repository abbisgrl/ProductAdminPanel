import React, { useMemo, useState, useEffect } from 'react'
import {
  Box,
  Collapse,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material'
import {
  ChevronLeft,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
  ExpandLess,
  ExpandMore,
  AddCircleOutline,
  ViewListOutlined,
} from '@mui/icons-material'
import { useLocation, useNavigate } from 'react-router-dom'
import FlexBetween from '../../styles/FlexBetween.jsx'

const Sidebar = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation()
  const [active, setActive] = useState('')
  const [openSubMenu, setOpenSubMenu] = useState({})
  const navigate = useNavigate()
  const theme = useTheme()

  useEffect(() => {
    setActive(pathname.substring(1))
  }, [pathname])

  const isSuperadminOrAdmin = useMemo(() => {
    return ['admin', 'superadmin'].includes(user?.role)
  }, [user])

  const handleToggleSubMenu = (text) => {
    setOpenSubMenu((prev) => ({ ...prev, [text]: !prev[text] }))
  }

  const navItems = [
    { text: 'Dashboard', icon: <HomeOutlined /> },
    {
      text: 'Client Facing',
      icon: null,
      children: [
        {
          text: 'Products',
          icon: <ShoppingCartOutlined />,
          children: [
            { text: 'Add Product', icon: <AddCircleOutline /> },
            { text: 'View Products', icon: <ViewListOutlined /> },
          ],
        },
        {
          text: 'Customers',
          icon: <Groups2Outlined />,
          children: [
            { text: 'Add Customer', icon: <AddCircleOutline /> },
            { text: 'View Customers', icon: <ViewListOutlined /> },
          ],
        },
        {
          text: 'Transactions',
          icon: <ReceiptLongOutlined />,
          children: [
            { text: 'Add Transactions', icon: <AddCircleOutline /> },
            { text: 'View Transactions', icon: <ViewListOutlined /> },
          ],
        },
      ],
    },
    {
      text: 'Sales',
      icon: null,
      children: [
        { text: 'TotalStats', icon: <PointOfSaleOutlined /> },
        { text: 'DailyStats', icon: <TodayOutlined /> },
        { text: 'MonthlyStats', icon: <CalendarMonthOutlined /> },
        { text: 'Breakdown', icon: <PieChartOutlined /> },
      ],
    },
    ...(isSuperadminOrAdmin
      ? [
          {
            text: 'Management',
            icon: null,
            children: [
              {
                text: 'Admin',
                icon: <AdminPanelSettingsOutlined />,
                children: [{ text: 'Manage User', icon: <ViewListOutlined /> }],
              },
              { text: 'Performance', icon: <TrendingUpOutlined /> },
            ],
          },
        ]
      : []),
  ]

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            '& .MuiDrawer-paper': {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Typography variant="h4" fontWeight="bold">
                  ECOMVISION
                </Typography>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon, children }) => {
                if (children) {
                  return (
                    <React.Fragment key={text}>
                      <Typography key={text} sx={{ m: '2.25rem 0 1rem 3rem' }}>
                        {text}
                      </Typography>
                      {children.map(
                        ({
                          text: childText,
                          icon: childIcon,
                          children: subChildren,
                        }) => {
                          const lcText = childText.toLowerCase()
                          return (
                            <React.Fragment key={childText}>
                              <ListItemButton
                                onClick={() => {
                                  if (subChildren?.length) {
                                    handleToggleSubMenu(childText)
                                  } else {
                                    navigate(`/${childText}`)
                                    setActive(childText)
                                  }
                                }}
                              >
                                <ListItemIcon
                                  sx={{ color: theme.palette.secondary[200] }}
                                >
                                  {childIcon}
                                </ListItemIcon>
                                <ListItemText primary={childText} />
                                {subChildren?.length && (
                                  <>
                                    {openSubMenu[childText] ? (
                                      <ExpandLess />
                                    ) : (
                                      <ExpandMore />
                                    )}
                                  </>
                                )}
                              </ListItemButton>
                              <Collapse
                                in={openSubMenu[childText]}
                                timeout="auto"
                                unmountOnExit
                              >
                                <List component="div" disablePadding>
                                  {subChildren?.map(
                                    ({
                                      text: subChildText,
                                      icon: subChildIcon,
                                    }) => {
                                      const subChildLcText =
                                        subChildText.toLowerCase()
                                      return (
                                        <ListItemButton
                                          key={subChildText}
                                          onClick={() => {
                                            navigate(
                                              `/${subChildLcText.replace(
                                                ' ',
                                                '',
                                              )}`,
                                            )
                                            setActive(subChildLcText)
                                          }}
                                          sx={{
                                            pl: 4,
                                            backgroundColor:
                                              active === subChildLcText
                                                ? theme.palette.secondary[300]
                                                : 'transparent',
                                            color:
                                              active === subChildLcText
                                                ? theme.palette.primary[600]
                                                : theme.palette.secondary[100],
                                          }}
                                        >
                                          <ListItemIcon
                                            sx={{
                                              color:
                                                theme.palette.secondary[200],
                                            }}
                                          >
                                            {subChildIcon}
                                          </ListItemIcon>
                                          <ListItemText
                                            primary={subChildText}
                                          />
                                        </ListItemButton>
                                      )
                                    },
                                  )}
                                </List>
                              </Collapse>
                            </React.Fragment>
                          )
                        },
                      )}
                    </React.Fragment>
                  )
                }

                const lcText = text.toLowerCase()
                return (
                  <ListItemButton
                    key={text}
                    onClick={() => {
                      navigate(`/${lcText}`)
                      setActive(lcText)
                    }}
                    sx={{
                      backgroundColor:
                        active === lcText
                          ? theme.palette.secondary[300]
                          : 'transparent',
                      color:
                        active === lcText
                          ? theme.palette.primary[600]
                          : theme.palette.secondary[100],
                    }}
                  >
                    {icon && (
                      <ListItemIcon
                        sx={{
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                    )}
                    <ListItemText primary={text} />
                  </ListItemButton>
                )
              })}
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  )
}

export default Sidebar
