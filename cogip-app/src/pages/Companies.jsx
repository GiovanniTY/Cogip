import React, { useState, useEffect } from 'react';
import Search from '../components/Search';
import Pagination from '../components/Pagination';

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    fetch('http://localhost/cogip/companies/')
        .then(response => response.json())
        .then(data => {
            console.log('Fetched data:', data);
            const formattedData = data.map(companie => ({
                id: companie.id,
                name: companie.name,
                typeName: companie.typeName,
                country: companie.country,
                tva: companie.tva,
                createdAt: companie.created_at
            }));
            setCompanies(formattedData);
            setSearchResults(formattedData);
        })
        .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSearch = (query) => {
    console.log('Search query:', query);
    const results = companies.filter(
      (company) =>
        company.name.toLowerCase().includes(query.toLowerCase()) ||
        company.country.toString().toLowerCase().includes(query.toLowerCase())
    );
    console.log('Search results:', results);
    setSearchResults(results);
    setCurrentPage(1); 
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = searchResults.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(searchResults.length / itemsPerPage);

  return (
    <div>
      <h1 className="font-Inter font-black text-4xl">All companies</h1>
      <Search onSearch={handleSearch} />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>TVA</th>
            <th>Country</th>
            <th>Type</th>
            <th>Created at</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((company, index) => (
            <tr key={index}>
              <td>{company.name}</td>
              <td>{company.tva}</td>
              <td>{company.country}</td>
              <td>{company.typeName}</td>
              <td>{company.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default Companies;
