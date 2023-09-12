import React from 'react';
import { TextField } from '@mui/material';

const ReviewBody = ({ enteredReview, onChange, error }) => {
  //Movie Review Body
  return (
    <TextField
      label="Enter your Review"
      value={enteredReview}
      onChange={onChange}
      error={Boolean(error)}
      helperText={error}
      multiline
      rows={4}
      inputProps={{ maxLength: 200 }}
      sx={{ width: '80ch' }}
    />
  );
};

export default ReviewBody;