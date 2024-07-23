const BASE_URL = 'http://localhost/cogip';

export const fetchContacts = async () => {
  const response = await fetch(`${BASE_URL}/contacts/`);
  if (!response.ok) {
    throw new Error('Failed to fetch contacts');
  }
  const data = await response.json();
  return data.map(contact => ({
    id: contact.id,
    name: contact.name,
    phone: contact.phone,
    mail: contact.email,
    company: contact.company_id,
    createdAt: contact.created_at,
  }));
};

export const fetchInvoices = async () => {
  const response = await fetch(`${BASE_URL}/invoices/`);
  if (!response.ok) {
    throw new Error('Failed to fetch invoices');
  }
  const data = await response.json();
  return data.map(invoice => ({
    reference: invoice.reference,
    due_date: invoice.due_date,
    companyName: invoice.companyName,
    createdAt: invoice.created_at,
  }));
};

export const fetchCompanies = async () => {
  const response = await fetch(`${BASE_URL}/companies/`);
  if (!response.ok) {
    throw new Error('Failed to fetch companies');
  }
  const data = await response.json();
  return data.map(companie => ({
    id: companie.id,
    name: companie.name,
    typeName: companie.typeName,
    country: companie.country,
    tva: companie.tva,
    createdAt: companie.created_at,
  }));
};
