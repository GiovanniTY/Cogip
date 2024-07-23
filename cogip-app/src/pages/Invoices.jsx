import React, { useState } from "react";
import Search from "../components/Search";
import Pagination from "../components/Pagination";

const invoicesData = [
  {
    invoiceNumber: "F20220915-001",
    dueDate: "15/09/2022",
    company: "Jouet Jean-Michel",
    createdAt: "25/09/2020",
  },
  {
    invoiceNumber: "F20220915-002",
    dueDate: "15/09/2022",
    company: "Dunder Mifflin",
    createdAt: "25/09/2020",
  },
  {
    invoiceNumber: "F20220915-003",
    dueDate: "15/09/2022",
    company: "Pierre Cailloux",
    createdAt: "25/09/2020",
  },
  {
    invoiceNumber: "F20220915-004",
    dueDate: "15/09/2022",
    company: "Pier Pipper",
    createdAt: "25/09/2020",
  },
  {
    invoiceNumber: "F20220915-005",
    dueDate: "15/09/2022",
    company: "Raviga",
    createdAt: "25/09/2020",
  },
];

const Invoices = () => {
  const [searchResults, setSearchResults] = useState(invoicesData);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const handleSearch = (query) => {
    const results = invoicesData.filter(
      (invoice) =>
        invoice.invoiceNumber.toLowerCase().includes(query.toLowerCase()) ||
        invoice.dueDate.toLowerCase().includes(query.toLowerCase()) ||
        invoice.company.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = searchResults.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const totalPages = Math.ceil(searchResults.length / itemsPerPage);

  return (
    <>
      <div className=" flex flex-col mx-36 relative">
        <h2 className="font-Inter font-black text-5xl max-w-fit relative after:content-[''] after:bg-cogip-color after:mt-10 after:ml-10">
          All invoices
        </h2>
        <Search onSearch={handleSearch} />
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
            {currentItems.map((invoice, index) => (
              <tr className="even:bg-[#f5f5f5]" key={index}>
                <td className="p-2">{invoice.invoiceNumber}</td>
                <td className="p-2">{invoice.dueDate}</td>
                <td className="p-2">{invoice.company}</td>
                <td className="p-2">{invoice.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default Invoices;
