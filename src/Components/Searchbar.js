import React, { useState } from "react";
import { Input, Button, Icon } from 'semantic-ui-react'
import './Searchbar.css';

const Searchbar = (props) => {
  const [searchValue, setSearchValue] = useState("");
  
  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
  }

  const resetInputField = () => {
    setSearchValue("")
  }

  const callSearchFunction = (e) => {
    e.preventDefault();
    props.search(searchValue);
    resetInputField();
  }

  return (
        <Input
          className='search'
          value={searchValue}
          onChange={handleSearchInputChanges}
          size='huge' 
          type="text"
          placeholder='Search Movies...'
          action={
            <Button icon onClick={callSearchFunction} type="submit" value="SEARCH" >
              <Icon name='search' />
           </Button>
        }
        />
    );
}

export default Searchbar;