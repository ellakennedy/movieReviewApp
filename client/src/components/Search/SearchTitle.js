import React from 'react';
import { FormControl, Select, MenuItem, InputLabel, Typography, TextField } from '@mui/material';

const SearchTitle = ({title, onChange}) => {
 
  return (
    <TextField
      id="outlined-basic"
      label="Enter a Movie Title"
      value={title}
      onChange = {onChange}
      sx={{ width: '40ch' }}
      rows ={1}
    />
  )
};

export default SearchTitle;