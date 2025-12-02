"use client";
import "./PriceItem.scss";

const PriceItem = ({ title, price, description }) => {
  return (
    <div className="price-item">
      <div className="price-item__content">
        <h3 className="price-item__title">{title}</h3>
        <p className="price-item__description">{description}</p>
      </div>
      <div className="price-item__price">{price}</div>
    </div>
  );
};

export default PriceItem;
