import React from "react";
import { Button, Icon } from 'semantic-ui-react'
import './Nomination.css';

const Nomination = ({ movie,  deleteNomination }) => {

  const callDeleteFunction = (e) => {
    e.preventDefault();
    deleteNomination(movie.imdbID);
  }

  return (
    <div className="nomination">
        <div>
          <h4 id="fonts" className='nomination-title'>{movie.Title}</h4>
          <div id="fonts" className='nomination-year'>({movie.Year})</div>
        </div>
          <Icon link name='close' onClick={callDeleteFunction} color='grey'/>
    </div>
  );
};

export default Nomination;