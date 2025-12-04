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
  const itemsPerPage = 6; // 6 produits par page

  const brands = [
    { id: "all", label: "Toutes les marques" },
    { id: "loreal", label: "L'Oreal" },
    { id: "garnier", label: "Garnier" },
    { id: "nivea", label: "Nivea" },
    { id: "maybelline", label: "Maybelline" },
    { id: "estee-lauder", label: "Estée Lauder" },
    { id: "clarins", label: "Clarins" },
  ];

  const products = [
    {
      id: 1,
      title: "Crème hydratante pour le visage",
      description:
        "Hydratation intense pendant 24h, convient à tous types de peau",
      price: 1500,
      code: "CR001",
      image: "/Img/ProductImage.jpg",
      brand: "loreal",
      brandName: "L'Oreal",
      slug: "creme-hydratante-pour-le-visage-1",
    },
    {
      id: 2,
      title: "Crème de teint",
      description: "Couverture légère, SPF 30, fini naturel",
      price: 2200,
      code: "FD002",
      image: "/Img/ProductImage.jpg",
      brand: "garnier",
      brandName: "Garnier",
      slug: "creme-de-teint-2",
    },
    {
      id: 3,
      title: "Sérum éclat",
      description: "Vitamine C pour un teint lumineux, réduit la pigmentation",
      price: 3200,
      code: "SR003",
      image: "/Img/ProductImage.jpg",
      brand: "nivea",
      brandName: "Nivea",
      slug: "serum-eclat-3",
    },
    {
      id: 4,
      title: "Gel nettoyant visage",
      description: "Nettoyage en profondeur, respecte le pH de la peau",
      price: 850,
      code: "CL004",
      image: "/Img/ProductImage.jpg",
      brand: "maybelline",
      brandName: "Maybelline",
      slug: "gel-nettoyant-visage-4",
    },
    {
      id: 5,
      title: "Crème de nuit réparatrice",
      description: "Restauration intense pendant le sommeil",
      price: 2800,
      code: "NC005",
      image: "/Img/ProductImage.jpg",
      brand: "estee-lauder",
      brandName: "Estée Lauder",
      slug: "creme-de-nuit-reparatrice-5",
    },
    {
      id: 6,
      title: "Gel nettoyant doux",
      description: "Nettoyage doux, adapté aux peaux sensibles",
      price: 1200,
      code: "CL006",
      image: "/Img/ProductImage.jpg",
      brand: "clarins",
      brandName: "Clarins",
      slug: "gel-nettoyant-doux-6",
    },
    {
      id: 7,
      title: "BB crème SPF 50",
      description: "Protection solaire et légère couvrance",
      price: 1800,
      code: "BB007",
      image: "/Img/ProductImage.jpg",
      brand: "loreal",
      brandName: "L'Oreal",
      slug: "bb-creme-spf-50-7",
    },
    {
      id: 8,
      title: "Masque visage argile",
      description: "Nettoie les pores, matifie, réduit la brillance",
      price: 950,
      code: "MS008",
      image: "/Img/ProductImage.jpg",
      brand: "garnier",
      brandName: "Garnier",
      slug: "masque-visage-argile-8",
    },
    {
      id: 9,
      title: "Sérum anti-rides",
      description:
        "Réduit les signes visibles du vieillissement, effet tenseur",
      price: 4500,
      code: "SR009",
      image: "/Img/ProductImage.jpg",
      brand: "nivea",
      brandName: "Nivea",
      slug: "serum-anti-rides-9",
    },
    {
      id: 10,
      title: "Mascara volumisant",
      description: "Effet faux cils, formule waterproof",
      price: 1200,
      code: "MS010",
      image: "/Img/ProductImage.jpg",
      brand: "maybelline",
      brandName: "Maybelline",
      slug: "mascara-volumisant-10",
    },
    {
      id: 11,
      title: "Poudre compacte matifiante",
      description: "Matifie pendant 12h, contrôle de la brillance",
      price: 1600,
      code: "PD011",
      image: "/Img/ProductImage.jpg",
      brand: "estee-lauder",
      brandName: "Estée Lauder",
      slug: "poudre-compacte-matifiante-11",
    },
    {
      id: 12,
      title: "Baume à lèvres hydratant",
      description:
        "Hydratation intense, SPF 15, protection contre la sécheresse",
      price: 750,
      code: "LB012",
      image: "/Img/ProductImage.jpg",
      brand: "clarins",
      brandName: "Clarins",
      slug: "baume-a-levres-hydratant-12",
    },
    {
      id: 13,
      title: "Crème pour les mains nourrissante",
      description: "Restaure la peau sèche, protection contre les agressions",
      price: 650,
      code: "HC013",
      image: "/Img/ProductImage.jpg",
      brand: "loreal",
      brandName: "L'Oreal",
      slug: "creme-pour-les-mains-nourrissante-13",
    },
    {
      id: 14,
      title: "Spray visage rafraîchissant",
      description: "Rafraîchissement instantané, fixe le maquillage",
      price: 1100,
      code: "SP014",
      image: "/Img/ProductImage.jpg",
      brand: "garnier",
      brandName: "Garnier",
      slug: "spray-visage-rafraichissant-14",
    },
    {
      id: 15,
      title: "Gel douche hydratant",
      description: "Formule douce avec huiles, usage quotidien",
      price: 850,
      code: "SH015",
      image: "/Img/ProductImage.jpg",
      brand: "nivea",
      brandName: "Nivea",
      slug: "gel-douche-hydratant-15",
    },
    {
      id: 16,
      title: "Crayon à sourcils",
      description: "Formule longue tenue, waterproof, résultat naturel",
      price: 900,
      code: "EB016",
      image: "/Img/ProductImage.jpg",
      brand: "maybelline",
      brandName: "Maybelline",
      slug: "crayon-a-sourcils-16",
    },
    {
      id: 17,
      title: "Parfum floral",
      description: "Parfum délicat avec notes de jasmin et rose",
      price: 5200,
      code: "PR017",
      image: "/Img/ProductImage.jpg",
      brand: "estee-lauder",
      brandName: "Estée Lauder",
      slug: "parfum-floral-17",
    },
    {
      id: 18,
      title: "Huile corporelle nourrissante",
      description: "Absorption rapide, peau soyeuse, parfum durable",
      price: 2100,
      code: "BO018",
      image: "/Img/ProductImage.jpg",
      brand: "clarins",
      brandName: "Clarins",
      slug: "huile-corporelle-nourrissante-18",
    },
    {
      id: 19,
      title: "Shampooing volume",
      description: "Augmente le volume des cheveux, renforce les racines",
      price: 1400,
      code: "SH019",
      image: "/Img/ProductImage.jpg",
      brand: "loreal",
      brandName: "L'Oreal",
      slug: "shampooing-volume-19",
    },
    {
      id: 20,
      title: "Après-shampooing",
      description: "Démêle facilement, apporte brillance",
      price: 1300,
      code: "CD020",
      image: "/Img/ProductImage.jpg",
      brand: "garnier",
      brandName: "Garnier",
      slug: "apres-shampooing-20",
    },
    {
      id: 21,
      title: "Masque réparateur cheveux",
      description: "Restauration intensive des cheveux abîmés",
      price: 1800,
      code: "HM021",
      image: "/Img/ProductImage.jpg",
      brand: "nivea",
      brandName: "Nivea",
      slug: "masque-reparateur-cheveux-21",
    },
    {
      id: 22,
      title: "Laque fixation forte",
      description: "Fixation 24h, protection contre l’humidité",
      price: 950,
      code: "HS022",
      image: "/Img/ProductImage.jpg",
      brand: "maybelline",
      brandName: "Maybelline",
      slug: "laque-fixation-forte-22",
    },
    {
      id: 23,
      title: "Huile cheveux argan",
      description: "Protection contre la chaleur, brillance sans alourdir",
      price: 2400,
      code: "HO023",
      image: "/Img/ProductImage.jpg",
      brand: "estee-lauder",
      brandName: "Estée Lauder",
      slug: "huile-cheveux-argan-23",
    },
    {
      id: 24,
      title: "Spray thermoprotecteur",
      description: "Protection jusqu’à 230°C, prévient la casse",
      price: 1600,
      code: "HT024",
      image: "/Img/ProductImage.jpg",
      brand: "clarins",
      brandName: "Clarins",
      slug: "spray-thermoprotecteur-24",
    },
  ];

  const handleBrandChange = (brandId) => {
    setActiveBrand(brandId);
    setCurrentPage(1);
  };

  const filteredProducts =
    activeBrand === "all"
      ? products
      : products.filter((product) => product.brand === activeBrand);

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
          alt="Nos cosmétiques"
          width={1920}
          height={500}
          className="products-hero__image"
          priority={true}
        />
      </section>

      <div className="container">
        <div className="products-hero__content">
          <h1>Nos cosmétiques</h1>
          <p>Cosmétiques professionnels des principales marques mondiales</p>
        </div>
        <div className="products-info">
          <p className="products-info__total">
            Produits trouvés : <span>{filteredProducts.length}</span>
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
