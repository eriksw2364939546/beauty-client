"use client";

import { useState } from "react";
import Link from "next/link";
import { deletePrice } from "@/actions/price.actions";
import { formatPrice } from "@/lib/utils";
import "./PricesPage.scss";

/**
 * Страница списка расценок
 *
 * @param {object} props
 * @param {array} props.prices - массив расценок
 */
export default function PricesPage({ prices = [] }) {
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState(null);

  /**
   * Получить ID (поддержка _id и id)
   */
  const getId = (item) => item._id || item.id;

  /**
   * Удалить расценку
   */
  const handleDelete = async (id, title) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer "${title}" ?`)) {
      return;
    }

    setDeletingId(id);
    setError(null);

    const result = await deletePrice(id);

    if (!result.success) {
      setError(result.error);
    }

    setDeletingId(null);
  };

  return (
    <div className="prices-page">
      {/* Header */}
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Tarifs</h1>
          <p className="admin-page__subtitle">
            {prices.length} tarif{prices.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/beauty-admin/prices-admin/new"
          className="btn btn--primary"
        >
          <span className="material-icons">add</span>
          Nouveau tarif
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
        {prices.length === 0 ? (
          <div className="admin-page__empty">
            <span className="material-icons admin-page__empty-icon">euro</span>
            <p className="admin-page__empty-text">Aucun tarif pour le moment</p>
            <Link
              href="/beauty-admin/prices-admin/new"
              className="btn btn--primary"
            >
              Ajouter un tarif
            </Link>
          </div>
        ) : (
          <div className="admin-page__table-wrapper">
            <table className="admin-page__table">
              <thead>
                <tr>
                  <th>Titre</th>
                  <th>Service</th>
                  <th>Prix</th>
                  <th>Ordre</th>
                  <th style={{ width: "120px", textAlign: "right" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {prices.map((price) => (
                  <tr key={getId(price)}>
                    <td>
                      <span className="prices-page__title">{price.title}</span>
                    </td>
                    <td>
                      <span className="badge badge--price">
                        {price.service?.title || "—"}
                      </span>
                    </td>
                    <td>
                      <span className="prices-page__price">
                        {formatPrice(price.price)}
                      </span>
                    </td>
                    <td>{price.sortOrder}</td>
                    <td>
                      <div className="admin-page__table-actions">
                        <Link
                          href={`/beauty-admin/prices-admin/${getId(
                            price
                          )}/edit`}
                          className="btn btn--ghost btn--sm"
                          title="Modifier"
                        >
                          <span className="material-icons">edit</span>
                        </Link>
                        <button
                          type="button"
                          className="btn btn--danger btn--sm"
                          onClick={() =>
                            handleDelete(getId(price), price.title)
                          }
                          disabled={deletingId === getId(price)}
                          title="Supprimer"
                        >
                          <span className="material-icons">
                            {deletingId === getId(price)
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
