import { CssBaseline, ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { themeSettings } from './styles/variables'
import { BrowserRouter } from 'react-router-dom'
import Routers from './routers/index.js'

const App = () => {
  const mode = useSelector((state) => state.globalStyle.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Routers />
          <CssBaseline />
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
