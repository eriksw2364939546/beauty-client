// components/ServiceCard/ServiceCard.js
"use client";
import "./ServiceCard.scss";
import Image from "next/image";

const ServiceCard = ({ image, title }) => {
  return (
    <div className="service-card">
      <div className="service-card__image-wrapper">{image}</div>
      <div className="service-card__content">
        <h3 className="service-card__title">{title}</h3>
      </div>
    </div>
  );
};

export default ServiceCard;
