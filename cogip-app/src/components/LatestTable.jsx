import React from 'react';

function LatestTable({ title, data, columns }) {
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
                <td key={column.key}>{item[column.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LatestTable;
