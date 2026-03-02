import { useState } from 'react'
import { Box, TextField, Button } from '@mui/material'

function App() {
  const [inputText, setInputText] = useState('')

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>

      {/*Sidebar placeholder*/}
      <Box sx={{ width: 120, bgcolor: 'grey' }}>
        Sidebar
      </Box>

      <Box sx={{ ml: 2, width: '40%', maxWidth:600, display: 'flex', flexDirection: 'column', height: '100%', p:1 }}>
        <TextField
          label="Write your journal entry!"
          variant='outlined'
          multiline
          minRows={20}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <Box sx={{mt: 2, alignSelf:'flex-end'}}>
          <Button
            variant="contained"
            onClick={() => console.log('work in progress...')}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default App
