"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { deleteService } from "@/actions/service.actions";
import { getImageUrl } from "@/lib/utils";
import {
  Plus,
  AlertCircle,
  Scissors,
  Edit,
  Trash2,
  Hourglass,
} from "lucide-react";
import "./ServicesPage.scss";

/**
 * Страница списка услуг
 *
 * @param {object} props
 * @param {array} props.services - массив услуг
 */
export default function ServicesPage({ services = [] }) {
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState(null);

  /**
   * Получить ID (поддержка _id и id)
   */
  const getId = (item) => item._id || item.id;

  /**
   * Удалить услугу
   */
  const handleDelete = async (id, title) => {
    if (
      !confirm(`Êtes-vous sûr de vouloir supprimer le service "${title}" ?`)
    ) {
      return;
    }

    setDeletingId(id);
    setError(null);

    const result = await deleteService(id);

    if (!result.success) {
      setError(result.error);
    }

    setDeletingId(null);
  };

  return (
    <div className="services-page">
      {/* Header */}
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Services</h1>
          <p className="admin-page__subtitle">
            {services.length} service{services.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/beauty-admin/services-admin/new"
          className="btn btn--primary"
        >
          <Plus size={18} />
          Nouveau service
        </Link>
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
        {services.length === 0 ? (
          <div className="admin-page__empty">
            <Scissors className="admin-page__empty-icon" size={48} />
            <p className="admin-page__empty-text">
              Aucun service pour le moment
            </p>
            <Link
              href="/beauty-admin/services-admin/new"
              className="btn btn--primary"
            >
              Créer un service
            </Link>
          </div>
        ) : (
          <div className="admin-page__table-wrapper">
            <table className="admin-page__table">
              <thead>
                <tr>
                  <th style={{ width: "80px" }}>Image</th>
                  <th>Titre</th>
                  <th>Catégorie</th>
                  <th>Slug</th>
                  <th style={{ width: "120px", textAlign: "right" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={getId(service)}>
                    <td>
                      <Image
                        src={getImageUrl(service.image)}
                        alt={service.title}
                        width={60}
                        height={60}
                        className="admin-page__table-image"
                      />
                    </td>
                    <td>
                      <span className="services-page__title">
                        {service.title}
                      </span>
                    </td>
                    <td>
                      <span className="badge badge--service">
                        {service.category?.title || "—"}
                      </span>
                    </td>
                    <td>
                      <code className="services-page__slug">
                        {service.slug}
                      </code>
                    </td>
                    <td>
                      <div className="admin-page__table-actions">
                        <Link
                          href={`/beauty-admin/services-admin/${getId(
                            service
                          )}/edit`}
                          className="btn btn--ghost btn--sm"
                          title="Modifier"
                        >
                          <Edit size={16} />
                        </Link>
                        <button
                          type="button"
                          className="btn btn--danger btn--sm"
                          onClick={() =>
                            handleDelete(getId(service), service.title)
                          }
                          disabled={deletingId === getId(service)}
                          title="Supprimer"
                        >
                          {deletingId === getId(service) ? (
                            <Hourglass size={16} />
                          ) : (
                            <Trash2 size={16} />
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
