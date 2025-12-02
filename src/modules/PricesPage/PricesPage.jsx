"use client";
import "./PricesPage.scss";
import Image from "next/image";
import ServiceFilters from "@/components/ServiceFilters/ServiceFilters";
import ServiceList from "@/components/ServiceList/ServiceList";
import { useState } from "react";

const PricesPage = () => {
  const [activeCategory, setActiveCategory] = useState("hairdressing");

  const categories = [
    { id: "hairdressing", label: "Парикмахерские услуги" },
    { id: "nails", label: "Маникюр и педикюр" },
    { id: "cosmetology", label: "Косметология" },
    { id: "makeup", label: "Макияж" },
    { id: "massage", label: "Массаж" },
    { id: "spa", label: "SPA-процедуры" },
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
          alt="Цены на услуги салона красоты"
          width={1920}
          height={600}
          className="prices-hero__image"
          priority={true}
        />
      </div>

      <div className="container">
        <div className="prices-hero__content">
          <h1>Цены на услуги</h1>
          <p>Качественные услуги по доступным ценам</p>
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
