import { useState } from 'react'
import { Box, TextField, Button } from '@mui/material'
import './App.css'

function App() {
  const [inputText, setInputText] = useState('')

  return (
    <Box sx={{ p: 2 }}>
      <TextField
        label="Write your journal entry!"
        variant='outlined'
        fullWidth
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          onClick={() => console.log('work in progress...')}>
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default App
