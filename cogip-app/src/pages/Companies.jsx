import React, { useState, useEffect } from 'react';
import Search from '../components/Search';
import Pagination from '../components/Pagination';

const companiesData = [
    {
        name: 'Raviga',
        tva: 'US456 654 321',
        country: 'United States',
        type: 'Supplier',
        createdAt: '25/09/2020',
    },
    {
        name: 'Dunder Mifflin',
        tva: 'US676 787 767',
        country: 'United States',
        type: 'Client',
        createdAt: '25/09/2020',
    },
    {
        name: 'Pierre Cailloux',
        tva: 'FR 676 676 676',
        country: 'France',
        type: 'Supplier',
        createdAt: '25/09/2020',
    },
    {
        name: 'Belgalol',
        tva: 'BE0987 876 787',
        country: 'Belgium',
        type: 'Supplier',
        createdAt: '25/09/2020',
    },
    {
        name: 'Jouet Jean-Michel',
        tva: 'FR 787 776 999',
        country: 'France',
        type: 'Client',
        createdAt: '25/09/2020',
    },
    {
        name: 'Raviga',
        tva: 'US456 654 321',
        country: 'United States',
        type: 'Supplier',
        createdAt: '25/09/2020',
    },
    {
        name: 'Dunder Mifflin',
        tva: 'US676 787 767',
        country: 'United States',
        type: 'Client',
        createdAt: '25/09/2020',
    },
    {
        name: 'Pierre Cailloux',
        tva: 'FR 676 676 676',
        country: 'France',
        type: 'Supplier',
        createdAt: '25/09/2020',
    },
    {
        name: 'Belgalol',
        tva: 'BE0987 876 787',
        country: 'Belgium',
        type: 'Supplier',
        createdAt: '25/09/2020',
    },
    {
        name: 'Jouet Jean-Michel',
        tva: 'FR 787 776 999',
        country: 'France',
        type: 'Client',
        createdAt: '25/09/2020',
    },
];

function Companies() {

    const [searchResults, setSearchResults] = useState(companiesData);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const handleSearch = (query) => {
        const results = companiesData.filter(
        (company) =>
            company.name.toLowerCase().includes(query.toLowerCase()) ||
            company.tva.toLowerCase().includes(query.toLowerCase()) ||
            company.country.toLowerCase().includes(query.toLowerCase()) ||
            company.type.toLowerCase().includes(query.toLowerCase())
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
              <td>{company.type}</td>
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
