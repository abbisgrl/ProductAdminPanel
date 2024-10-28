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
    const title = getCurrentTitle(pathname.substring(1))
    setActive(title)
  }, [])

  const getCurrentTitle = (pathname) => {
    if (pathname.includes('add')) {
      if (pathname.includes('product')) {
        return 'products'
      } else if (pathname.includes('customer')) {
        return 'customers'
      } else if (pathname.includes('transaction')) {
        return 'transaction'
      }
    }
    return pathname
  }

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
            {
              text: 'Add Product',
              icon: <AddCircleOutline />,
              url: '/add/product',
            },
            {
              text: 'View Products',
              icon: <ViewListOutlined />,
              url: '/products',
            },
          ],
        },
        {
          text: 'Customers',
          icon: <Groups2Outlined />,
          children: [
            {
              text: 'Add Customer',
              icon: <AddCircleOutline />,
              url: '/add/customer',
            },
            {
              text: 'View Customers',
              icon: <ViewListOutlined />,
              url: '/customers',
            },
          ],
        },
        {
          text: 'Transactions',
          icon: <ReceiptLongOutlined />,
          children: [
            {
              text: 'Add Transactions',
              icon: <AddCircleOutline />,
              url: '/add/transaction',
            },
            {
              text: 'View Transactions',
              icon: <ViewListOutlined />,
              url: '/transactions',
            },
          ],
        },
        {
          text: 'Geography',
          icon: <PublicOutlined />,
        },
      ],
    },
    {
      text: 'Sales',
      icon: null,
      children: [
        {
          text: 'TotalStats',
          icon: <PointOfSaleOutlined />,
          url: '/totalstats',
        },
        { text: 'DailyStats', icon: <TodayOutlined />, url: '/dailystats' },
        {
          text: 'MonthlyStats',
          icon: <CalendarMonthOutlined />,
          url: '/monthlystats',
        },
        { text: 'Breakdown', icon: <PieChartOutlined />, url: '/breakdown' },
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
                children: [
                  {
                    text: 'Manage User',
                    icon: <ViewListOutlined />,
                    url: '/users',
                  },
                ],
              },
              {
                text: 'Performance',
                icon: <TrendingUpOutlined />,
                url: '/performance',
              },
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
                      <Typography
                        key={text}
                        sx={{
                          m: '2.25rem 0 1rem 3rem',
                        }}
                      >
                        {text}
                      </Typography>
                      {children.map(
                        ({
                          text: childText,
                          icon: childIcon,
                          children: subChildren,
                          url: childUrl,
                        }) => {
                          const lcText = childText.toLowerCase()
                          return (
                            <React.Fragment key={childText}>
                              <ListItemButton
                                onClick={() => {
                                  if (subChildren?.length) {
                                    handleToggleSubMenu(childText)
                                  } else {
                                    navigate(childUrl)
                                    setActive(childText)
                                  }
                                }}
                                sx={{
                                  pl: 4,
                                  backgroundColor:
                                    active === childText
                                      ? theme.palette.secondary[300]
                                      : 'transparent',
                                  color:
                                    active === childText
                                      ? theme.palette.primary[600]
                                      : theme.palette.secondary[100],
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
                                      url: subChildUrl,
                                    }) => {
                                      const subChildLcText =
                                        subChildText.toLowerCase()
                                      return (
                                        <ListItemButton
                                          key={subChildText}
                                          onClick={() => {
                                            navigate(subChildUrl)
                                            setActive(childText)
                                          }}
                                          sx={{ pl: 4 }}
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
                      pl: 4,
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
