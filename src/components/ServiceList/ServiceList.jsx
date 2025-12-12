"use client";
import "./ServiceList.scss";
import PriceItem from "@/components/PriceItem/PriceItem";

const ServiceList = ({ prices }) => {
  if (!prices || prices.length === 0) {
    return (
      <div className="service-list-empty">
        <p>Aucun tarif disponible</p>
      </div>
    );
  }

  // prices - это всегда массив расценок из getAll()
  return (
    <div className="service-list">
      {prices.map((price) => (
        <PriceItem
          key={price._id || price.id}
          title={price.title}
          price={price.price}
          description={price.description}
        />
      ))}
    </div>
  );
};

export default ServiceList;
