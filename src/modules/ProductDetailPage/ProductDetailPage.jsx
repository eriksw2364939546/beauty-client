"use client";
import "./ProductDetailPage.scss";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProductDetailPage = () => {
  const { slug } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Données mock - les mêmes que dans ProductsPage
  const allProducts = [
    {
      id: 1,
      slug: "uvlazhnyayushchiy-krem-dlya-litsa-1",
      title: "Crème hydratante pour le visage",
      description:
        "Hydratation intense pendant 24h, convient à tous types de peau",
      price: 1500,
      code: "CR001",
      image: "/Img/ProductImage.jpg",
      brand: "loreal",
      brandName: "L'Oreal",
    },
    {
      id: 2,
      slug: "toniruyushchiy-krem-osnova-2",
      title: "Crème de teint",
      description: "Couverture légère, SPF 30, fini naturel",
      price: 2200,
      code: "FD002",
      image: "/Img/ProductImage.jpg",
      brand: "garnier",
      brandName: "Garnier",
    },
    // Ajoute ici les autres produits...
  ];

  useEffect(() => {
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
          <p>Chargement du produit...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-page-not-found">
        <div className="container">
          <h1>Produit non trouvé</h1>
          <Link href="/products">Retour au catalogue</Link>
        </div>
      </div>
    );
  }

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
              src={product.image}
              alt={product.title}
              width={500}
              height={500}
              className="product-image__main"
            />
          </div>

          {/* Informations sur le produit */}
          <div className="product-info">
            {/* Nom */}
            <h1 className="product-info__title">{product.title}</h1>

            {/* Marque */}
            <div className="product-info__brand">{product.brandName}</div>

            {/* Code */}
            <div className="product-info__code">Référence : {product.code}</div>

            {/* Description */}
            <div className="product-info__description">
              <p>{product.description}</p>
            </div>

            {/* Prix */}
            <div className="product-info__price">
              {product.price.toLocaleString("fr-FR")} ₽
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailPage;
