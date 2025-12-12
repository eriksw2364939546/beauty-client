"use client";
import "./OurWorksSection.scss";
import WorkFilters from "@/components/WorkFilters/WorkFilters";
import WorkCard from "@/components/WorkCard/WorkCard";
import { useState } from "react";
import { getImageUrl } from "@/lib/utils";
import WorksService from "@/services/works.service";

const OurWorksSection = ({ services = [], initialWorks = [] }) => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [works, setWorks] = useState(initialWorks);
  const [loading, setLoading] = useState(false);

  const handleFilterChange = async (serviceId) => {
    console.log("🔄 Changing filter to:", serviceId);
    setActiveFilter(serviceId);

    if (serviceId === "all") {
      setWorks(initialWorks);
      return;
    }

    setLoading(true);
    try {
      console.log("🌐 Fetching works for serviceId:", serviceId);
      const filteredWorks = await WorksService.getByService(serviceId);
      console.log("✅ Received works:", filteredWorks);
      setWorks(Array.isArray(filteredWorks) ? filteredWorks : []);
    } catch (error) {
      console.error("❌ Error fetching filtered works:", error);
      setWorks([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="our-works__section"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <div className="container">
        <h2 className="our-works__section-title" itemProp="name">
          Nos réalisations beauté
        </h2>

        <meta
          itemProp="description"
          content="Découvrez nos dernières réalisations en soins de beauté"
        />

        <WorkFilters
          services={services}
          onFilterChange={handleFilterChange}
          activeFilter={activeFilter}
        />

        {loading ? (
          <div className="our-works__loading" role="status" aria-live="polite">
            Chargement...
          </div>
        ) : (
          <>
            <div className="our-works__list">
              {Array.isArray(works) && works.length > 0 ? (
                works.map((work, index) => (
                  <div
                    key={work.id || work._id}
                    itemProp="itemListElement"
                    itemScope
                    itemType="https://schema.org/ListItem"
                  >
                    <meta itemProp="position" content={String(index + 1)} />
                    <WorkCard
                      image={getImageUrl(work.image)}
                      category={work.service?.title || "Sans catégorie"}
                    />
                  </div>
                ))
              ) : (
                <div className="our-works__empty">
                  Aucune réalisation trouvée
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default OurWorksSection;
