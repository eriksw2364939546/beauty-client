"use client";
import "./ProductsPage.scss";
import Image from "next/image";
import ProductFilters from "@/components/ProductFilters/ProductFilters";
import ProductList from "@/components/ProductList/ProductList";
import Pagination from "@/components/Pagination/Pagination";
import { useState } from "react";

const ProductsPage = () => {
  const [activeBrand, setActiveBrand] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // 6 товаров на страницу

  const brands = [
    { id: "all", label: "Все бренды" },
    { id: "loreal", label: "L'Oreal" },
    { id: "garnier", label: "Garnier" },
    { id: "nivea", label: "Nivea" },
    { id: "maybelline", label: "Maybelline" },
    { id: "estee-lauder", label: "Estée Lauder" },
    { id: "clarins", label: "Clarins" },
  ];

  // 24 товара для демонстрации пагинации (4 страницы)
  const products = [
    {
      id: 1,
      title: "Увлажняющий крем для лица",
      description:
        "Интенсивное увлажнение на 24 часа, подходит для всех типов кожи",
      price: 1500,
      code: "CR001",
      image: "/Img/ProductImage.jpg",
      brand: "loreal",
      brandName: "L'Oreal",
      slug: "uvlazhnyayushchiy-krem-dlya-litsa-1",
    },
    {
      id: 2,
      title: "Тонирующий крем-основа",
      description: "Легкое покрытие, SPF 30, натуральный финиш",
      price: 2200,
      code: "FD002",
      image: "/Img/ProductImage.jpg",
      brand: "garnier",
      brandName: "Garnier",
      slug: "toniruyushchiy-krem-osnova-2",
    },
    {
      id: 3,
      title: "Сыворотка для сияния кожи",
      description:
        "С витамином C для сияющего цвета лица, уменьшает пигментацию",
      price: 3200,
      code: "SR003",
      image: "/Img/ProductImage.jpg",
      brand: "nivea",
      brandName: "Nivea",
      slug: "siyvorotka-dlya-siyaniya-kozhi-3",
    },
    {
      id: 4,
      title: "Очищающий гель для лица",
      description: "Глубокое очищение пор, не нарушает pH баланс кожи",
      price: 850,
      code: "CL004",
      image: "/Img/ProductImage.jpg",
      brand: "maybelline",
      brandName: "Maybelline",
      slug: "ochishchayushchiy-gel-dlya-litsa-4",
    },
    {
      id: 5,
      title: "Ночной крем восстановление",
      description: "Интенсивное восстановление кожи во время сна",
      price: 2800,
      code: "NC005",
      image: "/Img/ProductImage.jpg",
      brand: "estee-lauder",
      brandName: "Estée Lauder",
      slug: "nochnoy-krem-vosstanovlenie-5",
    },
    {
      id: 6,
      title: "Гель для умывания",
      description: "Мягкое очищение, подходит для чувствительной кожи",
      price: 1200,
      code: "CL006",
      image: "/Img/ProductImage.jpg",
      brand: "clarins",
      brandName: "Clarins",
      slug: "gel-dlya-umyvaniya-6",
    },
    {
      id: 7,
      title: "BB крем с SPF 50",
      description: "Защита от солнца и легкое тонирование",
      price: 1800,
      code: "BB007",
      image: "/Img/ProductImage.jpg",
      brand: "loreal",
      brandName: "L'Oreal",
      slug: "bb-krem-s-spf-50-7",
    },
    {
      id: 8,
      title: "Маска для лица глиняная",
      description: "Очищение пор, матирование, уменьшение жирного блеска",
      price: 950,
      code: "MS008",
      image: "/Img/ProductImage.jpg",
      brand: "garnier",
      brandName: "Garnier",
      slug: "maska-dlya-litsa-glinyanaya-8",
    },
    {
      id: 9,
      title: "Сыворотка против морщин",
      description: "Уменьшение видимых признаков старения, подтяжка кожи",
      price: 4500,
      code: "SR009",
      image: "/Img/ProductImage.jpg",
      brand: "nivea",
      brandName: "Nivea",
      slug: "siyvorotka-protiv-morshchin-9",
    },
    {
      id: 10,
      title: "Тушь для ресниц объемная",
      description: "Создает эффект накладных ресниц, несмываемая формула",
      price: 1200,
      code: "MS010",
      image: "/Img/ProductImage.jpg",
      brand: "maybelline",
      brandName: "Maybelline",
      slug: "tush-dlya-resnits-obemnaya-10",
    },
    {
      id: 11,
      title: "Пудра компактная матирующая",
      description: "Матирование на 12 часов, контроль жирного блеска",
      price: 1600,
      code: "PD011",
      image: "/Img/ProductImage.jpg",
      brand: "estee-lauder",
      brandName: "Estée Lauder",
      slug: "pudra-kompaktnaya-matiruyushchaya-11",
    },
    {
      id: 12,
      title: "Бальзам для губ увлажняющий",
      description: "Интенсивное увлажнение, SPF 15, защита от сухости",
      price: 750,
      code: "LB012",
      image: "/Img/ProductImage.jpg",
      brand: "clarins",
      brandName: "Clarins",
      slug: "balzam-dlya-gub-uvlazhnyayushchiy-12",
    },
    {
      id: 13,
      title: "Крем для рук питательный",
      description: "Восстановление сухой кожи, защита от агрессивной среды",
      price: 650,
      code: "HC013",
      image: "/Img/ProductImage.jpg",
      brand: "loreal",
      brandName: "L'Oreal",
      slug: "krem-dlya-ruk-pitatelnyy-13",
    },
    {
      id: 14,
      title: "Спрей для лица освежающий",
      description: "Мгновенное освежение, фиксация макияжа",
      price: 1100,
      code: "SP014",
      image: "/Img/ProductImage.jpg",
      brand: "garnier",
      brandName: "Garnier",
      slug: "sprey-dlya-litsa-osvezhayushchiy-14",
    },
    {
      id: 15,
      title: "Гель для душа увлажняющий",
      description:
        "Нежная формула с маслами, подходит для ежедневного использования",
      price: 850,
      code: "SH015",
      image: "/Img/ProductImage.jpg",
      brand: "nivea",
      brandName: "Nivea",
      slug: "gel-dlya-dusha-uvlazhnyayushchiy-15",
    },
    {
      id: 16,
      title: "Карандаш для бровей",
      description: "Стойкая формула, водостойкий, естественный результат",
      price: 900,
      code: "EB016",
      image: "/Img/ProductImage.jpg",
      brand: "maybelline",
      brandName: "Maybelline",
      slug: "karandash-dlya-brovey-16",
    },
    {
      id: 17,
      title: "Духи цветочные",
      description: "Нежный цветочный аромат с нотками жасмина и розы",
      price: 5200,
      code: "PR017",
      image: "/Img/ProductImage.jpg",
      brand: "estee-lauder",
      brandName: "Estée Lauder",
      slug: "duhi-tsvetochnye-17",
    },
    {
      id: 18,
      title: "Масло для тела питательное",
      description: "Быстрое впитывание, шелковистая кожа, стойкий аромат",
      price: 2100,
      code: "BO018",
      image: "/Img/ProductImage.jpg",
      brand: "clarins",
      brandName: "Clarins",
      slug: "maslo-dlya-tela-pitatelnoe-18",
    },
    {
      id: 19,
      title: "Шампунь для объема",
      description: "Увеличивает объем волос, укрепляет корни",
      price: 1400,
      code: "SH019",
      image: "/Img/ProductImage.jpg",
      brand: "loreal",
      brandName: "L'Oreal",
      slug: "shampun-dlya-obema-19",
    },
    {
      id: 20,
      title: "Кондиционер для волос",
      description: "Облегчает расчесывание, придает блеск",
      price: 1300,
      code: "CD020",
      image: "/Img/ProductImage.jpg",
      brand: "garnier",
      brandName: "Garnier",
      slug: "konditsioner-dlya-volos-20",
    },
    {
      id: 21,
      title: "Маска для волос восстанавливающая",
      description: "Интенсивное восстановление поврежденных волос",
      price: 1800,
      code: "HM021",
      image: "/Img/ProductImage.jpg",
      brand: "nivea",
      brandName: "Nivea",
      slug: "maska-dlya-volos-vosstanavlivayushchaya-21",
    },
    {
      id: 22,
      title: "Лак для волос сильной фиксации",
      description: "Фиксация на 24 часа, защита от влажности",
      price: 950,
      code: "HS022",
      image: "/Img/ProductImage.jpg",
      brand: "maybelline",
      brandName: "Maybelline",
      slug: "lak-dlya-volos-silnoy-fiksatsii-22",
    },
    {
      id: 23,
      title: "Масло для волос аргановое",
      description: "Защита от горячих укладок, блеск без утяжеления",
      price: 2400,
      code: "HO023",
      image: "/Img/ProductImage.jpg",
      brand: "estee-lauder",
      brandName: "Estée Lauder",
      slug: "maslo-dlya-volos-arganovoe-23",
    },
    {
      id: 24,
      title: "Спрей термозащита для волос",
      description: "Защита до 230°C, предотвращение ломкости",
      price: 1600,
      code: "HT024",
      image: "/Img/ProductImage.jpg",
      brand: "clarins",
      brandName: "Clarins",
      slug: "sprey-termozashchita-dlya-volos-24",
    },
  ];

  const handleBrandChange = (brandId) => {
    setActiveBrand(brandId);
    setCurrentPage(1); // Сбрасываем на первую страницу при смене фильтра
  };

  // Фильтрация продуктов по бренду
  const filteredProducts =
    activeBrand === "all"
      ? products
      : products.filter((product) => product.brand === activeBrand);

  // Пагинация
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="products-page">
      {/* Главная картинка с заголовком */}
      <section className="products-hero__image">
        <Image
          src="/Img/products-hero.jpg"
          alt="Наша косметика"
          width={1920}
          height={500}
          className="products-hero__image"
          priority={true}
        />
      </section>

      <div className="container">
        <div className="products-hero__content">
          <h1>Наша косметика</h1>
          <p>Профессиональная косметика от ведущих мировых брендов</p>
        </div>
        <div className="products-info">
          <p className="products-info__total">
            Найдено товаров: <span>{filteredProducts.length}</span>
          </p>
        </div>

        <ProductFilters
          brands={brands}
          activeBrand={activeBrand}
          onBrandChange={handleBrandChange}
        />

        <div className="products-page__list">
          <ProductList products={currentProducts} />
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </main>
  );
};

export default ProductsPage;
