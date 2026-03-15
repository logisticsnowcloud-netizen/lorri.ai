import React, { useState } from "react";
import AutoComplete from "../../AutoComplete/AutoComplete";
import classes from "./Searchbar.module.css";
const Searchbar = ({ searchedInput = "", searchLocation }) => {
  const [searchInput, setSearchInput] = useState(
    searchedInput.location ? searchedInput.location.label : ""
  );
  // const [searchedText, setSearchedText] = useState();
  const updateSearchText = (value) => {
    searchLocation(value);
    // setSearchedText(value);
  };
  return (
    <AutoComplete
      onSelect={(value) => updateSearchText(value)}
      onChange={(value) => setSearchInput(value)}
      value={searchInput}
      inputClassName={classes["Autosuggest-input"]}
      placeholder="Search a location, find transporters"
    />
  );
};

export default Searchbar;
