"use client";

import { useState } from "react";
import Link from "next/link";
import { deleteCategory } from "@/actions/category.actions";
import { SECTION_NAMES } from "@/lib/utils";
import {
  Plus,
  FolderX,
  AlertCircle,
  Edit,
  Trash2,
  Loader2,
} from "lucide-react";
import "./CategoriesPage.scss";

/**
 * Страница списка категорий
 *
 * @param {object} props
 * @param {array} props.categories - массив категорий
 */
export default function CategoriesPage({ categories = [] }) {
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState(null);

  /**
   * Удалить категорию
   */
  const handleDelete = async (id, title) => {
    if (
      !confirm(`Êtes-vous sûr de vouloir supprimer la catégorie "${title}" ?`)
    ) {
      return;
    }

    setDeletingId(id);
    setError(null);

    const result = await deleteCategory(id);

    if (!result.success) {
      setError(result.error);
    }

    setDeletingId(null);
  };

  /**
   * Получить ID категории (поддержка _id и id)
   */
  const getId = (item) => item._id || item.id;

  /**
   * Получить badge класс для секции
   */
  const getSectionBadgeClass = (section) => {
    const classes = {
      service: "badge--service",
      work: "badge--work",
      price: "badge--price",
      product: "badge--product",
    };
    return classes[section] || "";
  };

  return (
    <div className="categories-page">
      {/* Header */}
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Catégories</h1>
          <p className="admin-page__subtitle">
            {categories.length} catégorie{categories.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/beauty-admin/categories-admin/new"
          className="btn btn--primary"
        >
          <Plus size={20} />
          Nouvelle catégorie
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
        {categories.length === 0 ? (
          <div className="admin-page__empty">
            <FolderX size={48} className="admin-page__empty-icon" />
            <p className="admin-page__empty-text">
              Aucune catégorie pour le moment
            </p>
            <Link
              href="/beauty-admin/categories-admin/new"
              className="btn btn--primary"
            >
              Créer une catégorie
            </Link>
          </div>
        ) : (
          <div className="admin-page__table-wrapper">
            <table className="admin-page__table">
              <thead>
                <tr>
                  <th>Titre</th>
                  <th>Section</th>
                  <th>Slug</th>
                  <th>Ordre</th>
                  <th style={{ width: "120px", textAlign: "right" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={getId(category)}>
                    <td>
                      <span className="categories-page__title">
                        {category.title}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge ${getSectionBadgeClass(
                          category.section
                        )}`}
                      >
                        {SECTION_NAMES[category.section] || category.section}
                      </span>
                    </td>
                    <td>
                      <code className="categories-page__slug">
                        {category.slug}
                      </code>
                    </td>
                    <td>{category.sortOrder}</td>
                    <td>
                      <div className="admin-page__table-actions">
                        <Link
                          href={`/beauty-admin/categories-admin/${getId(
                            category
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
                            handleDelete(getId(category), category.title)
                          }
                          disabled={deletingId === getId(category)}
                          title="Supprimer"
                        >
                          {deletingId === getId(category) ? (
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
