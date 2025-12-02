"use client";
import "./ProductCard.scss";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }) => {
  return (
    <Link href={`/products/${product.slug}`} className="product-card">
      <div className="product-card__image-wrapper">
        <Image
          src={product.image}
          alt={product.title}
          width={200}
          height={200}
          className="product-card__image"
        />
      </div>

      <div className="product-card__info">
        <div className="product-card__header">
          <h3 className="product-card__title">{product.title}</h3>
          <div className="product-card__brand">{product.brandName}</div>
        </div>

        <p className="product-card__description">{product.description}</p>

        <div className="product-card__footer">
          <div className="product-card__code">Код: {product.code}</div>
          <div className="product-card__price">
            {product.price.toLocaleString("ru-RU")} ₽
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
