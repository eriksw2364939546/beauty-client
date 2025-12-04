"use client";
import Image from "next/image";
import "./Hero.scss";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        {/* Картинка как обычный img */}
        <Image
          src="/Img/hero.jpg"
          alt="Salon de beauté Delote-Beauty"
          width={1920}
          height={1038}
          className="hero-image"
          priority={true}
        />

        {/* Заголовок поверх картинки */}
        <div className="hero-content">
          <h1>
            Salon de beauté <br />
            <span>«Delote-Beauty»</span>
            <br />
            sur Krestovsky
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Hero;
