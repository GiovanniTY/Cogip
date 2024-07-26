import React, { useState, useEffect } from 'react';
import LatestTable from '../LatestTable';
import { fetchContacts, fetchCompanies, fetchInvoices } from '../../services/Api';

function DashboardHome() {
  const [latestCompanies, setLatestCompanies] = useState([]);
  const [totalContacts, setTotalContacts] = useState(0);
  const [totalInvoices, setTotalInvoices] = useState(0);
  const [totalCompanies, setTotalCompanies] = useState(0);
  const [latestContacts, setLatestContacts] = useState([]);
  const [latestInvoices, setLatestInvoices] = useState([]);

  useEffect(() => {
    const getCompanies = async () => {
      try {
        const data = await fetchCompanies();
        setTotalCompanies(data.length); 
        setLatestCompanies(data.slice(-5));
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    const getContacts = async () => {
      try {
        const data = await fetchContacts();
        setTotalContacts(data.length); 
        setLatestContacts(data.slice(-5)); 
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    const getInvoices = async () => {
      try {
        const data = await fetchInvoices();
        setTotalInvoices(data.length); 
        setLatestInvoices(data.slice(-5));
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
      <div className='font-Inter font-semibold bg-white rounded-xl my-6'>
        <h2 className='pt-2 mx-6 text-xl'>Statistics</h2>
        <div className='flex text-bold justify-around p-6'>
          <h3 className='stat-circle bg-violet-700'>{totalInvoices}<br/>Invoices</h3>
          <h3 className='stat-circle bg-violet-400'>{totalContacts}<br/>Contacts</h3>
          <h3 className='stat-circle bg-red-300'>{totalCompanies}<br/>Companies</h3>
        </div>
      </div>
      <div className='dashboard'>
        <div className='dashboardDiv'>
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

        <div className='dashboardDiv'>
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

        <div className='dashboardDiv'>
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
