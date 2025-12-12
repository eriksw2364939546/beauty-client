"use client";
import "./Pagination.scss";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, start + maxVisible - 1);

      if (end - start + 1 < maxVisible) {
        start = end - maxVisible + 1;
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="pagination">
      <button
        className={`pagination__button pagination__button--prev ${
          currentPage === 1 ? "pagination__button--disabled" : ""
        }`}
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        ← Dos
      </button>

      <div className="pagination__pages">
        {getPageNumbers().map((page) => (
          <button
            key={page}
            className={`pagination__page ${
              currentPage === page ? "pagination__page--active" : ""
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        className={`pagination__button pagination__button--next ${
          currentPage === totalPages ? "pagination__button--disabled" : ""
        }`}
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Suivant →
      </button>
    </div>
  );
};

export default Pagination;
