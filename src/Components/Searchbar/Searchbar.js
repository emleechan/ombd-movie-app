import React, { useState } from "react";
import { Input, Button, Icon } from 'semantic-ui-react'
import './Searchbar.css';

const ENTER_KEYCODE = 13;

const Searchbar = ({loading, search}) => {
  const [searchValue, setSearchValue] = useState("");
  
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

  const handleEnter = (e) => {
    //constant 13 instead
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
          placeholder='Search Movies...'
          onKeyDown={handleEnter}
          icon='search'
        />
    );
}

export default Searchbar;