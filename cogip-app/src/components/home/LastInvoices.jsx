import React, { useState, useEffect } from "react";
import { fetchInvoices } from '../../services/Api';
import LatestTable from '../LatestTable';

function LatestInvoices() {
  const [latestInvoices, setLatestInvoices] = useState([]);

  useEffect(() => {
    const getInvoices = async () => {
      try {
        const data = await fetchInvoices();
        setLatestInvoices(data.slice(-5));
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };
    getInvoices();
  }, []);

  const columns = [
    { key: 'reference', label: 'Reference' },
    { key: 'due_date', label: 'Due Date' },
    { key: 'companyName', label: 'Company Name' },
    { key: 'createdAt', label: 'Created at' },
  ];

  return <LatestTable title="Last Invoices" data={latestInvoices} columns={columns} />;
}

export default LatestInvoices;
