"use client";
import "./OurServices.scss";
import ServiceCard from "@/components/ServiceCard/ServiceCard";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";

const OurServices = ({ services = [] }) => {
  if (!services || services.length === 0) {
    return (
      <section className="our-services">
        <div className="container">
          <h2>Nos services</h2>
          <div className="our-services__list">
            <p>Aucun service disponible pour le moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="our-services"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <div className="container">
        <h2 itemProp="name">Nos services de beauté</h2>

        <meta
          itemProp="description"
          content="Découvrez notre gamme complète de services de beauté professionnels"
        />

        <div className="our-services__list">
          {services.map((service, index) => (
            <div
              key={service._id || service.id}
              className="our-services__link"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <meta itemProp="position" content={String(index + 1)} />

              <div
                itemProp="item"
                itemScope
                itemType="https://schema.org/Service"
              >
                <ServiceCard
                  image={
                    <Image
                      src={getImageUrl(service.image)}
                      alt={`${service.title} - Service de beauté professionnel à Marseille`}
                      width={300}
                      height={250}
                      className="service-card__image"
                      itemProp="image"
                    />
                  }
                  title={service.title}
                />
                <meta itemProp="name" content={service.title} />
                <meta itemProp="description" content={service.description} />
                <meta itemProp="provider" content="Delote-Beauty" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
