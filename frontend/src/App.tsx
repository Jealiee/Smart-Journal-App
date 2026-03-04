import { useState } from 'react'
import { Box, TextField, Button, AppBar, Toolbar, Typography, ThemeProvider, createTheme, CssBaseline, Card } from '@mui/material'
import EditNoteIcon from '@mui/icons-material/EditNote'
import ChecklistIcon from '@mui/icons-material/Checklist'
import BarChartIcon from '@mui/icons-material/BarChart'
import PersonIcon from '@mui/icons-material/Person'

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
  const [isExpanded, setIsExpanded] = useState(false)

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
        <Box sx={{ display: 'flex', flex: 1, bgcolor: 'background.default' }}>

          {/* Sidebar */}
          <Box
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
            sx={{
              width: isExpanded ? 220 : 80,
              bgcolor: '#e6e2d8',
              py: 4,
              px: isExpanded ? 3 : 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: isExpanded ? 'flex-start' : 'center',
              gap: 3,
              borderRight: '1px solid rgba(0,0,0,0.25)',
              transition: 'width 0.3s ease, padding 0.3s ease, align-items 0.3s ease'
            }}>

            {[
              { label: 'Journal', icon: <EditNoteIcon /> },
              { label: 'Habits', icon: <ChecklistIcon /> },
              { label: 'Statistics', icon: <BarChartIcon /> },
              { label: 'Account', icon: <PersonIcon /> }
            ].map(item => (
              <Box
                key={item.label}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  width: '100%',
                  p: 1.5,
                  borderRadius: 2,
                  cursor: 'pointer',
                  justifyContent: isExpanded ? 'flex-start' : 'center',
                  transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)', '&:hover': { bgcolor: 'rgba(122,158,126,0.18)', transform: 'translateX(2px)' }
                }}>
                {item.icon}
                <Typography
                  sx={{
                    opacity: isExpanded ? 1 : 0,
                    ml: isExpanded ? 0 : -1,
                    transition: 'opacity 0.2s ease, margin 0.2s ease',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden'
                  }}>
                  {item.label}
                </Typography>
              </Box>
            ))}

          </Box>

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
    </ThemeProvider>
  );
}

export default App
