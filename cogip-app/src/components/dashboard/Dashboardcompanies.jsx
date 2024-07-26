import React from 'react';

function DashboardCompanies() {
  return (
    <div>
      <p>dashboard/new-company</p>
      <form className="bg-white p-6 rounded">
        <h2 className="text-2xl font-bold mb-4 flex items-center justify-center">New company</h2>
        <div className="mb-4">
          <input
            placeholder='Company name'
            type="text"
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <input
            placeholder='TVA'
            type="text"
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <input className="mt-1 p-2 w-full border border-gray-300 rounded" placeholder='Country' type="text" id="country" name="country" />
        </div>
        <div className="mb-4">
          <input
            placeholder='Type'
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

export default DashboardCompanies;
