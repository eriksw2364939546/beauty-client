"use client";
import "./MasterCard.scss";
import Image from "next/image";

const MasterCard = ({ image, title, description }) => {
  return (
    <div className="master-card">
      <div className="master-card__image-wrapper">
        {image || (
          <Image
            src="/Img/master-default-image.png"
            alt={title}
            width={400}
            height={477}
          />
        )}
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default MasterCard;
