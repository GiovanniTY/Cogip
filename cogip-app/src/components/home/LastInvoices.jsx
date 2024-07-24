import React, { useState, useEffect } from "react";
import { fetchInvoices } from '../../services/Api';

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

  return (
    <div className="flex flex-col mx-36 relative">
      <h2 className="font-Inter font-black text-4xl">Last Invoices</h2>
      <table className="my-8 table-auto text-left font-Roboto font-semibold">
        <thead className="bg-cogip-color">
          <tr>
            <th className="p-2">Invoice number</th>
            <th className="p-2">Due date</th>
            <th className="p-2">Company</th>
            <th className="p-2">Created at</th>
          </tr>
        </thead>
        <tbody>
          {latestInvoices.map((invoice, index) => (
            <tr className="even:bg-[#f5f5f5]" key={index}>
              <td className="p-2">{invoice.reference}</td>
              <td className="p-2">{invoice.due_date}</td>
              <td className="p-2">{invoice.companyName}</td>
              <td className="p-2">{invoice.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LatestInvoices;
