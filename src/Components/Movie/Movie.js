import React, { useContext } from "react";
import { Segment, Button } from 'semantic-ui-react';
import './Movie.css';
import { AppContext } from '../../Context/AppContext'
import {MAX_NOMINATIONS} from '../../Constants'


const Movie = ({ movie }) => {
  const [state, setState] = useContext(AppContext);
  const { nominations } = state;

  const nominateMovie = (movie) => {
    const newNomination = [...nominations, movie];
    setState(state => ({ ...state, nominations: newNomination}));
    localStorage.setItem("localStorage", JSON.stringify(newNomination));
  };

  const callNominateFunc = (e) => {
    e.preventDefault();
    nominateMovie(movie);
  }

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
            <Button onClick={callNominateFunc} >Nominate</Button> :
            <Button disabled>Nominate</Button> 
        }
      </div>
    </Segment>
  );
};

export default Movie;