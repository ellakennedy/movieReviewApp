import React, { useState } from 'react';
import { Typography, Grid, Button, Box} from '@mui/material';
import MovieSelection from './MovieSelection';
import ReviewTitle from './ReviewTitle';
import ReviewBody from './ReviewBody';
import ReviewRating from './ReviewRating';

const Review = ({movies, handleSubmit}) => { 

  //stateful movie list & declaring all other states
  const [selectedMovie, setSelectedMovie] = useState('');
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredReview, setEnteredReview] = useState('');
  const [selectedRating, setSelectedRating] = useState('');

  //userID
  const [userID, setUserID] = useState('1');

  //handles errors
  const [errors, setErrors] = useState({});
  //handles checking if the review is submitted without errors
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);
  //handles data from submitted review
  const [submittedReview, setSubmittedReview] = useState(null);

  const handleMovieChange = (event) => {setSelectedMovie(event.target.value);};
  const handleTitleChange = (event) => {setEnteredTitle(event.target.value);};
  const handleReviewChange = (event) => {setEnteredReview(event.target.value);};
  const handleRatingChange = (event) => {setSelectedRating(event.target.value);};


  const handleFormSubmit = () => {const newErrors = {};
  //checks if each component has an error and provide an error message
    if (!selectedMovie) {newErrors.movieError = 'Select your movie';}
    if (!enteredTitle) {newErrors.titleError = 'Enter your review title';}
    if (!enteredReview) {newErrors.reviewError = 'Enter your review';}
    if (!selectedRating) {newErrors.ratingError = 'Select the rating';}

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
        const movie = movies.find((movie) => movie.id === selectedMovie);
        const submittedReview = {
          movie: movie ? movie.name : '',
          title: enteredTitle,
          rating: selectedRating,
          review: enteredReview
        };

        const reviewData = {
          movieID: selectedMovie,
          userID: userID,
          reviewTitle: enteredTitle,
          reviewContent: enteredReview,
          reviewScore: selectedRating
        };
    
        handleSubmit(reviewData);

      //resetting all values
      setSubmittedReview(submittedReview);
      setSelectedMovie('');
      setEnteredTitle('');
      setEnteredReview('');
      setSelectedRating('');
      setIsReviewSubmitted(true);
    };
  };

  return (
    <div style={{ textAlign: 'center', paddingTop: '20px', maxWidth: '1400px', margin: 'auto', paddingBottom: '20px' }}>
      <Grid container spacing={1} alignItems="center" >
        <Grid item xs={12}>
          <Typography variant="h3" color="primary" style={{ fontWeight: 'bold' }}>
            Review a Movie
          </Typography>
        </Grid>

        <Grid item xs={12} style={{ marginTop: '20px' }}>
          <MovieSelection
            movies={movies}
            selectedMovie={selectedMovie}
            onChange={handleMovieChange}
            error={errors.movieError}
            disabled={isReviewSubmitted}
          />
        </Grid>

        <Grid item xs={12} style={{ marginTop: '10px' }}>
          <ReviewTitle
            enteredTitle={enteredTitle}
            onChange={handleTitleChange}
            error={errors.titleError}
            disabled={isReviewSubmitted}
          />
        </Grid>

        <Grid item xs={12} style={{ marginTop: '10px' }}>
          <ReviewRating
            selectedRating={selectedRating}
            onChange={handleRatingChange}
            error={errors.ratingError}
            disabled={isReviewSubmitted}
          />
        </Grid>

        <Grid item xs={12} style={{ marginTop: '10px' }}>
          <ReviewBody
            enteredReview={enteredReview}
            onChange={handleReviewChange}
            error={errors.reviewError}
            disabled={isReviewSubmitted}
          />
        </Grid>

        <Grid item xs={12} style={{ marginTop: '20px' }}>
          <Button
            variant="contained"
            onClick={handleFormSubmit}
            disabled={isReviewSubmitted && !submittedReview}
          >
            Submit Review
          </Button>
        </Grid>

        {submittedReview && (
          <>
            <Grid item xs={12} style={{ marginTop: '20px' }}>
              <Typography variant="h5" component="h5" color="primary">
                Your review has been received
              </Typography>
            </Grid>

            <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6} lg={4} style={{ margin: '10px', textAlign: 'left' }}>
        <Box maxWidth="800px" margin="0 auto">
          <Typography variant="body1">Movie Reviewed: {submittedReview.movie}</Typography>
          <Typography variant="body1">Review Title: {submittedReview.title}</Typography>
          <Typography variant="body1">Rating(1-5): {submittedReview.rating}</Typography>
          <Typography variant="body1">Review: {submittedReview.review}</Typography>
        </Box>
      </Grid>
    </Grid>
          </>
        )}
      </Grid>
    </div>
  );
};

export default Review;
