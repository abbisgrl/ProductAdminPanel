import React, { useState } from 'react'
import { FormControl, MenuItem, InputLabel, Box, Select } from '@mui/material'
import Header from '../../component/SubHeader'
import TotalStatsChart from './TotalStatsChart.js'

const TotalStats = () => {
  const [view, setView] = useState('units')

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="OVERVIEW"
        subtitle="Overview of general revenue and profit"
      />
      <Box height="75vh">
        <FormControl sx={{ mt: '1rem' }}>
          <InputLabel>View</InputLabel>
          <Select
            value={view}
            label="View"
            onChange={(e) => setView(e.target.value)}
          >
            <MenuItem value="sales">Sales</MenuItem>
            <MenuItem value="units">Units</MenuItem>
          </Select>
        </FormControl>
        <TotalStatsChart view={view} />
      </Box>
    </Box>
  )
}

export default TotalStats
