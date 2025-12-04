"use client";
import "./PricesPage.scss";
import Image from "next/image";
import ServiceFilters from "@/components/ServiceFilters/ServiceFilters";
import ServiceList from "@/components/ServiceList/ServiceList";
import { useState } from "react";

const PricesPage = () => {
  const [activeCategory, setActiveCategory] = useState("hairdressing");

  const categories = [
    { id: "hairdressing", label: "Services de coiffure" },
    { id: "nails", label: "Manucure et pédicure" },
    { id: "cosmetology", label: "Cosmétologie" },
    { id: "makeup", label: "Maquillage" },
    { id: "massage", label: "Massage" },
    { id: "spa", label: "Soins SPA" },
  ];

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };

  return (
    <main className="prices-page">
      {/* Главная картинка */}
      <div className="prices-hero__image">
        <Image
          src="/Img/pricesPageImage.jpg"
          alt="Tarifs des services du salon de beauté"
          width={1920}
          height={600}
          className="prices-hero__image"
          priority={true}
        />
      </div>

      <div className="container">
        <div className="prices-hero__content">
          <h1>Tarifs des services</h1>
          <p>Services de qualité à des prix abordables</p>
        </div>
        {/* Фильтры по категориям */}
        <ServiceFilters
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Список услуг */}
        <ServiceList category={activeCategory} />
      </div>
    </main>
  );
};

export default PricesPage;
