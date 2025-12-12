"use client";
import "./WorkFilters.scss";

const WorkFilters = ({ services, onFilterChange, activeFilter }) => {
  const handleFilterClick = (serviceId) => {
    onFilterChange(serviceId);
  };

  return (
    <div className="work-filters">
      {/* Кнопка "Показать все" */}
      <button
        key="filter-all"
        className={`work-filters__button ${
          activeFilter === "all" ? "work-filters__button--active" : ""
        }`}
        onClick={() => handleFilterClick("all")}
      >
        Afficher tout
      </button>

      {/* Кнопки фильтров по услугам */}
      {services &&
        services.length > 0 &&
        services.map((service) => {
          const serviceId = service._id || service.id;
          console.log("🔍 Service button:", {
            title: service.title,
            id: serviceId,
          });
          return (
            <button
              key={serviceId}
              className={`work-filters__button ${
                activeFilter === serviceId ? "work-filters__button--active" : ""
              }`}
              onClick={() => handleFilterClick(serviceId)}
            >
              {service.title}
            </button>
          );
        })}
    </div>
  );
};

export default WorkFilters;
