import React, { useState, useEffect } from 'react';

const sampleContacts = [
  { Name: "Peter Gregory", Phone: "555-4567", Mail: "peter.gregory@raviga.com", Company: "Raviga", "Created at": "25/09/2020" },
  { Name: "Cameron How", Phone: "555-8765", Mail: "cam.how@mutiny.net", Company: "Mutiny", "Created at": "25/09/2020" },
  { Name: "Gavin Belson", Phone: "555-6354", Mail: "gavin@hooli.com", Company: "Hooli", "Created at": "25/09/2020" },
  { Name: "Jian Yang", Phone: "555-8765", Mail: "jian.yan@phoque.off", Company: "Phoque Off", "Created at": "25/09/2020" },
  { Name: "Bertram Gilfoyle", Phone: "555-5434", Mail: "gilfoy@piedpiper.com", Company: "Pied Piper", "Created at": "25/09/2020" }
];

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage] = useState(5);

  useEffect(() => {
    setContacts(sampleContacts);
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.Phone.includes(searchTerm) ||
    contact.Mail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.Company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = filteredContacts.slice(indexOfFirstContact, indexOfLastContact);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Phone</th>
            <th className="py-2 px-4 border-b">Mail</th>
            <th className="py-2 px-4 border-b">Company</th>
            <th className="py-2 px-4 border-b">Created at</th>
          </tr>
        </thead>
        <tbody>
          {currentContacts.map((contact, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{contact.Name}</td>
              <td className="py-2 px-4 border-b">{contact.Phone}</td>
              <td className="py-2 px-4 border-b">{contact.Mail}</td>
              <td className="py-2 px-4 border-b">{contact.Company}</td>
              <td className="py-2 px-4 border-b">{contact["Created at"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        contactsPerPage={contactsPerPage}
        totalContacts={filteredContacts.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

const Pagination = ({ contactsPerPage, totalContacts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalContacts / contactsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="mt-4">
      <ul className="inline-flex -space-x-px">
        {pageNumbers.map(number => (
          <li key={number}>
            <a
              onClick={() => paginate(number)}
              href="#"
              className={`py-2 px-3 leading-tight border ${currentPage === number ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-500 border-gray-300'} hover:bg-gray-200 hover:text-gray-700`}
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Contacts;
