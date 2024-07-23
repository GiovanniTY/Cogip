// Companies.jsx
import React, { useState, useEffect } from 'react';
import Search from '../components/Search';
import Pagination from '../components/Pagination';
import { fetchCompanies } from '../services/Api';

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const getCompanies = async () => {
      try {
        const data = await fetchCompanies();
        setCompanies(data);
        setSearchResults(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getCompanies();
  }, []);

  const handleSearch = (query) => {
    const results = companies.filter(
      (company) =>
        company.name.toLowerCase().includes(query.toLowerCase()) ||
        company.country.toString().toLowerCase().includes(query.toLowerCase())
    );
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
    <div className="flex flex-col mx-36 relative">
      <h2 className="font-Inter font-black text-5xl max-w-fit relative h2-underline">All companies</h2>
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
