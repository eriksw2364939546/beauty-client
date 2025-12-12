"use client";
import "./MasterCard.scss";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";

const MasterCard = ({ master }) => {
  // Получаем полный URL изображения
  const imageUrl = getImageUrl(master.image);

  return (
    <div className="master-card">
      <div className="master-card__image-wrapper">
        <Image
          src={imageUrl}
          alt={master.fullName}
          width={400}
          height={477}
          className="master-card__image"
        />
      </div>
      <h3 className="master-card__name">{master.fullName}</h3>
      <p className="master-card__speciality">{master.speciality}</p>
    </div>
  );
};

export default MasterCard;
