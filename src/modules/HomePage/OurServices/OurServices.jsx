"use client";
import "./OurServices.scss";
import ServiceCard from "@/components/ServiceCard/ServiceCard";
import Image from "next/image";

const OurServices = () => {
  const services = [
    {
      id: 1,
      title: "Services de coiffure",
      image: (
        <Image
          src="/Img/service-default-image.png"
          alt="Services de coiffure"
          width={300}
          height={250}
        />
      ),
    },
    {
      id: 2,
      title: "Manucure et pédicure",
      image: (
        <Image
          src="/Img/service-default-image.png"
          alt="Manucure et pédicure"
          width={300}
          height={250}
        />
      ),
    },
    {
      id: 3,
      title: "Cosmétologie",
      image: (
        <Image
          src="/Img/service-default-image.png"
          alt="Cosmétologie"
          width={300}
          height={250}
        />
      ),
    },
    {
      id: 4,
      title: "Maquillage",
      image: (
        <Image
          src="/Img/service-default-image.png"
          alt="Maquillage"
          width={300}
          height={250}
        />
      ),
    },
    {
      id: 5,
      title: "Massage",
      image: (
        <Image
          src="/Img/service-default-image.png"
          alt="Massage"
          width={300}
          height={250}
        />
      ),
    },
    {
      id: 6,
      title: "Soins SPA",
      // Без image - будет использована дефолтная картинка
    },
  ];

  return (
    <section className="our-services">
      <div className="container">
        <h2>Nos services</h2>
        <div className="our-services__list">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              image={service.image}
              title={service.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
