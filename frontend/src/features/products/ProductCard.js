import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Rating,
  Collapse,
  useTheme,
} from '@mui/material'

const ProductCard = ({
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  stat,
}) => {
  const theme = useTheme()
  const [isExpanded, setIsExpanded] = useState(false)
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.background.paper,
        borderRadius: '0.75rem',
        boxShadow: theme.shadows[3],
        transition: '0.3s',
        '&:hover': {
          boxShadow: theme.shadows[10],
        },
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image="https://via.placeholder.com/150" // Replace with your product image URL
        alt={name}
      />
      <CardContent>
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}
        >
          {name}
        </Typography>
        <Typography sx={{ mb: '1rem', color: theme.palette.secondary.main }}>
          {category}
        </Typography>
        <Typography variant="body1" color={theme.palette.text.primary}>
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly sx={{ marginBottom: '1rem' }} />
        <Typography variant="body2" color={theme.palette.text.secondary}>
          {description}
        </Typography>
      </CardContent>
      <Button
        variant="outlined"
        onClick={() => setIsExpanded(!isExpanded)}
        sx={{
          m: 1,
          borderColor: theme.palette.primary.main,
          color: theme.palette.primary.main,
          '&:hover': {
            borderColor: theme.palette.secondary.main,
          },
        }}
      >
        See More
      </Button>
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2">ID: {_id}</Typography>
          <Typography variant="body2">Supply Left: {supply}</Typography>
          <Typography variant="body2">
            Yearly Sales This Year: {stat?.yearlySalesTotal}
          </Typography>
          <Typography variant="body2">
            Yearly Units Sold This Year: {stat?.yearlyTotalSoldUnits}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default ProductCard
