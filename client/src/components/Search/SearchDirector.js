import React from 'react';
import { FormControl, Select, MenuItem, InputLabel, Typography, TextField } from '@mui/material';

const SearchDirector = ({director, onChange}) => {
 
  return (
    <TextField
      id="outlined-basic"
      label="Enter a Directors Name"
      value = {director}
      onChange = {onChange}
      sx={{ width: '40ch' }}
      rows ={1}
    />
  )
};

export default SearchDirector;