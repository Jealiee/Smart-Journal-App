import { useState } from 'react'
import { Box, TextField, Button, AppBar, Toolbar, Typography } from '@mui/material'

function App() {
  const [inputText, setInputText] = useState('')

  return (
    
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>

      {/* Topbar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            xxx
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Layout */}
      <Box sx={{ display: 'flex', flex: 1 }}>

        {/* Sidebar */}
        <Box sx={{ width: 120, bgcolor: '#4E4D50', p: 2 }}>
          Sidebar
        </Box>

        <Box
          sx={{
            ml: 2,
            width: '40%',
            maxWidth: 600,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            p: 1
          }}
        >
          <TextField
            label="Write your journal entry!"
            variant="outlined"
            multiline
            minRows={20}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />

          <Box sx={{ mt: 2, alignSelf: 'flex-end' }}>
            <Button
              variant="contained"
              onClick={() => console.log('work in progress...')}
            >
              Submit
            </Button>
          </Box>
        </Box>

      </Box>
    </Box>
  );
}

export default App
