***Top Picks - MyPage***

This page provides the user with the top-rated movies based on user reviews. The page presents the top 5 movies determined by the average review score. For each movie, the page displays the movie title, director(s), movie trailer, and a description.

Underneath each movie there is the option to give the trailer a thumbs up or a thumbs down. The user can only vote once per render per movie. The percentage changes right when the user votes and a thank you message appears.

The following additional data was incorporated into the database:

1. A new table called `movie_trailer` was created with the following columns:
   - `trailer_id` (INT) - Primary Key
   - `movie_id` (INT) - Foreign Key - linked to `movies.id`
   - `trailer_url` (TEXT) - Link to the movie's trailer
   - `trailer_rating` (INT) - Number of thumbs up reviews
   - `voteCount` (INT) - Total Number of votes for that trailer

2. The movies table was modified to include movie descriptions
   - `movie_desc` (TEXT) - movie description.

The following movies now include the newly added data (trailer_url and movie_desc):

1. Toy Story
2. Rocky
3. Star Wars: Episode V
4. Monsters, Inc
5. Batman Begins
6. Jaws

Currently Monsters, Inc is not in the TopCharts - Give it a 5 star review to see it appear!

Please refer to this page for the latest top picks based on user reviews. Enjoy your movie-watching experience!