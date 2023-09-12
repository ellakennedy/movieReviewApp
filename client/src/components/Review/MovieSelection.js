import React from 'react';
import { FormControl, Select, MenuItem, InputLabel, Typography } from '@mui/material';

const MovieSelection = ({movies, selectedMovie, onChange, error }) => {
  //Movie Selection drop down
  return (
    
    <FormControl error={Boolean(error)} sx={{ width: '80ch' }} style={{ textAlign: 'left' }}>
      <InputLabel id="movie-label"  >
        Select a movie
      </InputLabel>
      
      <Select labelId="movie-label" value={selectedMovie} onChange={onChange}>
        {movies.map((movie) => (
          <MenuItem key={movie.id} value={movie.id}>
            {movie.name}
          </MenuItem>
        ))}
      </Select>
      
      {error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}
    </FormControl>
  );
};

export default MovieSelection;