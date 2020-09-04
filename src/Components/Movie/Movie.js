import React from "react";
import { Segment, Button } from 'semantic-ui-react';
import './Movie.css';

const MAX_NOMINATIONS = 5

const Movie = ({ movie, nominate, nominations }) => {
  const nominateMovie = (e) => {
    e.preventDefault();
    nominate(movie);
  }

  //make 5 a constant as max movie length
  return (
    <Segment className="movie">
      <div>
        <img
            width="100"
            src={movie.Poster}
        />
      </div>
      <div className='movie-body'> 
        <h2>{movie.Title}</h2>
        <p>({movie.Year})</p>
        {!nominations.find(nomination => nomination.imdbID === movie.imdbID) && nominations.length < MAX_NOMINATIONS ?
            <Button onClick={nominateMovie} >Nominate</Button> :
            <Button disabled>Nominate</Button> 
        }
      </div>
    </Segment>
  );
};

export default Movie;