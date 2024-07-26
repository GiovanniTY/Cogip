import React, { useState, useEffect } from 'react';
import LatestTable from '../LatestTable';
import { fetchContacts, fetchCompanies, fetchInvoices } from '../../services/Api';

function DashboardHome() {
  const [latestCompanies, setLatestCompanies] = useState([]);
  const [latestContacts, setLatestContacts] = useState([]);
  const [latestInvoices, setLatestInvoices] = useState([]);

  useEffect(() => {
    const getCompanies = async () => {
      try {
        const data = await fetchCompanies();
        setLatestCompanies(data.slice(-5));
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    const getContacts = async () => {
      try {
        const data = await fetchContacts();
        setLatestContacts(data.slice(-5));
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    const getInvoices = async () => {
      try {
        const data = await fetchInvoices();
        setLatestInvoices(data.slice(-5)); // Fetch and store the latest 5 invoices
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };

    getCompanies();
    getContacts();
    getInvoices();
  }, []);

  return (
    <>
      <p>Dashboard/</p>
      <div>
        <div>
          <LatestTable
            title="Last Contacts"
            data={latestContacts}
            columns={[
              { key: 'name', label: 'Name' },
              { key: 'phone', label: 'Phone' },
              { key: 'mail', label: 'Email' },
            ]}
          />
        </div>

        <div>
          <LatestTable
            title="Last Companies"
            data={latestCompanies}
            columns={[
              { key: 'name', label: 'Name' },
              { key: 'tva', label: 'TVA' },
              { key: 'country', label: 'Country' },
            ]}
          />
        </div>

        <div>
          <LatestTable
            title="Last Invoices"
            data={latestInvoices}
            columns={[
              { key: 'reference', label: 'Invoice Number' },
              { key: 'due_date', label: 'Dates' },
              { key: 'companyName', label: 'Company' },
            ]}
          />
        </div>
      </div>
    </>
  );
}

export default DashboardHome;
