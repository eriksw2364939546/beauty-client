"use client";
import "./ProductList.scss";
import ProductCard from "../ProductCard/ProductCard";

const ProductList = ({ products }) => {
  if (products.length === 0) {
    return (
      <div className="product-list-empty">
        <p>Товары не найдены</p>
      </div>
    );
  }

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
