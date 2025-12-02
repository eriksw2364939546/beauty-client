"use client";
import Image from "next/image";
import "./Hero.scss";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        {/* Картинка как обычный img */}
        <Image
          src="/img/hero.jpg"
          alt="Салон красоты Delote-Beauty"
          width={1920}
          height={1038}
          className="hero-image"
          priority={true}
        />

        {/* Заголовок поверх картинки */}
        <div className="hero-content">
          <h1>
            Салон красоты <br />
            <span>«Delote-Beauty»</span>
            <br />
            на Крестовском
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Hero;
