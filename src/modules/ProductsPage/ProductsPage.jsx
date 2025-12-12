"use client";
import "./ProductsPage.scss";
import Image from "next/image";
import ProductFilters from "@/components/ProductFilters/ProductFilters";
import ProductList from "@/components/ProductList/ProductList";
import Pagination from "@/components/Pagination/Pagination";
import SearchProduct from "@/components/SearchProduct/SearchProduct";
import { useRouter, useSearchParams } from "next/navigation";

const ProductsPage = ({
  initialProducts,
  initialMeta,
  categories,
  initialCategory,
  initialPage,
  initialSearch = "",
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryChange = (categoryId) => {
    const params = new URLSearchParams(searchParams);

    if (categoryId === "all") {
      params.delete("category");
    } else {
      params.set("category", categoryId);
    }

    // Сбрасываем страницу при смене категории
    params.delete("page");

    const queryString = params.toString();

    // scroll: false - не скроллим вверх
    router.push(queryString ? `/products?${queryString}` : "/products", {
      scroll: false,
    });
  };

  const handlePageChange = (pageNumber) => {
    const params = new URLSearchParams(searchParams);

    if (pageNumber === 1) {
      params.delete("page");
    } else {
      params.set("page", pageNumber.toString());
    }

    const queryString = params.toString();

    // scroll: false - не скроллим вверх
    router.push(queryString ? `/products?${queryString}` : "/products", {
      scroll: false,
    });
  };

  return (
    <main className="products-page">
      {/* Главная картинка с заголовком */}
      <div className="products-hero__image">
        <Image
          src="/Img/products-hero.jpg"
          alt="Nos cosmétiques"
          width={1920}
          height={500}
          className="products-hero__image"
          priority={true}
        />
      </div>

      <div className="container">
        <div className="products-hero__content">
          <h1>Nos cosmétiques</h1>
          <p>Cosmétiques professionnels des principales marques mondiales</p>
        </div>

        {/* Компонент поиска */}
        <SearchProduct initialSearch={initialSearch} />

        <div className="products-info">
          <p className="products-info__total">
            Produits trouvés : <span>{initialMeta.total}</span>
          </p>
        </div>

        <ProductFilters
          brands={categories}
          activeBrand={initialCategory}
          onBrandChange={handleCategoryChange}
        />

        <div className="products-page__list">
          <ProductList products={initialProducts} />
        </div>

        {initialMeta.pages > 1 && (
          <Pagination
            currentPage={initialPage}
            totalPages={initialMeta.pages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </main>
  );
};

export default ProductsPage;
