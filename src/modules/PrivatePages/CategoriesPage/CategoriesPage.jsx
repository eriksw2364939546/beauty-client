"use client";

import { useState } from "react";
import Link from "next/link";
import { deleteCategory } from "@/actions/category.actions";
import { SECTION_NAMES } from "@/lib/utils";
import "./CategoriesPage.scss";

/**
 * Страница списка категорий
 *
 * @param {object} props
 * @param {array} props.categories - массив категорий
 */
export default function CategoriesPage({ categories }) {
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
        <Link href="/beauty-admin/categories/new" className="btn btn--primary">
          <span className="material-icons">add</span>
          Nouvelle catégorie
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
        {categories.length === 0 ? (
          <div className="admin-page__empty">
            <span className="material-icons admin-page__empty-icon">
              folder_off
            </span>
            <p className="admin-page__empty-text">
              Aucune catégorie pour le moment
            </p>
            <Link
              href="/beauty-admin/categories/new"
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
                  <tr key={category._id}>
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
                          href={`/beauty-admin/categories/${category._id}/edit`}
                          className="btn btn--ghost btn--sm"
                          title="Modifier"
                        >
                          <span className="material-icons">edit</span>
                        </Link>
                        <button
                          type="button"
                          className="btn btn--danger btn--sm"
                          onClick={() =>
                            handleDelete(category._id, category.title)
                          }
                          disabled={deletingId === category._id}
                          title="Supprimer"
                        >
                          <span className="material-icons">
                            {deletingId === category._id
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
