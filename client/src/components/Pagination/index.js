import React from "react";

export default function Pagination({ current, maximum, onSelectPage }) {
  const handleOnClick = (page) => {
    if (page >= 1 && page <= maximum) {
      onSelectPage(page);
    }
  };

  const generatePageNumbers = () => {
    const pages = [];
    if (maximum <= 5) {
      for (let i = 1; i <= maximum; i++) {
        pages.push(i);
      }
    } else {
      if (current > 2) pages.push(1, "...");
      for (
        let i = Math.max(1, current - 1);
        i <= Math.min(maximum, current + 1);
        i++
      ) {
        pages.push(i);
      }
      if (current < maximum - 1) pages.push("...", maximum);
    }
    return pages;
  };

  return (
    <ul className="pagination justify-content-center">
      <li
        className={`page-item ${current === 1 ? "disabled" : ""}`}
        onClick={() => handleOnClick(current - 1)}
      >
        <span className="page-link">Previous</span>
      </li>
      {generatePageNumbers().map((page, index) => (
        <li
          key={index}
          className={`page-item ${
            page === current ? "active" : page === "..." ? "disabled" : ""
          }`}
          onClick={() => typeof page === "number" && handleOnClick(page)}
        >
          <span className="page-link">{page}</span>
        </li>
      ))}
      <li
        className={`page-item ${current === maximum ? "disabled" : ""}`}
        onClick={() => handleOnClick(current + 1)}
      >
        <span className="page-link">Next</span>
      </li>
    </ul>
  );
}
