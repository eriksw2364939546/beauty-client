"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { deleteProduct } from "@/actions/product.actions";
import { getImageUrl, formatPrice } from "@/lib/utils";
import {
  Plus,
  AlertCircle,
  Package,
  Edit,
  Trash2,
  Loader2,
} from "lucide-react";
import SearchProductAdmin from "@/components/SearchProduct/SearchProductAdmin"; // Добавляем импорт
import "./ProductsPage.scss";

/**
 * Страница списка товаров
 *
 * @param {object} props
 * @param {array} props.products - массив товаров
 * @param {string} props.initialSearch - начальный поисковый запрос из URL
 */
export default function ProductsPage({ products = [], initialSearch = "" }) {
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState(null);

  /**
   * Получить ID (поддержка _id и id)
   */
  const getId = (item) => item._id || item.id;

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
        <Link
          href="/beauty-admin/products-admin/new"
          className="btn btn--primary"
        >
          <Plus size={20} />
          Nouveau produit
        </Link>
      </div>

      {/* Компонент поиска для админки */}
      <div className="admin-page__search-container">
        <SearchProductAdmin initialSearch={initialSearch} />
      </div>

      {/* Error Alert */}
      {error && (
        <div className="alert alert--error">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {/* Content */}
      <div className="admin-page__card">
        {products.length === 0 ? (
          <div className="admin-page__empty">
            <Package size={48} className="admin-page__empty-icon" />
            <p className="admin-page__empty-text">
              {initialSearch
                ? `Aucun produit trouvé pour "${initialSearch}"`
                : "Aucun produit pour le moment"}
            </p>
            {!initialSearch && (
              <Link
                href="/beauty-admin/products-admin/new"
                className="btn btn--primary"
              >
                Ajouter un produit
              </Link>
            )}
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
                  <tr key={getId(product)}>
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
                          href={`/beauty-admin/products-admin/${getId(
                            product
                          )}/edit`}
                          className="btn btn--ghost btn--sm"
                          title="Modifier"
                        >
                          <Edit size={18} />
                        </Link>
                        <button
                          type="button"
                          className="btn btn--danger btn--sm"
                          onClick={() =>
                            handleDelete(getId(product), product.title)
                          }
                          disabled={deletingId === getId(product)}
                          title="Supprimer"
                        >
                          {deletingId === getId(product) ? (
                            <Loader2 size={18} className="spinner" />
                          ) : (
                            <Trash2 size={18} />
                          )}
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
