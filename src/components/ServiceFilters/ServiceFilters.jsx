"use client";
import "./ServiceFilters.scss";

const ServiceFilters = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="service-filters">
      <div className="service-filters__wrapper">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`service-filters__button ${
              activeCategory === category.id
                ? "service-filters__button--active"
                : ""
            }`}
            onClick={() => onCategoryChange(category.id)}
            disabled={activeCategory === category.id} // Делаем активную кнопку некликабельной
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ServiceFilters;
