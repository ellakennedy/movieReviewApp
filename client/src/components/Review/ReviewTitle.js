import React from 'react';
import { TextField } from '@mui/material';

const ReviewTitle = ({ enteredTitle, onChange, error }) => {
  //Movie Review Title
  return (
    <TextField
      id="outlined-basic"
      label="Enter Title of Review"
      value={enteredTitle}
      onChange={onChange}
      error={Boolean(error)}
      helperText={error}
      sx={{ width: '80ch' }}
      rows ={1}
    />
  );
};

export default ReviewTitle;