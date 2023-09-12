import React from 'react';
import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import AppBarComponent from '../AppBar';
import TopMovies from './TopMovies';

const TopPicks = () => {
  const navigate = useNavigate();
  return (
    <div>
        <AppBarComponent />
      <Link
        color="inherit"
        style={{ cursor: "pointer" }}
        onClick={() => navigate('/')}
      >
      </Link>

      <Link
        color="inherit"
        style={{ cursor: "pointer" }}
        onClick={() => navigate('/Search')}
      >
      </Link>

      <Link
        color="inherit"
        style={{ cursor: "pointer" }}
        onClick={() => navigate('/Review')}
      >
      </Link>
      <TopMovies />
    </div>
  )
}

export default TopPicks;
