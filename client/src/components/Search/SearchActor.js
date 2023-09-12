import React from 'react';
import { FormControl, Select, MenuItem, InputLabel, Typography, TextField } from '@mui/material';

const SearchActor = ({actor, onChange}) => {
 
  return (
    <TextField
      id="outlined-basic"
      label="Enter an Actor's Name"
      value = {actor}
      onChange ={onChange}
      sx={{ width: '40ch' }}
      rows ={1}
    />
  )
};

export default SearchActor;