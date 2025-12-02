"use client";
import "./ProductFilters.scss";

const ProductFilters = ({ brands, activeBrand, onBrandChange }) => {
  return (
    <div className="product-filters">
      <div className="product-filters__wrapper">
        {brands.map((brand) => (
          <button
            key={brand.id}
            className={`product-filters__button ${
              activeBrand === brand.id ? "product-filters__button--active" : ""
            }`}
            onClick={() => onBrandChange(brand.id)}
            disabled={activeBrand === brand.id}
          >
            {brand.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductFilters;
