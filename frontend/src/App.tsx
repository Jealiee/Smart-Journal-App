import { useState } from 'react'
import { Box, TextField, Button, Typography, ThemeProvider, createTheme, CssBaseline, Card} from '@mui/material'

import Sidebar from './components/sidebar'
import Topbar from './components/topbar'


function App() {
  const [inputText, setInputText] = useState('')
  const [mode, setMode] = useState<'light' | 'dark'>('light')

  const toggleMode = () => setMode(prev => (prev === 'light' ? 'dark' : 'light'))

  const theme = createTheme({
    palette: {
      mode,

      background: {
        default: mode === 'light' ? '#f4f1ea' : '#242424',
        paper: mode === 'light' ? '#faf8f3' : '#2b2b2b'
      },

      primary: {
        main: mode === 'light' ? '#7a9e7e' : '#a0d6b4'
      },

      secondary: {
        main: mode === 'light' ? '#4f6f52' : '#8fc1a9'
      },

      text: {
        primary: mode === 'light' ? '#4f6f52' : '#f4f1ea'
      }
    },

    typography: {
      fontFamily: 'Inter, sans-serif'
    },

    layout: {
      topbar: {
        bg: mode === 'light' ? '#e6e2d8' : '#2c2c2c',
        text: mode === 'light' ? '#4f6f52' : '#f4f1ea'
      },

      sidebar: {
        bg: mode === 'light' ? '#faf8f3' : '#2b2b2b',
        text: mode === 'light' ? '#4f6f52' : '#eaeaea',
        hover: mode === 'light' ? '#e8e3d9' : '#383838'
      },

      main: {
        bg: mode === 'light' ? '#f4f1ea' : '#242424'
      }
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>

        {/* Topbar */}
        <Topbar toggleMode={toggleMode} />

        {/* Main Layout */}
        <Box sx={{ display: 'flex', flex: 1, bgcolor: 'background.default' }}>

          {/* Sidebar */}
         <Sidebar/>

          {/* Main content */}
          <Box
            sx={{
              display: 'flex',
              flex: 1,
              p: 4,
              gap: 4,
              bgcolor: 'background.default'
            }}
          >
            <Box sx={{ flex: 4 }}>
              <Card sx={{ p: 3 }}>
                <Typography variant='h6' sx={{ mb: 2 }}>
                  Today's Entry
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  minRows={12}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder='How was your day?' />

                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button variant='contained'>
                    Save Entry
                  </Button>
                </Box>

              </Card>
            </Box>

            <Box sx={{ flex: 6 }}>
              <Card sx={{ p: 3, height: '100%' }}>
                <Typography variant='h6'>
                  Coming Soon ...
                </Typography>
              </Card>
            </Box>

          </Box>
        </Box>
      </Box>
    </ThemeProvider >
  )
}

export default App
