import React, { useState, useContext, useCallback } from "react";
import { Input } from 'semantic-ui-react'
import { AppContext } from '../../Context/AppContext'
import { searchMovies } from '../../Services/OmdbApis'
import _ from 'lodash';
import './Searchbar.css';

const ENTER_KEYCODE = 13;
const DEBOUNCE_MS = 300;

const Searchbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [state, setState] = useContext(AppContext);
  const { loading } = state;

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

  const callSearchFunc = (srchVal) => {
    if(srchVal.length === 0){
      resetInputField();
    } else {
      search(srchVal);
    }
  }

  const resetInputField = () => {
    setSearchValue("");
    setState(state => ({ ...state, errorMessage: ''}));
    setState(state => ({ ...state, movies: []}));
  }

  const debouncedSearch = useCallback(_.debounce(nextValue => callSearchFunc(nextValue), DEBOUNCE_MS), []);

  const handleSearchInputChanges = (e) => {
    e.persist();
    const { value: nextValue } = e.target;
    setSearchValue(nextValue);
    debouncedSearch(nextValue);
  }

  const handleEnter = (e) => {
    if (e.keyCode === ENTER_KEYCODE) {
      setSearchValue(e.target.value);
      callSearchFunc(searchValue);
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