import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Search from "../components/Search";
import Pagination from '../components/Pagination';
import { fetchContacts, fetchCompanies } from '../services/Api';

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const getContactsAndCompanies = async () => {
      try {
        const [contactsData, companiesData] = await Promise.all([fetchContacts(), fetchCompanies()]);
        
        const companiesMap = companiesData.reduce((map, company) => {
          map[company.id] = company.name;
          return map;
        }, {});

        const contactsWithCompanyNames = contactsData.map(contact => ({
          ...contact,
          company: companiesMap[contact.company] || 'Unknown'
        }));

        setContacts(contactsWithCompanyNames);
        setSearchResults(contactsWithCompanyNames);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getContactsAndCompanies();
  }, []);

  const handleSearch = (query) => {
    const results = contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(query.toLowerCase()) ||
        contact.mail.toLowerCase().includes(query.toLowerCase()) ||
        contact.company.toLowerCase().includes(query.toLowerCase())
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
            <th>Details</th> {/* Add a new column for the link */}
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
              <td>
                <Link to={`/contacts/${contact.id}`}>View Details</Link>
              </td>
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
