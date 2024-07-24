import React, { useState, useEffect } from "react";
import { fetchCompanies } from '../../services/Api';

function LatestCompaniesTable() {
  const [latestCompanies, setLatestCompanies] = useState([]);

  useEffect(() => {
    const getContacts = async () => {
      try {
        const data = await fetchCompanies();
        setLatestCompanies(data.slice(-5));
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };
    getContacts();
  }, []);

  return (
    <div className="flex flex-col mx-36 relative">
      <h2 className="font-Inter font-black text-4xl">Last Companies</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>TVA</th>
            <th>Country</th>
            <th>Type</th>
            <th>Created at</th>
          </tr>
        </thead>
        <tbody>
          {latestCompanies.map((company, index) => (
            <tr key={index}>
              <td>{company.name}</td>
              <td>{company.tva}</td>
              <td>{company.country}</td>
              <td>{company.typeName}</td>
              <td>{company.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LatestCompaniesTable;
