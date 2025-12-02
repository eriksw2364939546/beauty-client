"use client";
import "./ServiceCard.scss";
import Image from "next/image";
import Link from "next/link";

const ServiceCard = ({ image, title }) => {
  return (
    <Link href="#" className="service-card">
      <div className="service-card__image-wrapper">
        {image || (
          <Image
            src="/Img/service-default-image.png"
            alt={title}
            width={396}
            height={300}
          />
        )}
      </div>
      <h3>{title}</h3>
    </Link>
  );
};

export default ServiceCard;
