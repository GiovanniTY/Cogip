// src/components/Search.js
import React, { useState } from 'react';

function Search({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div>
      <div>
        <input
          className="border rounded"
          type="text"
          placeholder="Search"
          value={query}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}

export default Search;
