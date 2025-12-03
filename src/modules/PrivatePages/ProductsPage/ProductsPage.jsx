"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { deleteProduct } from "@/actions/product.actions";
import { getImageUrl, formatPrice } from "@/lib/utils";
import "./ProductsPage.scss";

/**
 * Страница списка товаров
 *
 * @param {object} props
 * @param {array} props.products - массив товаров
 */
export default function ProductsPage({ products }) {
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState(null);

  /**
   * Удалить товар
   */
  const handleDelete = async (id, title) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer "${title}" ?`)) {
      return;
    }

    setDeletingId(id);
    setError(null);

    const result = await deleteProduct(id);

    if (!result.success) {
      setError(result.error);
    }

    setDeletingId(null);
  };

  return (
    <div className="products-page">
      {/* Header */}
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Produits</h1>
          <p className="admin-page__subtitle">
            {products.length} produit{products.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link href="/beauty-admin/products/new" className="btn btn--primary">
          <span className="material-icons">add</span>
          Nouveau produit
        </Link>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="alert alert--error">
          <span className="material-icons">error</span>
          <span>{error}</span>
        </div>
      )}

      {/* Content */}
      <div className="admin-page__card">
        {products.length === 0 ? (
          <div className="admin-page__empty">
            <span className="material-icons admin-page__empty-icon">
              inventory_2
            </span>
            <p className="admin-page__empty-text">
              Aucun produit pour le moment
            </p>
            <Link
              href="/beauty-admin/products/new"
              className="btn btn--primary"
            >
              Ajouter un produit
            </Link>
          </div>
        ) : (
          <div className="admin-page__table-wrapper">
            <table className="admin-page__table">
              <thead>
                <tr>
                  <th style={{ width: "80px" }}>Image</th>
                  <th>Titre</th>
                  <th>Marque</th>
                  <th>Code</th>
                  <th>Prix</th>
                  <th style={{ width: "120px", textAlign: "right" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>
                      <Image
                        src={getImageUrl(product.image)}
                        alt={product.title}
                        width={60}
                        height={60}
                        className="admin-page__table-image"
                      />
                    </td>
                    <td>
                      <span className="products-page__title">
                        {product.title}
                      </span>
                    </td>
                    <td>
                      <span className="badge badge--product">
                        {product.brand}
                      </span>
                    </td>
                    <td>
                      <code className="products-page__code">
                        {product.code}
                      </code>
                    </td>
                    <td>
                      <span className="products-page__price">
                        {formatPrice(product.price)}
                      </span>
                    </td>
                    <td>
                      <div className="admin-page__table-actions">
                        <Link
                          href={`/beauty-admin/products/${product._id}/edit`}
                          className="btn btn--ghost btn--sm"
                          title="Modifier"
                        >
                          <span className="material-icons">edit</span>
                        </Link>
                        <button
                          type="button"
                          className="btn btn--danger btn--sm"
                          onClick={() =>
                            handleDelete(product._id, product.title)
                          }
                          disabled={deletingId === product._id}
                          title="Supprimer"
                        >
                          <span className="material-icons">
                            {deletingId === product._id
                              ? "hourglass_empty"
                              : "delete"}
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
