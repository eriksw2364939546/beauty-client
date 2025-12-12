"use client";
import "./WorkCard.scss";
import Image from "next/image";

const WorkCard = ({ image, category }) => {
  return (
    <div className="work-card">
      <div className="work-card__image-wrapper">
        <Image
          src={image || "/Img/service-default-image.png"}
          alt={`Работа - ${category}`}
          width={416}
          height={416}
          className="work-card__image"
          loading="lazy"
          onError={(e) => {
            e.target.src = "/Img/service-default-image.png";
          }}
        />
      </div>
      <div className="work-card__category">{category}</div>
    </div>
  );
};

export default WorkCard;
