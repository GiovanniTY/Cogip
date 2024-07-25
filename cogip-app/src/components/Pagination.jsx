import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  function handlePrevious() {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  }

  function handleNext() {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  }

  function handlePageChange(page) {
    onPageChange(page);
  }

  return (
    <div className='self-center font-Roboto font-bold'>
      <button className=" rounded px-2 border m-1 text-cogip-color" onClick={handlePrevious} disabled={currentPage === 1}>
        &lt;
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          className=" rounded px-2 border m-1"
          key={index + 1}
          onClick={() => handlePageChange(index + 1)}
          disabled={index + 1 === currentPage}
        >
          {index + 1}
        </button>
      ))}
      <button className=" rounded px-2 border m-1 text-cogip-color" onClick={handleNext} disabled={currentPage === totalPages}>
        &gt;
      </button>
    </div>
  );
}

export default Pagination;
