"use client";
import "./ProductPage.scss";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProductPage = () => {
  const { slug } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Моковые данные - такие же как в ProductsPage
  const allProducts = [
    {
      id: 1,
      slug: "uvlazhnyayushchiy-krem-dlya-litsa-1",
      title: "Увлажняющий крем для лица",
      description:
        "Интенсивное увлажнение на 24 часа, подходит для всех типов кожи",
      price: 1500,
      code: "CR001",
      image: "/img/ProductImage.jpg",
      brand: "loreal",
      brandName: "L'Oreal",
    },
    {
      id: 2,
      slug: "toniruyushchiy-krem-osnova-2",
      title: "Тонирующий крем-основа",
      description: "Легкое покрытие, SPF 30, натуральный финиш",
      price: 2200,
      code: "FD002",
      image: "/img/ProductImage.jpg",
      brand: "garnier",
      brandName: "Garnier",
    },
    // Добавь остальные товары сюда...
  ];

  useEffect(() => {
    // Находим товар по slug
    const foundProduct = allProducts.find((p) => p.slug === slug);

    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      router.push("/products");
    }

    setLoading(false);
  }, [slug, router]);

  if (loading) {
    return (
      <div className="product-page-loading">
        <div className="container">
          <p>Загрузка товара...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-page-not-found">
        <div className="container">
          <h1>Товар не найден</h1>
          <Link href="/products">Вернуться к каталогу</Link>
        </div>
      </div>
    );
  }

  return (
    <main className="product-page">
      <div className="container">
        {/* Кнопка назад */}
        <div className="product-back">
          <Link href="/products" className="product-back__link">
            ← Назад к каталогу
          </Link>
        </div>

        <div className="product-content">
          {/* Одно изображение */}
          <div className="product-image">
            <Image
              src={product.image}
              alt={product.title}
              width={500}
              height={500}
              className="product-image__main"
            />
          </div>

          {/* Информация о товаре - только самое необходимое */}
          <div className="product-info">
            {/* Название */}
            <h1 className="product-info__title">{product.title}</h1>

            {/* Бренд */}
            <div className="product-info__brand">{product.brandName}</div>

            {/* Код */}
            <div className="product-info__code">Артикул: {product.code}</div>

            {/* Описание */}
            <div className="product-info__description">
              <p>{product.description}</p>
            </div>

            {/* Цена */}
            <div className="product-info__price">
              {product.price.toLocaleString("ru-RU")} ₽
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductPage;
