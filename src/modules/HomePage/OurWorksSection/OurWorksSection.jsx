"use client";
import "./OurWorksSection.scss";
import Link from "next/link";
import WorkFilters from "@/components/WorkFilters/WorkFilters";
import WorkCard from "@/components/WorkCard/WorkCard";
import { useState } from "react";

const OurWorksSection = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  // Моковые данные (в будущем заменится на данные с бекенда)
  const works = [
    {
      id: 1,
      image: "/Img/service-default-image.png",
      category: "Парикмахерские услуги",
      filter: "hairdressing",
    },
    {
      id: 2,
      image: "/Img/service-default-image.png",
      category: "Маникюр",
      filter: "manicure",
    },
    {
      id: 3,
      image: "/Img/service-default-image.png",
      category: "Педикюр",
      filter: "pedicure",
    },
    {
      id: 4,
      image: "/Img/service-default-image.png",
      category: "Парикмахерские услуги",
      filter: "hairdressing",
    },
    {
      id: 5,
      image: "/Img/service-default-image.png",
      category: "Маникюр",
      filter: "manicure",
    },
    {
      id: 6,
      image: "/Img/service-default-image.png",
      category: "Педикюр",
      filter: "pedicure",
    },
  ];

  const filteredWorks =
    activeFilter === "all"
      ? works
      : works.filter((work) => work.filter === activeFilter);

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
    // Здесь будет логика отправки на бекенд
    console.log("Filter changed to:", filterId);
  };

  return (
    <section className="our-works__section">
      <div className="container">
        <h2 className="our-works__section-title">Наши работы</h2>

        <WorkFilters onFilterChange={handleFilterChange} />

        <div className="our-works__list">
          {filteredWorks.map((work) => (
            <WorkCard
              key={work.id}
              image={work.image}
              category={work.category}
            />
          ))}
        </div>

        <Link href="#" className="our-works__all-link">
          Все работы
        </Link>
      </div>
    </section>
  );
};

export default OurWorksSection;
