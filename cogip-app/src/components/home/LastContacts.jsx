import React, { useState, useEffect } from "react";
import { fetchContacts, fetchCompanies } from '../../services/Api';

function LatestContacts() {
  const [latestContacts, setLatestContacts] = useState([]);

  useEffect(() => {
    const getContactsAndCompanies = async () => {
      try {
        const [contactsData, companiesData] = await Promise.all([fetchContacts(), fetchCompanies()]);
        
        // Create a map of company ID to company name
        const companiesMap = companiesData.reduce((map, company) => {
          map[company.id] = company.name;
          return map;
        }, {});

        // Map company IDs to company names in contacts
        const contactsWithCompanyNames = contactsData.map(contact => ({
          ...contact,
          company: companiesMap[contact.company] || 'Unknown'
        }));

        setLatestContacts(contactsWithCompanyNames.slice(-5));
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };
    getContactsAndCompanies();
  }, []);

  return (
    <div className="flex flex-col mx-36 relative">
      <h2 className="font-Inter font-black text-4xl">Last Contacts</h2>
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
          {latestContacts.map((contact) => (
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
    </div>
  );
}

export default LatestContacts;
