"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { deleteMaster } from "@/actions/master.actions";
import { getImageUrl } from "@/lib/utils";
import { Plus, AlertCircle, Users, Edit, Trash2, Loader2 } from "lucide-react";
import "./MastersPage.scss";

/**
 * Страница списка мастеров
 *
 * @param {object} props
 * @param {array} props.masters - массив мастеров
 */
export default function MastersPage({ masters = [] }) {
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState(null);

  /**
   * Получить ID (поддержка _id и id)
   */
  const getId = (item) => item._id || item.id;

  /**
   * Удалить мастера
   */
  const handleDelete = async (id, name) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer "${name}" ?`)) {
      return;
    }

    setDeletingId(id);
    setError(null);

    const result = await deleteMaster(id);

    if (!result.success) {
      setError(result.error);
    }

    setDeletingId(null);
  };

  return (
    <div className="masters-page">
      {/* Header */}
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Professionnels</h1>
          <p className="admin-page__subtitle">
            {masters.length} professionnel{masters.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/beauty-admin/masters-admin/new"
          className="btn btn--primary"
        >
          <Plus size={20} />
          Nouveau professionnel
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
        {masters.length === 0 ? (
          <div className="admin-page__empty">
            <Users size={48} className="admin-page__empty-icon" />
            <p className="admin-page__empty-text">
              Aucun professionnel pour le moment
            </p>
            <Link
              href="/beauty-admin/masters-admin/new"
              className="btn btn--primary"
            >
              Ajouter un professionnel
            </Link>
          </div>
        ) : (
          <div className="admin-page__table-wrapper">
            <table className="admin-page__table">
              <thead>
                <tr>
                  <th style={{ width: "80px" }}>Photo</th>
                  <th>Nom</th>
                  <th>Spécialité</th>
                  <th style={{ width: "120px", textAlign: "right" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {masters.map((master) => (
                  <tr key={getId(master)}>
                    <td>
                      <Image
                        src={getImageUrl(master.image)}
                        alt={master.fullName}
                        width={60}
                        height={60}
                        className="admin-page__table-image"
                      />
                    </td>
                    <td>
                      <span className="masters-page__name">
                        {master.fullName}
                      </span>
                    </td>
                    <td>
                      <span className="badge badge--service">
                        {master.speciality}
                      </span>
                    </td>
                    <td>
                      <div className="admin-page__table-actions">
                        <Link
                          href={`/beauty-admin/masters-admin/${getId(
                            master
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
                            handleDelete(getId(master), master.fullName)
                          }
                          disabled={deletingId === getId(master)}
                          title="Supprimer"
                        >
                          {deletingId === getId(master) ? (
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
