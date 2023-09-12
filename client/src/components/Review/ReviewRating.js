import * as React from 'react';
import { RadioGroup, FormControlLabel, Radio, Typography, Box} from '@mui/material';

const ReviewRating = ({ selectedRating, onChange, error }) => {
  //Movie Review Rating Radio Buttons
  return (
    <>
      <Typography variant="body2" style={{ fontWeight: 'bold'}} >
        Select a rating (1 = awful ... 5 = Amazing)
      </Typography>

      <Box display="flex" justifyContent="center">
      <RadioGroup row name="rating" value={selectedRating} onChange={onChange}>
        <FormControlLabel value="1" control={<Radio />} label="1" />
        <FormControlLabel value="2" control={<Radio />} label="2" />
        <FormControlLabel value="3" control={<Radio />} label="3" />
        <FormControlLabel value="4" control={<Radio />} label="4" />
        <FormControlLabel value="5" control={<Radio />} label="5" />
      </RadioGroup>
      </Box>
      
      {error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}

    </>

  );
};

export default ReviewRating;
