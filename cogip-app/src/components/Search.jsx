// src/components/Search.js
import React, { useState } from "react";

function Search({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="self-end max-w-fit font-Inter font-light">
      <input
        className="border rounded-md p-2 text-[#636363]"
        type="text"
        placeholder="Search"
        value={query}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default Search;
