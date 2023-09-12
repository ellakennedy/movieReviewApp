import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const AppBarComponent = () => {
  const location = useLocation();

  const isLinkDisabled = (path) => {
    return location.pathname === path;
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}> Popcorn Wars </Typography>
        <Link
          component={RouterLink}
          to="/"
          color="inherit"
          underline="none"
          sx={{
            mr: 3,
            pointerEvents: isLinkDisabled('/') ? 'none' : 'auto',
            opacity: isLinkDisabled('/') ? 0.5 : 1,
            cursor: isLinkDisabled('/') ? 'not-allowed' : 'pointer',
          }}
        >
          Landing
        </Link>
        <Link
          component={RouterLink}
          to="/Search"
          color="inherit"
          underline="none"
          sx={{
            mr: 3,
            pointerEvents: isLinkDisabled('/Search') ? 'none' : 'auto',
            opacity: isLinkDisabled('/Search') ? 0.5 : 1,
            cursor: isLinkDisabled('/Search') ? 'not-allowed' : 'pointer',
          }}
        >
          Search
        </Link>
        <Link
          component={RouterLink}
          to="/TopPicks"
          color="inherit"
          underline="none"
          sx={{
            mr: 3,
            pointerEvents: isLinkDisabled('/TopPicks') ? 'none' : 'auto',
            opacity: isLinkDisabled('/TopPicks') ? 0.5 : 1,
            cursor: isLinkDisabled('/TopPicks') ? 'not-allowed' : 'pointer',
          }}
        >
          Top Picks
        </Link>
        <Link
          component={RouterLink}
          to="/Review"
          color="inherit"
          underline="none"
          sx={{
            pointerEvents: isLinkDisabled('/Review') ? 'none' : 'auto',
            opacity: isLinkDisabled('/Review') ? 0.5 : 1,
            cursor: isLinkDisabled('/Review') ? 'not-allowed' : 'pointer',
          }}
        >
          Review
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
