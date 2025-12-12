"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { updateCategory } from "@/actions/category.actions";
import { SECTION_NAMES } from "@/lib/utils";
import { ArrowLeft, AlertCircle, CheckCircle, Save } from "lucide-react";
import "./CategoryFormPage.scss";

/**
 * Страница редактирования категории
 *
 * @param {object} props
 * @param {object} props.category - данные категории
 */
export default function CategoryEditPage({ category }) {
  const router = useRouter();

  // Получаем id (поддержка _id и id)
  const categoryId = category._id || category.id;

  // Bind id к action
  const updateCategoryWithId = updateCategory.bind(null, categoryId);

  const [state, formAction, isPending] = useActionState(updateCategoryWithId, {
    success: false,
    error: null,
  });

  // При успехе — редирект на список
  useEffect(() => {
    if (state.success) {
      router.push("/beauty-admin/categories-admin");
    }
  }, [state.success, router]);

  return (
    <div className="category-form-page">
      {/* Header */}
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Modifier la catégorie</h1>
          <p className="admin-page__subtitle">{category.title}</p>
        </div>
        <Link
          href="/beauty-admin/categories-admin"
          className="btn btn--secondary"
        >
          <ArrowLeft size={20} />
          Retour
        </Link>
      </div>

      {/* Form */}
      <div className="admin-page__card">
        <form action={formAction} className="admin-page__form">
          {/* Error */}
          {state.error && (
            <div className="alert alert--error">
              <AlertCircle size={20} />
              <span>{state.error}</span>
            </div>
          )}

          {/* Success */}
          {state.success && (
            <div className="alert alert--success">
              <CheckCircle size={20} />
              <span>{state.message}</span>
            </div>
          )}

          {/* Title */}
          <div className="admin-page__form-group">
            <label htmlFor="title" className="admin-page__form-label">
              Titre *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="admin-page__form-input"
              placeholder="Ex: Coiffure"
              required
              minLength={2}
              defaultValue={category.title}
              autoFocus
            />
            <span className="admin-page__form-hint">Minimum 2 caractères</span>
          </div>

          {/* Section (readonly) */}
          <div className="admin-page__form-group">
            <label className="admin-page__form-label">Section</label>
            <input
              type="text"
              className="admin-page__form-input"
              value={SECTION_NAMES[category.section] || category.section}
              disabled
            />
            <span className="admin-page__form-hint">
              La section ne peut pas être modifiée
            </span>
          </div>

          {/* Sort Order */}
          <div className="admin-page__form-group">
            <label htmlFor="sortOrder" className="admin-page__form-label">
              Ordre d'affichage
            </label>
            <input
              type="number"
              id="sortOrder"
              name="sortOrder"
              className="admin-page__form-input"
              placeholder="0"
              defaultValue={category.sortOrder}
              min={0}
            />
            <span className="admin-page__form-hint">
              Les catégories sont triées par ordre croissant
            </span>
          </div>

          {/* Slug (readonly) */}
          <div className="admin-page__form-group">
            <label className="admin-page__form-label">Slug</label>
            <input
              type="text"
              className="admin-page__form-input"
              value={category.slug}
              disabled
            />
            <span className="admin-page__form-hint">
              Généré automatiquement à partir du titre
            </span>
          </div>

          {/* Actions */}
          <div className="admin-page__form-actions">
            <button
              type="submit"
              className="btn btn--primary"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <span className="btn__spinner" />
                  Enregistrement...
                </>
              ) : (
                <>
                  <Save size={20} />
                  Enregistrer
                </>
              )}
            </button>
            <Link
              href="/beauty-admin/categories-admin"
              className="btn btn--secondary"
            >
              Annuler
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
