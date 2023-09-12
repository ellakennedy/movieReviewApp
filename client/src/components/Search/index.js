import React from 'react';
import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import AppBarComponent from '../AppBar';
import SearchReview from './SearchReview';

const Search = () => {
  const navigate = useNavigate();
  return (
    <div>
        <AppBarComponent >
      <Typography variant="h3" color="inherit" noWrap>
        This is Search Page
      </Typography>
      <Link
        color="inherit"
        style={{ cursor: "pointer" }}
        onClick={() => navigate('/')}
      >
      </Link>

      <Link
        color="inherit"
        style={{ cursor: "pointer" }}
        onClick={() => navigate('/TopPicks')}
      >
      </Link>

      <Link
        color="inherit"
        style={{ cursor: "pointer" }}
        onClick={() => navigate('/Review')}
      >
      </Link>
      </AppBarComponent >
      <SearchReview/>
    </div>
  )
}

export default Search;
