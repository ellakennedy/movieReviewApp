import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from '../Landing';
import Search from '../Search';
import Review from '../Review';
import TopPicks from '../TopPicks';
import '@fontsource/roboto'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const serverURL = "";

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  palette: {
    type: 'light',
    primary: {
      main: '#880808', // Dark red
    },
    secondary: {
      main: '#faa9a9', // Light red
    },
    background: {
      default: '#f0f0f0', // Light gray
      paper: '#ffffff',   // White
    },
    text: {
      primary: '#333333', // Dark gray for text
      secondary: '#666666', // Lighter gray for secondary text
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          <Routes>
            <Route path="/Review" element={<Review />} />
            <Route path="/TopPicks" element={<TopPicks />} />
            <Route path="/Search" element={<Search />} />
            <Route path="/" element={<Landing />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
