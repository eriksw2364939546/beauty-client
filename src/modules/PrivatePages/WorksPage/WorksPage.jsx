"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { deleteWork } from "@/actions/work.actions";
import { getImageUrl, formatDate } from "@/lib/utils";
import { Plus, AlertCircle, Images, Trash2, Loader2 } from "lucide-react";
import "./WorksPage.scss";

/**
 * Страница списка работ/портфолио
 *
 * @param {object} props
 * @param {array} props.works - массив работ
 */
export default function WorksPage({ works = [] }) {
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState(null);

  /**
   * Получить ID (поддержка _id и id)
   */
  const getId = (item) => item._id || item.id;

  /**
   * Удалить работу
   */
  const handleDelete = async (id) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette réalisation ?")) {
      return;
    }

    setDeletingId(id);
    setError(null);

    const result = await deleteWork(id);

    if (!result.success) {
      setError(result.error);
    }

    setDeletingId(null);
  };

  return (
    <div className="works-page">
      {/* Header */}
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Réalisations</h1>
          <p className="admin-page__subtitle">
            {works.length} réalisation{works.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link href="/beauty-admin/works-admin/new" className="btn btn--primary">
          <Plus size={20} />
          Nouvelle réalisation
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
        {works.length === 0 ? (
          <div className="admin-page__empty">
            <Images size={48} className="admin-page__empty-icon" />
            <p className="admin-page__empty-text">
              Aucune réalisation pour le moment
            </p>
            <Link
              href="/beauty-admin/works-admin/new"
              className="btn btn--primary"
            >
              Ajouter une réalisation
            </Link>
          </div>
        ) : (
          <div className="works-page__grid">
            {works.map((work) => (
              <div key={getId(work)} className="works-page__card">
                <div className="works-page__card-image">
                  <Image
                    src={getImageUrl(work.image)}
                    alt={work.service?.title || "Réalisation"}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="works-page__image"
                  />
                </div>
                <div className="works-page__card-content">
                  <span className="badge badge--work">
                    {work.service?.title || "—"}
                  </span>
                  <span className="works-page__date">
                    {formatDate(work.createdAt)}
                  </span>
                </div>
                <div className="works-page__card-actions">
                  <button
                    type="button"
                    className="btn btn--danger btn--sm"
                    onClick={() => handleDelete(getId(work))}
                    disabled={deletingId === getId(work)}
                    title="Supprimer"
                  >
                    {deletingId === getId(work) ? (
                      <Loader2 size={18} className="spinner" />
                    ) : (
                      <Trash2 size={18} />
                    )}
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
