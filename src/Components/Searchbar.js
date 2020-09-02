import React, { useState } from "react";
import { Input, Button, Icon } from 'semantic-ui-react'


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
      <form className="search">
        <Input
          value={searchValue}
          onChange={handleSearchInputChanges}
          type="text"
        />
        <Button icon onClick={callSearchFunction} type="submit" value="SEARCH" >
          <Icon name='search' />
        </Button>
      </form>
    );
}

export default Searchbar;