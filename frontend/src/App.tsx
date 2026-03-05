import { useState } from 'react'
import { Box, TextField, Button, AppBar, Toolbar, Typography, ThemeProvider, createTheme, CssBaseline, Card, Icon } from '@mui/material'
import EditNoteIcon from '@mui/icons-material/EditNote'
import ChecklistIcon from '@mui/icons-material/Checklist'
import BarChartIcon from '@mui/icons-material/BarChart'
import PersonIcon from '@mui/icons-material/Person'
import FeedbackIcon from '@mui/icons-material/Feedback'
import SettingsIcon from '@mui/icons-material/Settings'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import IconButton from '@mui/material/IconButton'


function App() {
  const [inputText, setInputText] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
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
    }
  })
  const isDark = mode === 'dark'

return (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>

      {/* Topbar */}
      <AppBar position="static" elevation={0} sx={{ backgroundColor: '#e6e2d8', color: '#4f6f52' }}>
        <Toolbar sx={{ position: 'relative' }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)'
            }}>
            Smart Journal
          </Typography>
          <Box sx={{ marginLeft: 'auto', display: 'flex', gap: 1 }}>
            <IconButton color='inherit'>
              <SettingsIcon />
            </IconButton>
            <IconButton color='inherit' onClick={toggleMode}>
              {isDark ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Box>
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
                width: '100%',
                p: 1.5,
                borderRadius: 2,
                cursor: 'pointer',
                justifyContent: isExpanded ? 'flex-start' : 'center',
                transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)', '&:hover': { bgcolor: 'rgba(122,158,126,0.18)', transform: 'translateX(2px)' }
              }}>
              {item.icon}
              {isExpanded && (
                <Typography
                  sx={{
                    opacity: isExpanded ? 1 : 0,
                    ml: 1,
                    fontSize: 15,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden'
                  }}>
                  {item.label}
                </Typography>
              )}
            </Box>
          ))}
          <Box sx={{ mt: 'auto', mb: 2, width: '100%' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: isExpanded ? 'flex-start' : 'center',
                p: 1.5,
                borderRadius: 2,
                cursor: 'pointer',
                '&:hover': { bgcolor: 'rgba(79,111,82,0.25)' }
              }}>
              <FeedbackIcon />
              {isExpanded && (
                <Typography sx={{ ml: 2, fontSize: 15, whiteSpace: 'nowrap', overflow: 'hidden' }}>
                  Give Feedback
                </Typography>
              )}
            </Box>
          </Box>
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
)
}

export default App
