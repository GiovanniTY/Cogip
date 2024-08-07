import React from 'react';
import { Link } from 'react-router-dom';

function LatestTable({ title, data, columns }) {
  // Render a message when there's no data
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div className="flex flex-col relative">
      <h2 className="font-Inter font-black text-4xl">{title}</h2>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column.key}>
                  {column.link ? (
                    <Link to={`${column.link}/${item[column.key]}`}>
                      {item[column.key]}
                    </Link>
                  ) : (
                    item[column.key] || 'N/A' // Display 'N/A' if the value is undefined or null
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LatestTable;
