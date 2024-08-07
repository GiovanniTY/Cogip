import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchContactById } from '../../services/Api';

function ContactDetail() {
  const { id } = useParams(); // Get the ID from the URL
  const [contact, setContact] = useState(null);

  useEffect(() => {
    const getContact = async () => {
      try {
        const contactData = await fetchContactById(id);
        setContact(contactData);
      } catch (error) {
        console.error('Error fetching contact:', error);
      }
    };
    getContact();
  }, [id]);

  if (!contact) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Contact Detail</h1>
      <p>Name: {contact.name}</p>
      <p>Phone: {contact.phone}</p>
      <p>Email: {contact.mail}</p>
      <p>Company: {contact.company}</p>
      <p>Created At: {contact.createdAt}</p>
    </div>
  );
}

export default ContactDetail;
