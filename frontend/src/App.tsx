import { useState } from 'react'
import { Box, TextField, Button, AppBar, Toolbar, Typography, ThemeProvider, createTheme, CssBaseline, Card } from '@mui/material'

const theme = createTheme({
  palette: {
    background: {
      default: '#f4f1ea',
      paper: '#faf8f3'
    },
    primary: {
      main: '#7a9e7e'
    },
    secondary: {
      main: '#4f6f52'
    }
  },
  typography: {
    fontFamily: 'Inter, sans-serif'
  }
})

function App() {
  const [inputText, setInputText] = useState('')

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>

        {/* Topbar */}
        <AppBar position="static" elevation={0} sx={{ backgroundColor: '#e6e2d8', color: '#4f6f52' }}>
          <Toolbar>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Smart Journal App
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Main Layout */}
        <Box sx={{ display: 'flex', flex: 1 }}>

          {/* Sidebar */}
          <Box sx={{
            width: 200,
            bgcolor: '#e6e2d8',
            p: 3, display: 'flex',
            flexDirection: 'column', gap: 3
          }}>

            <Typography variant='body2'>Journal</Typography>
            <Typography variant='body2'>Statistics</Typography>
            <Typography variant='body2'>Account</Typography>

          </Box>

          {/* Main content */}
          <Box
            sx={{
              display: 'flex',
              flex: 1,
              p: 4,
              gap: 4
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
    </ThemeProvider>
  );
}

export default App
