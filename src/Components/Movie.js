import React from "react";
import { Segment, Button } from 'semantic-ui-react';
import './Movie.css';

const Movie = (props) => {
  const { movie, nominate, nominations } = props;

  const nominateMovie = (e) => {
    e.preventDefault();
    nominate(movie);
  }

  return (
    <Segment className="movie">
        <h2>{movie.Title}</h2>
        <p>({movie.Year})</p>
        <img
           width="200"
            alt={`The movie titled: ${movie.Title}`}
            src={movie.Poster}
        />
        {  !nominations.find(nomination => nomination.imdbID === movie.imdbID) && nominations.length < 5 ?
            <Button onClick={nominateMovie} >Nominate</Button> :
            <Button disabled>Nominate</Button> 
        }
    </Segment>
  );
};

export default Movie;