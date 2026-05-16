import { Box, Typography } from '@mui/material';
import Header from './shared/components/Header/Header';

function App() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Typography variant="h1">Hello World</Typography>
    </Box>
  );
}

export default App;
