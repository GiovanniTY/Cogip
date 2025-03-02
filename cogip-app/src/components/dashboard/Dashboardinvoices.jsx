import React from 'react';

function DashboardInvoices() {
  return (
    <div>
      <p>dashboard/new-invoice</p>
      <form className="bg-white p-6 rounded">
        <h2 className="text-2xl font-bold mb-4 flex items-center justify-center">New invoice</h2>
        <div className="mb-4">
          <input
            placeholder='Reference'
            type="text"
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <input className="mt-1 p-2 w-full border border-gray-300 rounded" placeholder='Price' type="text" id="price" name="price" />
        </div>
        <div className="mb-4">
          <input
            placeholder='Company name'
            type="text"
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
        </div>
        <button type="submit" className="w-full bg-[#9698D6] text-white p-2 rounded hover:bg-indigo-400">
          Save
        </button>
      </form>
    </div>
  );
};

export default DashboardInvoices;
