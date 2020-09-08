import React, { useContext } from "react";
import { Icon } from 'semantic-ui-react'
import { AppContext } from '../../Context/AppContext'
import './Nomination.css';

const Nomination = ({ movie }) => {
  const [state, setState] = useContext(AppContext);
  const { nominations } = state;

  const deleteNomination = (imdbID) => {
      const newNomination = nominations.filter(movie => movie.imdbID !== imdbID);
      setState(state => ({ ...state, nominations: newNomination}));
      localStorage.setItem("localStorage", JSON.stringify(newNomination));
  };

  const callDeleteFunc = (e) => {
    e.preventDefault();
    deleteNomination(movie.imdbID);
  }

  return (
    <div className="nomination">
        <div>
          <h4 id="fonts" className='nomination-header'>{movie.Title}</h4>
          <div id="fonts" className='nomination-year'>({movie.Year})</div>
        </div>
          <Icon link name='close' onClick={callDeleteFunc} color='grey'/>
    </div>
  );
};

export default Nomination;