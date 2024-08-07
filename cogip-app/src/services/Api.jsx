const BASE_URL = 'http://localhost/cogip/';

// Fetch all contacts
export const fetchContacts = async () => {
  const response = await fetch(`${BASE_URL}/contacts/`);
  if (!response.ok) {
    throw new Error('Failed to fetch contacts');
  }
  const responseData = await response.json();
  console.log('Contacts data:', responseData);
  if (!Array.isArray(responseData)) {
    console.error('Contacts data is not an array:', responseData);
    throw new Error('Contacts data is not an array');
  }
  return responseData.map(contact => ({
    id: contact.id,
    name: contact.name,
    phone: contact.phone,
    mail: contact.email,
    company: contact.company_id,
    createdAt: contact.created_at,
  }));
};

export const fetchContactById = async (id) => {
  const response = await fetch(`${BASE_URL}/contacts/view/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch contact');
  }
  const contact = await response.json();
  return {
    id: contact.id,
    name: contact.name,
    phone: contact.phone,
    mail: contact.email,
    company: contact.company_id,
    createdAt: contact.created_at,
  };
};

// Fetch all invoices
export const fetchInvoices = async () => {
  const response = await fetch(`${BASE_URL}/invoices/`);
  if (!response.ok) {
    throw new Error('Failed to fetch invoices');
  }
  const responseData = await response.json();
  console.log('Invoices data:', responseData);
  if (!Array.isArray(responseData.data)) {
    console.error('Invoices data is not an array:', responseData);
    throw new Error('Invoices data is not an array');
  }
  return responseData.data.map(invoice => ({
    reference: invoice.reference,
    due_date: invoice.due_date,
    companyName: invoice.companyName,
    createdAt: invoice.created_at,
  }));
};

// Fetch all companies
export const fetchCompanies = async () => {
  const response = await fetch(`${BASE_URL}/companies/`);
  if (!response.ok) {
    throw new Error('Failed to fetch companies');
  }
  const responseData = await response.json();
  console.log('Companies data:', responseData);
  if (!Array.isArray(responseData.data)) {
    console.error('Companies data is not an array:', responseData);
    throw new Error('Companies data is not an array');
  }
  return responseData.data.map(company => ({
    id: company.id,
    name: company.name,
    typeName: company.typeName,
    country: company.country,
    tva: company.tva,
    createdAt: company.created_at,
  }));
};

// Fetch a single company by ID
export const fetchCompanyById = async (id) => {
  const response = await fetch(`${BASE_URL}/companies/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch company');
  }
  const company = await response.json();
  return {
    id: company.id,
    name: company.name,
    typeName: company.typeName,
    country: company.country,
    tva: company.tva,
    createdAt: company.created_at,
  };
};
