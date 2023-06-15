import React from "react";
import { FaSearch } from "react-icons/all";
const Search = ({ setSearchTerm }) => {
  //

  return (
    <div className="wrapper">
      <form>
        <input
          type="search"
          placeholder="Search Memories"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="icon">
          <FaSearch className="" />
        </div>
      </form>
    </div>
  );
};

export default Search;
