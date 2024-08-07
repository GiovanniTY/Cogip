import React, { useState, useEffect } from "react";
import { fetchCompanies } from '../../services/Api';
import LatestTable from '../LatestTable';

function LatestCompanies() {
  const [latestCompanies, setLatestCompanies] = useState([]);

  useEffect(() => {
    const getCompanies = async () => {
      try {
        const data = await fetchCompanies();
        setLatestCompanies(data.slice(-5));
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };
    getCompanies();
  }, []);

  const columns = [
    { key: 'name', label: 'Name', link: '/companies' },
    { key: 'tva', label: 'TVA' },
    { key: 'country', label: 'Country' },
    { key: 'typeName', label: 'Type' },
    { key: 'createdAt', label: 'Created at' },
  ];

  return <LatestTable title="Last Companies" data={latestCompanies} columns={columns} />;
}

export default LatestCompanies;