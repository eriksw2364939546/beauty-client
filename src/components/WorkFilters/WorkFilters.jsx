"use client";
import "./WorkFilters.scss";
import { useState } from "react";

const WorkFilters = ({ onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: "Показать все" },
    { id: "hairdressing", label: "Парикмахерские услуги" },
    { id: "manicure", label: "Маникюр" },
    { id: "pedicure", label: "Педикюр" },
  ];

  const handleFilterClick = (filterId) => {
    setActiveFilter(filterId);
    // В будущем здесь будет отправка на бекенд
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
