import React from "react";
import { Button, Icon } from 'semantic-ui-react'

const Nomination = ({ movie,  deleteNomination }) => {

  const callDeleteFunction = (e) => {
    e.preventDefault();
    deleteNomination(movie.imdbID);
  }

  return (
    <div className="movie">
        <h2>{movie.Title}</h2>
        <p>({movie.Year})</p>
        <Button icon onClick={callDeleteFunction}>
          <Icon name='delete' />
        </Button>
    </div>
    
  );
};

export default Nomination;