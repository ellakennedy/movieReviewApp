import mysql from 'mysql';
import config from './config.js';
import fetch from 'node-fetch';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import response from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));

app.post('/api/getMovies', (req, res) => {
	let connection = mysql.createConnection(config);
	
	let sql = `SELECT * from movies`;
	console.log(sql);
	
	let data = [];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		console.log(results);
		let string = JSON.stringify(results);
		let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/addReview', (req, res) => {
	const {movieID, userID, reviewTitle, reviewContent, reviewScore} = req.body;
	let connection = mysql.createConnection(config);
  
	const sql = 'INSERT INTO review (movieID, userID, reviewTitle, reviewContent, reviewScore) VALUES (?, ?, ?, ?, ?)';
  	const data = [movieID, userID, reviewTitle, reviewContent, reviewScore];
  
	connection.query(sql, data, (error, results) => {
	  if (error) {
		console.error(error.message);
		res.status(500).send('Error adding review to the database.');
	  } else {
		console.log(results);
		res.status(200).send('Review added successfully.');
	  }
	});
	connection.end();
  });
  

app.post('/api/loadUserSettings', (req, res) => {
	let connection = mysql.createConnection(config);
	let userID = req.body.userID;

	let sql = `SELECT mode FROM user WHERE userID = ?`;
	console.log(sql);
	
	let data = [userID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/loadReviews', (req, res) => {
	const connection = mysql.createConnection(config);
	const title = req.body.title;
	const actor = req.body.actor;
	const director = req.body.director;
  
	// Construct the base SQL query
	let sql = `
	  SELECT m.name,
			 CONCAT(d.first_name, " ", d.last_name) AS director_name,
			 GROUP_CONCAT(DISTINCT CONCAT(a.first_name, " ", a.last_name) SEPARATOR ', ') AS actor_names,
			 r.reviewContent,
			 avg_review_score.average_review_score
	  FROM movies m
	  JOIN movies_directors md ON md.movie_id = m.id
	  JOIN directors d ON d.id = md.director_id
	  JOIN review r ON r.movieID = m.id
	  LEFT JOIN roles ro ON ro.movie_id = m.id
	  LEFT JOIN actors a ON a.id = ro.actor_id
	  JOIN (
		SELECT movieID, AVG(reviewScore) AS average_review_score
		FROM review
		GROUP BY movieID
	  ) avg_review_score ON avg_review_score.movieID = m.id
	`;
  
	const whereConditions = [];
  
	// Add conditions for each search criteria if it's provided
	if (title) {
	  whereConditions.push(`m.name LIKE '%${title}%'`);
	}
	if (actor) {
	  whereConditions.push(`CONCAT(a.first_name, " ", a.last_name) LIKE '%${actor}%'`);
	}
	if (director) {
	  whereConditions.push(`CONCAT(d.first_name, " ", d.last_name) LIKE '%${director}%'`);
	}
  
	// If there are any conditions, join them with AND and append to the base SQL query
	if (whereConditions.length > 0) {
	  sql += ` WHERE ${whereConditions.join(' AND ')}`;
	}
  
	// Group the results by movie and director
	sql += ` GROUP BY m.id, m.name, director_name, r.reviewContent, avg_review_score.average_review_score`;
  
	connection.query(sql, (error, results, fields) => {
	  if (error) {
		return console.error(error.message);
	  }
  
	  const movieReviews = {};
	  results.forEach((movie) => {
		const { name, director_name, actor_names, average_review_score, reviewContent } = movie;
		const key = `${name}_${director_name}`;
		if (!movieReviews[key]) {
		  movieReviews[key] = {
			name: name,
			director_name: director_name,
			actor_names: actor_names,
			average_review_score: average_review_score,
			reviewContent: [],
		  };
		}
		movieReviews[key].reviewContent.push(reviewContent);
	  });
  
	  // Send the organized data as response
	  res.send(Object.values(movieReviews));
	});
  
	connection.end();
  });
  
  app.post('/api/getTopRatedMovies', (req, res) => {
	let connection = mysql.createConnection(config);
	let sql = `
	  SELECT
		m.id AS id,    -- Include the movie_id field
		m.name AS movie_title,
		GROUP_CONCAT(CONCAT(d.first_name, " ", d.last_name)) AS director_names,
		AVG(r.reviewScore) AS average_review_score,
		mt.trailer_url,
		m.movie_desc,
		mt.trailer_rating,
		mt.voteCount
	  FROM
		movies m
		JOIN movies_directors md ON md.movie_id = m.id
		JOIN directors d ON d.id = md.director_id
		JOIN review r ON r.movieID = m.id
		JOIN movie_trailer mt ON mt.movie_id = m.id
	  GROUP BY
		m.id, mt.trailer_url, mt.trailer_rating, mt.voteCount, mt.trailer_rating, mt.voteCount
	  ORDER BY
		average_review_score DESC
	  LIMIT 5;`;
			
	connection.query(sql,(error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		const topMovies = [];
	  results.forEach((movie) => {
		const {id, movie_title, director_names, average_review_score, trailer_url, movie_desc, trailer_rating, voteCount} = movie;
      	const key = `${movie_title}_${director_names}`;
      	if (!topMovies[key]) {
        	topMovies[key] = {
			id: id,
			movie_title: movie_title,
			director_names: director_names,
			average_review_score: average_review_score,
			trailer_url: trailer_url,
			movie_desc: movie_desc,
			trailer_rating: trailer_rating,
			voteCount: voteCount,
        	};
      	}
	  });
  
	  res.send(Object.values(topMovies));
	});
	connection.end();
});

app.post('/api/updateMovieVotes', (req, res) => {
	console.log('Request Body:', req.body);
	let connection = mysql.createConnection(config);
	const { movie_id, trailer_rating, voteCount } = req.body;
  
	// Update the movie data in the database
	const sql = `UPDATE movie_trailer SET trailer_rating = ?, voteCount = ? WHERE movie_id = ?`;
	const values = [trailer_rating, voteCount, movie_id];
  
	connection.query(sql, values, (error, result) => {
	  if (error) {
		console.error('Error updating movie votes in the database:', error);
		res.status(500).json({ error: 'Error updating movie votes' });
	  } else {
		console.log('Movie votes updated successfully');
		console.log('Received data:', { movie_id, trailer_rating, voteCount });
		res.status(200).json({ success: true });
	  }
	});
	connection.end();
  });
  
app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '172.31.31.77'); //for the deployed version, specify the IP address of the server