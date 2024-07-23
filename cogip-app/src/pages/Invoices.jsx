import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import Pagination from "../components/Pagination";
import '../index.css';

function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    fetch('http://localhost/cogip/invoices/')
        .then(response => response.json())
        .then(data => {
            console.log('Fetched data:', data);
            const formattedData = data.map(invoice => ({
                reference: invoice.reference,
                due_date: invoice.due_date,
                companyName: invoice.companyName,
                createdAt: invoice.created_at
            }));
            setInvoices(formattedData);
            setSearchResults(formattedData);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
  }, []);

  const handleSearch = (query) => {
    console.log('Search query:', query);
    const results = invoices.filter(
        (invoice) =>
            invoice.reference.toLowerCase().includes(query.toLowerCase()) ||
            invoice.companyName.toLowerCase().includes(query.toLowerCase())
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
    <div className="flex flex-col mx-36 relative">
      <h2 className="font-Inter font-black text-5xl max-w-fit relative h2-underline">
        All invoices
      </h2>
      <Search onSearch={handleSearch} />
      <table className="my-8 table-auto text-left font-Roboto font-semibold">
        <thead className="bg-cogip-color">
          <tr>
            <th className="p-2">Invoice number</th>
            <th className="p-2">Due date</th>
            <th className="p-2">Company</th>
            <th className="p-2">Created at</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((invoice, index) => (
            <tr className="even:bg-[#f5f5f5]" key={index}>
              <td className="p-2">{invoice.reference}</td>
              <td className="p-2">{invoice.due_date}</td>
              <td className="p-2">{invoice.companyName}</td>
              <td className="p-2">{invoice.createdAt}</td>
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
};

export default Invoices;
