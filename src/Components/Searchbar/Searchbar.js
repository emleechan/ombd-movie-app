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

  const handleEnter = e => {
    if (e.keyCode === 13) {
      setSearchValue(e.target.value);
      console.log("onKeyDown", e.type, e.keyCode)
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
          action={
            !loading && 
            <Button icon onClick={callSearchFunction} type="submit" value="SEARCH" >
              <Icon name='search' />
           </Button>
         }
        />
    );
}

export default Searchbar;