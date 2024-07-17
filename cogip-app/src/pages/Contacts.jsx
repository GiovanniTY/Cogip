import React, {useState} from "react";
import Search from "../components/Search";
import Pagination from '../components/Pagination';

const contactsData = [
  {
    "name": "Peter Gregory",
    "phone": "555-4567",
    "mail": "peter.gregory@raviga.com",
    "company": "Raviga",
    "createdAt": "25/09/2020"
  },
  {
    "name": "Cameron How",
    "phone": "555-8765",
    "mail": "cam.how@mutiny.net",
    "company": "Mutiny",
    "createdAt": "25/09/2020"
  },
  {
    "name": "Gavin Belson",
    "phone": "555-6354",
    "mail": "gavin@hooli.com",
    "company": "Hooli",
    "createdAt": "25/09/2020"
  },
  {
    "name": "Jian Yang",
    "phone": "555-8765",
    "mail": "jian.yan@phoque.off",
    "company": "Phoque Off",
    "createdAt": "25/09/2020"
  },
  {
    "name": "Bertram Gilfoyle",
    "phone": "555-5434",
    "mail": "gilfoy@piedpiper.com",
    "company": "Pied Piper",
    "createdAt": "25/09/2020"
  },
  {
    "name": "Peter Gregory",
    "phone": "555-4567",
    "mail": "peter.gregory@raviga.com",
    "company": "Raviga",
    "createdAt": "25/09/2020"
  },
  {
    "name": "Cameron How",
    "phone": "555-8765",
    "mail": "cam.how@mutiny.net",
    "company": "Mutiny",
    "createdAt": "25/09/2020"
  },
  {
    "name": "Gavin Belson",
    "phone": "555-6354",
    "mail": "gavin@hooli.com",
    "company": "Hooli",
    "createdAt": "25/09/2020"
  },
  {
    "name": "Jian Yang",
    "phone": "555-8765",
    "mail": "jian.yan@phoque.off",
    "company": "Phoque Off",
    "createdAt": "25/09/2020"
  },
  {
    "name": "Bertram Gilfoyle",
    "phone": "555-5434",
    "mail": "gilfoy@piedpiper.com",
    "company": "Pied Piper",
    "createdAt": "25/09/2020"
  }
];
function Contacts() {
    const [searchResults, setSearchResults] = useState(contactsData);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const handleSearch = (query) => {
        const results = contactsData.filter(
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
          {currentItems.map((contact, index) => (
            <tr key={index}>
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
