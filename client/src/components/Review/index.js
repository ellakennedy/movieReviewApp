import React from 'react';
import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import AppBarComponent from '../AppBar';
import Review2 from './Review2';

const serverURL = "";

const Review = () => {
  const navigate = useNavigate();

  const [movies, setMovies] = React.useState([]);

  React.useEffect(() => {
    getMovies();
  }, []);

  const getMovies = () => {
    callApiGetMovies()
      .then((res) => {
        console.log("callApiGetMovies returned: ", res);
        var parsed = JSON.parse(res.express);
        console.log("callApiGetMovies parsed: ", parsed);
        setMovies(parsed);
      })
      .catch((error) => {
      console.error(error);
    });
  }; 

  const handleSubmit = (reviewData) => {
    fetch(serverURL + "/api/addReview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Review added successfully:", data);
        })
      .catch((error) => {
        console.error("Error adding review:", error);
      });
    }
  
  const callApiGetMovies = async () => {
    const url = serverURL + "/api/getMovies";
    console.log(url);
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
      
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
      console.log("Movies list: ", body);
    
      return body;
    };

  return (
    <div>
    <AppBarComponent>
      <Link
        color="inherit"
        style={{ cursor: "pointer" }}
        onClick={() => navigate('/')}
      >
      </Link>

      <Link
        color="inherit"
        style={{ cursor: "pointer" }}
        onClick={() => navigate('/Search')}
      >
      </Link>

      <Link
        color="inherit"
        style={{ cursor: "pointer" }}
        onClick={() => navigate('/TopPicks')}
      >
      </Link>
      </AppBarComponent >
      
      <Review2 movies={movies} handleSubmit={handleSubmit}/>
    </div>
  )
}

export default Review;
