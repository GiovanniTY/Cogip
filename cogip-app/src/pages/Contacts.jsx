// Contacts.jsx
import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import Pagination from '../components/Pagination';
import { fetchContacts } from '../services/Api';

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const getContacts = async () => {
      try {
        const data = await fetchContacts();
        setContacts(data);
        setSearchResults(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getContacts();
  }, []);

  const handleSearch = (query) => {
    const results = contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(query.toLowerCase()) ||
        contact.mail.toLowerCase().includes(query.toLowerCase()) ||
        contact.company.toString().toLowerCase().includes(query.toLowerCase())
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
      <h2 className="font-Inter font-black text-5xl max-w-fit relative h2-underline">All contacts</h2>
      <Search onSearch={handleSearch} />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Mail</th>
            <th>Company</th>
            <th>Created at</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.name}</td>
              <td>{contact.phone}</td>
              <td>{contact.mail}</td>
              <td>{contact.company}</td>
              <td>{contact.createdAt}</td>
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

export default Contacts;
