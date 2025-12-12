"use client";
import Image from "next/image";
import "./Hero.scss";

const Hero = () => {
  return (
    <section
      className="hero"
      itemScope
      itemType="https://schema.org/BeautySalon"
    >
      <div className="hero-container">
        {/* Оптимизированное изображение с правильными атрибутами */}
        <Image
          src="/Img/hero.jpg"
          alt="Salon de beauté Delote-Beauty à Marseille - Intérieur moderne et élégant avec équipements professionnels"
          width={1920}
          height={1038}
          className="hero-image"
          priority={true}
          quality={85}
          sizes="100vw"
          itemProp="image"
        />

        {/* H1 - самый важный SEO-элемент! */}
        <div className="hero-content">
          <h1 itemProp="name">
            Salon de beauté <span className="hero-brand">Delote-Beauty</span>
            <br />
            <span
              className="hero-location"
              itemProp="address"
              itemScope
              itemType="https://schema.org/PostalAddress"
            >
              <span itemProp="addressLocality">à Marseille</span>
            </span>
          </h1>

          {/* Подзаголовок для локального SEO */}
          <p className="hero-subtitle" itemProp="description">
            Votre institut de beauté premium au cœur de Marseille
          </p>

          {/* Скрытая микроразметка для дополнительной информации */}
          <meta itemProp="telephone" content="+33491332100" />
          <meta itemProp="priceRange" content="€€" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
