"use client";
import "./ServiceFilters.scss";

const ServiceFilters = ({ categories, activeCategory, onCategoryChange }) => {
  const handleClick = (category) => {
    // Передаём slug, а не id
    const slug = category.slug || category.id;
    onCategoryChange(slug);
  };

  return (
    <div className="service-filters">
      <div className="service-filters__wrapper">
        {categories &&
          categories.length > 0 &&
          categories.map((category) => {
            const categorySlug = category.slug || category.id;

            return (
              <button
                key={category.id}
                className={`service-filters__button ${
                  activeCategory === categorySlug
                    ? "service-filters__button--active"
                    : ""
                }`}
                onClick={() => handleClick(category)}
              >
                {category.label}
              </button>
            );
          })}
      </div>
    </div>
  );
};

export default ServiceFilters;
