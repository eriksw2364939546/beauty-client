"use client";
import "./ProductDetailPage.scss";
import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/lib/utils";

const ProductDetailPage = ({ product }) => {
  // Получаем полный URL изображения
  const imageUrl = getImageUrl(product.image);

  // Получаем название бренда
  const brandName = product.category?.title || product.brand || "Unknown";

  return (
    <main className="product-page">
      <div className="container">
        {/* Bouton retour */}
        <div className="product-back">
          <Link href="/products" className="product-back__link">
            ← Retour au catalogue
          </Link>
        </div>

        <div className="product-content">
          {/* Image principale */}
          <div className="product-image">
            <Image
              src={imageUrl}
              alt={product.title}
              width={500}
              height={500}
              className="product-image__main"
              priority
            />
          </div>

          {/* Informations sur le produit */}
          <div className="product-info">
            {/* Nom */}
            <h1 className="product-info__title">{product.title}</h1>

            {/* Marque */}
            <div className="product-info__brand">{brandName}</div>

            {/* Code */}
            <div className="product-info__code">Référence : {product.code}</div>

            {/* Description */}
            <div className="product-info__description">
              <p>{product.description}</p>
            </div>

            {/* Prix */}
            <div className="product-info__price">
              {product.price.toLocaleString("fr-FR")} €
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailPage;
