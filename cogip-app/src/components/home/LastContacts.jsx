import React, { useState, useEffect } from "react";
import { fetchContacts, fetchCompanies } from '../../services/Api';
import LatestTable from '../LatestTable';

function LatestContacts() {
  const [latestContacts, setLatestContacts] = useState([]);

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

        setLatestContacts(contactsWithCompanyNames.slice(-5));
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };
    getContactsAndCompanies();
  }, []);

  const columns = [
    { key: 'name', label: 'Name', link: '/contacts' },
    { key: 'phone', label: 'Phone' },
    { key: 'mail', label: 'Mail' },
    { key: 'company', label: 'Company', link: '/companies' },
    { key: 'createdAt', label: 'Created at' },
  ];

  return <LatestTable title="Last Contacts" data={latestContacts} columns={columns} />;
}

export default LatestContacts;