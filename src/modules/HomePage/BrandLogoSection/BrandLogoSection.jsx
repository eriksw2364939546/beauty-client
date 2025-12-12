"use client";
import "./BrandLogoSection.scss";

import Image from "next/image";

const BrandLogoSection = () => {
  return (
    <section className="brand-logo__section">
      <div className="container">
        <div className="brand-logo__section-items">
          <div className="brand-section__image-wrapper">
            <Image
              alt="Logo de la marque"
              src="/icon/brandSection-logo1.svg"
              width={69}
              height={108}
              property="true"
            />
          </div>
          <div className="brand-section__image-wrapper">
            <Image
              alt="Logo de la marque"
              src="/icon/brandSection-logo2.svg"
              width={90}
              height={120}
              property="true"
            />
          </div>
          <div className="brand-section__image-wrapper">
            <Image
              alt="Logo de la marque"
              src="/icon/brandSection-logo3.svg"
              width={190}
              height={98}
              property="true"
            />
          </div>
          <div className="brand-section__image-wrapper">
            <Image
              alt="Logo de la marque"
              src="/icon/brandSection-logo4.svg"
              width={110}
              height={108}
              property="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandLogoSection;
