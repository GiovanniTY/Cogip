import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import Pagination from '../components/Pagination';

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
      fetch('http://localhost/cogip/contacts/')
          .then(response => response.json())
          .then(data => {
              console.log('Fetched data:', data);
              const formattedData = data.map(contact => ({
                  id: contact.id,
                  name: contact.name,
                  phone: contact.phone,
                  mail: contact.email,
                  company: contact.company_id,
                  createdAt: contact.created_at
              }));
              setContacts(formattedData);
              setSearchResults(formattedData);
          })
          .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSearch = (query) => {
      console.log('Search query:', query);
      const results = contacts.filter(
          (contact) =>
              contact.name.toLowerCase().includes(query.toLowerCase()) ||
              contact.mail.toLowerCase().includes(query.toLowerCase()) ||
              contact.company.toString().toLowerCase().includes(query.toLowerCase())
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
    <>
        <h2 className="font-Inter font-black text-4xl">All contacts</h2>
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
    </>
  );
}

export default Contacts;
