import React, { useState, useContext } from "react";
import { Input } from 'semantic-ui-react'
import { AppContext } from '../../Context/AppContext'
import { searchMovies } from '../../Services/OmdbApis'

import './Searchbar.css';

const ENTER_KEYCODE = 13;

const Searchbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [state, setState] = useContext(AppContext);
  const { loading } = state;
  
  const callSearchFunc = (e) => {
    e.preventDefault();
    search(searchValue);
    resetInputField();
  }

  const search = async (searchValue) => {
    setState(state => ({ ...state, loading: true }));
    const moviesRes =  await searchMovies(searchValue);
    setState(state => ({ ...state, loading: false }));
    if(moviesRes instanceof Error){
      setState(state => ({ ...state, errorMessage: moviesRes.toString()}));
    }
    else if (moviesRes.Response === "True") {
        setState(state => ({ ...state, movies: moviesRes.Search}));
        setState(state => ({ ...state, errorMessage: ''}));
    } else {
        setState(state => ({ ...state, errorMessage: moviesRes.Error}));
    }
  }

  const resetInputField = () => {
    setSearchValue("");
  }

  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
  }

  const handleEnter = (e) => {
    if (e.keyCode === ENTER_KEYCODE) {
      setSearchValue(e.target.value);
      callSearchFunc(e);
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