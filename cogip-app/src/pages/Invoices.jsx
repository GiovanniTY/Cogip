import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import Pagination from "../components/Pagination";
import { fetchInvoices } from '../services/Api';

function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const getInvoices = async () => {
      try {
        const data = await fetchInvoices();
        setInvoices(data);
        setSearchResults(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getInvoices();
  }, []);

  const handleSearch = (query) => {
    const results = invoices.filter(
      (invoice) =>
        invoice.reference.toLowerCase().includes(query.toLowerCase()) ||
        invoice.companyName.toLowerCase().includes(query.toLowerCase())
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
      <h2 className="font-Inter font-black text-5xl max-w-fit relative h2-underline">
        All invoices
      </h2>
      <Search onSearch={handleSearch} />
      <table>
        <thead>
          <tr>
            <th>Invoice number</th>
            <th>Due date</th>
            <th>Company</th>
            <th>Created at</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((invoice, index) => (
            <tr key={index}>
              <td>{invoice.reference}</td>
              <td>{invoice.due_date}</td>
              <td>{invoice.companyName}</td>
              <td>{invoice.createdAt}</td>
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

export default Invoices;
