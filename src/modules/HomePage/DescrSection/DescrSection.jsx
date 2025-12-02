"use client";
import "./DescrSection.scss";
import Image from "next/image";
const DescrSection = () => {
  return (
    <section className="descr-section">
      <div className="container">
        <div className="descr-section__icon-wrapper">
          <Image
            alt="Icon"
            src="/icon/descr-section-icon.svg"
            width={80}
            height={80}
            property="true"
          />
        </div>

        <h2>
          Откройте для себя мир безупречной красоты в салоне «Delote-Beauty» на
          Крестовском. Наши мастера с многолетним опытом создадут для вас
          неповторимый образ, подчеркивающий вашу индивидуальность. Позвольте
          себе быть неотразимой — ваше преображение начинается здесь и сейчас!
        </h2>
      </div>
    </section>
  );
};

export default DescrSection;
