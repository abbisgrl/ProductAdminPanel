import { useCallback, useEffect, useState } from 'react'
import { debounce } from 'throttle-debounce'
import { Box, IconButton, InputBase, useMediaQuery } from '@mui/material'
import ProductCard from './ProductCard'
import Header from '../component/SubHeader'
import { useGetProductsListQuery } from '../../state/api'
import Loader from '../component/Loader'
import FlexBetween from '../../styles/FlexBetween'
import { useTheme } from '@emotion/react'
import { Search } from '@mui/icons-material'

const Products = () => {
  const theme = useTheme()

  const [searchText, setSearchText] = useState('')
  const [triggerFetch, setTriggerFetch] = useState(false)
  const isNonMobile = useMediaQuery('(min-width: 1000px)')
  const { data, isLoading, refetch } = useGetProductsListQuery(searchText, {
    skip: !triggerFetch,
  })

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

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PRODUCTS" />
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
      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
          }}
        >
          {data?.map(
            ({
              _id,
              name,
              description,
              price,
              rating,
              category,
              supply,
              stat,
            }) => (
              <ProductCard
                key={_id}
                _id={_id}
                name={name}
                description={description}
                price={price}
                rating={rating}
                category={category}
                supply={supply}
                stat={stat}
              />
            ),
          )}
        </Box>
      ) : (
        <Loader />
      )}
    </Box>
  )
}

export default Products
