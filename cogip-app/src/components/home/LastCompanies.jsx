import React, { useState, useEffect } from "react";
import { fetchContacts } from '../../services/Api';

function LatestContactsTable() {
  const [latestContacts, setLatestContacts] = useState([]);

  useEffect(() => {
    const getContacts = async () => {
      try {
        const data = await fetchContacts();
        setLatestContacts(data.slice(-5));
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };
    getContacts();
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
          {latestContacts.map(contact => (
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

export default LatestContactsTable;
