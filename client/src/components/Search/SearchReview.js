import React, { useState } from 'react';
import { Typography, Grid, Button } from '@mui/material';
import SearchTitle from './SearchTitle';
import SearchActor from './SearchActor';
import SearchDirector from './SearchDirector';

const SearchReview = () => {
  const [title, setTitle] = useState('');
  const [actor, setActor] = useState('');
  const [director, setDirector] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleActorChange = (event) => {
    setActor(event.target.value);
  };

  const handleDirectorChange = (event) => {
    setDirector(event.target.value);
  };

  const handleSearch = () => {
    const reviewData = {
      title: title,
      actor: actor,
      director: director,
    };

    fetch('/api/loadReviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    })
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data);
      })
      .catch((error) => {
        console.error('Error loading reviews:', error);
      });
  };

  return (
    <div style={{ textAlign: 'center', paddingTop: '20px', maxWidth: '1400px', margin: 'auto' }}>
        <Typography variant="h3" color="primary" style={{ fontWeight: 'bold' }}>
          Search for a Movie Review
        </Typography>
        <Typography variant="h6" color="secondary" noWrap style={{ fontWeight: 'bold', marginBottom: '20px'}}>
          Fill in the Fields below to filter Movie reviews
        </Typography>
        <Grid container spacing={2} alignItems="center" justify="center">
          <Grid item xs={12} sm={4}>
            <SearchTitle title={title} onChange={handleTitleChange} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <SearchActor actor={actor} onChange={handleActorChange} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <SearchDirector director={director} onChange={handleDirectorChange} />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleSearch} sx={{ width: '40ch' }}>
              Search
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="flex-start" direction="column" margin = "20px">
          {searchResults.map((movie, index) => (
            <Grid item xs={12} key={index} style={{ textAlign: 'left' }}>
              <Typography variant="h5" color="primary">
                Movie: {movie.name}
              </Typography>
              <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginTop: '8px' }}>
                Director: {movie.director_name}
              </Typography>
              <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                Average Review Score: {movie.average_review_score}/5
              </Typography>
              <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                Reviews:
              </Typography>
              {movie.reviewContent.map((review, reviewIndex) => (
                <Typography key={reviewIndex} variant="body1">
                  - {review}
                </Typography>
              ))}
            </Grid>
          ))}
        </Grid>
      </div>
  );
};

export default SearchReview;