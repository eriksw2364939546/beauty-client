"use client";
import "./OurServices.scss";
import ServiceCard from "@/components/ServiceCard/ServiceCard";
import Image from "next/image";

const OurServices = () => {
  const services = [
    {
      id: 1,
      title: "Парикмахерские услуги",
      image: (
        <Image
          src="/Img/service-default-image.png"
          alt="Парикмахерские услуги"
          width={300}
          height={250}
        />
      ),
    },
    {
      id: 2,
      title: "Маникюр и педикюр",
      image: (
        <Image
          src="/Img/service-default-image.png"
          alt="Маникюр и педикюр"
          width={300}
          height={250}
        />
      ),
    },
    {
      id: 3,
      title: "Косметология",
      image: (
        <Image
          src="/Img/service-default-image.png"
          alt="Косметология"
          width={300}
          height={250}
        />
      ),
    },
    {
      id: 4,
      title: "Макияж",
      image: (
        <Image
          src="/Img/service-default-image.png"
          alt="Макияж"
          width={300}
          height={250}
        />
      ),
    },
    {
      id: 5,
      title: "Массаж",
      image: (
        <Image
          src="/Img/service-default-image.png"
          alt="Массаж"
          width={300}
          height={250}
        />
      ),
    },
    {
      id: 6,
      title: "SPA-процедуры",
      // Без image - будет использована дефолтная картинка
    },
  ];

  return (
    <section className="our-services">
      <div className="container">
        <h2>Наши услуги</h2>
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
