"use client";
import "./PricesPage.scss";
import Image from "next/image";
import ServiceFilters from "@/components/ServiceFilters/ServiceFilters";
import ServiceList from "@/components/ServiceList/ServiceList";
import Pagination from "@/components/Pagination/Pagination";
import { useRouter, useSearchParams } from "next/navigation";

const PricesPage = ({
  prices,
  services,
  activeServiceSlug,
  meta,
  currentPage,
  isGrouped,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Формируем список услуг для фильтров
  const filterServices = [
    { id: "all", label: "Tous les services", slug: "all" },
    ...services.map((service) => ({
      id: service._id || service.id,
      label: service.title,
      slug: service.slug,
    })),
  ];

  // Обработка изменения фильтра
  const handleServiceChange = (slug) => {
    const params = new URLSearchParams(searchParams);

    if (slug === "all" || !slug || slug === "undefined") {
      params.delete("service");
    } else {
      params.set("service", slug);
    }

    // Сбрасываем страницу при смене фильтра
    params.delete("page");

    const queryString = params.toString();
    router.push(queryString ? `/prices?${queryString}` : "/prices", {
      scroll: false,
    });
  };

  // Обработка смены страницы
  const handlePageChange = (pageNumber) => {
    const params = new URLSearchParams(searchParams);

    if (pageNumber === 1) {
      params.delete("page");
    } else {
      params.set("page", pageNumber.toString());
    }

    const queryString = params.toString();
    router.push(queryString ? `/prices?${queryString}` : "/prices", {
      scroll: false,
    });
  };

  // Определяем активный фильтр
  const activeFilter = activeServiceSlug || "all";

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

        {/* Информация о количестве */}
        {meta && (
          <div className="prices-info">
            <p className="prices-info__total">
              Total: <span>{meta.total}</span> tarifs
            </p>
          </div>
        )}

        {/* Фильтры по услугам */}
        <ServiceFilters
          categories={filterServices}
          activeCategory={activeFilter}
          onCategoryChange={handleServiceChange}
        />

        {/* Список расценок */}
        <ServiceList prices={prices} />

        {/* Пагинация - показываем когда есть несколько страниц */}
        {meta && meta.pages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={meta.pages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </main>
  );
};

export default PricesPage;
