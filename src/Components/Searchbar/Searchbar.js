import React, { useState, useContext } from "react";
import { Input, Button, Icon } from 'semantic-ui-react'
import { AppContext } from '../../Context/AppContext'
import { searchMovies } from '../../Services/OmdbApis'

import './Searchbar.css';

const ENTER_KEYCODE = 13;

const Searchbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [state, setState] = useContext(AppContext);
  const { movies, loading, nominations, errorMessage } = state;
  
  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
  }

  const resetInputField = () => {
    setSearchValue("")
  }

  const callSearchFunction = (e) => {
    e.preventDefault();
    search(searchValue);
    resetInputField();
  }

  const search = async (searchValue) => {
    setState(state => ({ ...state, loading: true }));
    const jsonResponse =  await searchMovies(searchValue);
    setState(state => ({ ...state, loading: false }));
    if(jsonResponse instanceof Error){
      setState(state => ({ ...state, errorMessage: jsonResponse.toString()}));
    }
    else if (jsonResponse.Response === "True") {
        setState(state => ({ ...state, movies: jsonResponse.Search}));
        setState(state => ({ ...state, errorMessage: ''}));
    } else {
        setState(state => ({ ...state, errorMessage: jsonResponse.Error}));
    }
  }

  const handleEnter = (e) => {
    if (e.keyCode === ENTER_KEYCODE) {
      setSearchValue(e.target.value);
      callSearchFunction(e);
    }
  };

  return (
        <Input
          className='search'
          value={searchValue}
          onChange={handleSearchInputChanges}
          size='huge' 
          type="text"
          loading={loading}
          placeholder='Search Movies to Nominate...'
          onKeyDown={handleEnter}
          icon='search'
        />
    );
}

export default Searchbar;