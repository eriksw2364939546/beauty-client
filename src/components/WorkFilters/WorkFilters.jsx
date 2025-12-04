"use client";
import "./WorkFilters.scss";
import { useState } from "react";

const WorkFilters = ({ onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: "Afficher tout" },
    { id: "hairdressing", label: "Services de coiffure" },
    { id: "manicure", label: "Manucure" },
    { id: "pedicure", label: "Pédicure" },
  ];

  const handleFilterClick = (filterId) => {
    setActiveFilter(filterId);
    onFilterChange(filterId);
  };

  return (
    <div className="work-filters">
      {filters.map((filter) => (
        <button
          key={filter.id}
          className={`work-filters__button ${
            activeFilter === filter.id ? "work-filters__button--active" : ""
          }`}
          onClick={() => handleFilterClick(filter.id)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default WorkFilters;
