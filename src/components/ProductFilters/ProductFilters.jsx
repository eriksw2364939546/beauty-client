"use client";
import "./ProductFilters.scss";

const ProductFilters = ({ brands, activeBrand, onBrandChange }) => {
  return (
    <div className="product-filters">
      <div className="product-filters__wrapper">
        {brands &&
          brands.map((brand) => (
            <button
              key={brand._id || brand.id || `brand-${brand.title}`}
              className={`product-filters__button ${
                activeBrand === (brand._id || brand.id)
                  ? "product-filters__button--active"
                  : ""
              }`}
              onClick={() => onBrandChange(brand._id || brand.id)}
              disabled={activeBrand === (brand._id || brand.id)}
            >
              {brand.title}
            </button>
          ))}
      </div>
    </div>
  );
};

export default ProductFilters;
