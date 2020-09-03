import React, { useState } from "react";
import { Input, Button, Icon } from 'semantic-ui-react'
import './Searchbar.css';

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
    if (e.keyCode === 13) {
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