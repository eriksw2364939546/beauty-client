"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createCategory } from "@/actions/category.actions";
import { SECTION_NAMES } from "@/lib/utils";
import { ArrowLeft, AlertCircle, Save } from "lucide-react";
import "./CategoryFormPage.scss";

/**
 * Страница создания категории
 */
export default function CategoryNewPage() {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(createCategory, {
    success: false,
    error: null,
  });

  // При успехе — редирект на список
  useEffect(() => {
    if (state.success) {
      router.push("/beauty-admin/categories-admin");
    }
  }, [state.success, router]);

  const sections = [
    { value: "service", label: SECTION_NAMES.service },
    { value: "price", label: SECTION_NAMES.price },
    { value: "product", label: SECTION_NAMES.product },
  ];

  return (
    <div className="category-form-page">
      {/* Header */}
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Nouvelle catégorie</h1>
          <p className="admin-page__subtitle">Créer une nouvelle catégorie</p>
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
              autoFocus
            />
            <span className="admin-page__form-hint">Minimum 2 caractères</span>
          </div>

          {/* Section */}
          <div className="admin-page__form-group">
            <label htmlFor="section" className="admin-page__form-label">
              Section *
            </label>
            <select
              id="section"
              name="section"
              className="admin-page__form-select"
              required
              defaultValue=""
            >
              <option value="" disabled>
                Sélectionner une section
              </option>
              {sections.map((section) => (
                <option key={section.value} value={section.value}>
                  {section.label}
                </option>
              ))}
            </select>
            <span className="admin-page__form-hint">
              Détermine où la catégorie sera utilisée
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
              defaultValue={0}
              min={0}
            />
            <span className="admin-page__form-hint">
              Les catégories sont triées par ordre croissant
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
                  Création...
                </>
              ) : (
                <>
                  <Save size={20} />
                  Créer la catégorie
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
