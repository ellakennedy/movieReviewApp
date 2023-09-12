import React from 'react';
import { Typography, Grid, Button} from '@mui/material';


const serverURL = ""; // Replace this with the actual URL of your server

const TopMovies = () => {
  const [topRatedMovies, setTopRatedMovies] = React.useState([]);

  React.useEffect(() => {
    getTopRatedMovies().then((data) => {
      setTopRatedMovies(data.map((movie) => ({ ...movie, voted: false, voteMessage: '' })));
    });
  }, []);


  const getTopRatedMovies = () => {
    return fetch('/api/getTopRatedMovies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error fetching top-rated movies:', error);
        return [];
      });
  };


  const positiveReviews = (movie) => {
    const percentage = (movie.trailer_rating / movie.voteCount) * 100;
    return percentage.toFixed(2);
  };

  const negativeReviews = (movie) => {
    const percentage = 100 - positiveReviews(movie);
    return percentage.toFixed(2);
  };

  const handleVote = (movie_id, voteType) => {
    setTopRatedMovies((prevMovies) =>
      prevMovies.map((movie) => {
        if (movie.id === movie_id && !movie.voted) {
          const updatedMovie = {
            ...movie,
            trailer_rating: movie.trailer_rating + (voteType === 'up' ? 1 : 0),
            voteCount: movie.voteCount + 1,
            voted: true,
            voteMessage: 'Thank you for voting!',
          };
          updateMovieVotes(movie_id, updatedMovie.trailer_rating, updatedMovie.voteCount)
            .then((response) => {
              console.log('Response from server:', response);
              return updatedMovie;
            })
            .catch((error) => {
              console.error('Error updating movie votes:', error);
              updatedMovie.voteMessage = 'Vote update failed. Please try again.';
              return updatedMovie; 
            });
          return updatedMovie;
        }
        return movie;
      })
    );
  };


  const updateMovieVotes = (movie_id, trailerRating, voteCount) => {
    const updatedMovieData = {
      movie_id: movie_id,
      trailer_rating: trailerRating,
      voteCount: voteCount,
    };

    console.log('Received data:', updatedMovieData);

    return fetch(serverURL + '/api/updateMovieVotes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedMovieData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Movie votes updated successfully');
        return data; // Return the response from the server
      })
      .catch((error) => {
        console.error('Error updating movie votes:', error);
        throw error;
      });
  };

  

    return (
      <div style={{ margin: '0 auto', maxWidth: '800px' }}>
        <Typography variant="h3" color="primary" style={{ fontWeight: 'bold', textAlign: 'center', marginTop: '20px'}}>
            Top Rated Movies
          </Typography>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {topRatedMovies.map((movie, index) => (
            <React.Fragment key={index}>
              <li style={{ marginBottom: '30px', borderBottom: '1px solid #ccc', paddingBottom: '20px' }}>
                <h3><strong>#{index + 1}: {movie.movie_title}</strong></h3>
                <p>Director(s): {movie.director_names}</p>
                <p>Average Review Score: {movie.average_review_score}</p>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
                  {movie.trailer_url && (
                    <iframe
                      width="800"
                      height="450"
                      src={movie.trailer_url}
                      title={`Trailer for ${movie.movie_title}`}
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  )}
                </div>
                <p style={{ fontSize: '12px' }}>{movie.movie_desc}</p>
                <h4><strong>Movie Trailer Reviews:</strong></h4>
                <Grid container alignItems="center" justifyContent="center" spacing={0} style={{ marginBottom: '10px' }}>
                  <Grid item xs={3}>
                    <Typography variant="h9" color="success"> Positive Reviews: {positiveReviews(movie)}% </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleVote(movie.id, 'up')}
                      size= "small"
                    >
                      Thumbs Up
                    </Button>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="h9" color="success"> Negative Reviews: {negativeReviews(movie)}% </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleVote(movie.id, 'down')}
                      size = "small"
                    >
                      Thumbs Down
                    </Button>
                  </Grid>
                </Grid>
                <Typography variant="subtitle1" color={movie.voteMessage ? 'primary' : 'inherit'} style={{ marginTop: '10px' }}>
                  {movie.voteMessage}
                </Typography>
              </li>
            </React.Fragment>
          ))}
        </ul>
      </div>
    );
  };
  
  export default TopMovies;
  