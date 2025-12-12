"use client";
import "./PriceItem.scss";
import { formatPrice } from "@/lib/utils";

const PriceItem = ({ title, price, description }) => {
  return (
    <div className="price-item">
      <div className="price-item__content">
        <h3 className="price-item__title">{title}</h3>
        {description && (
          <p className="price-item__description">{description}</p>
        )}
      </div>
      <div className="price-item__price">{formatPrice(price)}</div>
    </div>
  );
};

export default PriceItem;
