"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createService } from "@/actions/service.actions";
import { ArrowLeft, AlertCircle, Save } from "lucide-react";
import "./ServiceFormPage.scss";

/**
 * Страница создания услуги
 *
 * @param {object} props
 * @param {array} props.categories - категории для select (section: 'service')
 */
export default function ServiceNewPage({ categories }) {
  const router = useRouter();
  const [preview, setPreview] = useState(null);

  const [state, formAction, isPending] = useActionState(createService, {
    success: false,
    error: null,
  });

  // При успехе — редирект на список
  useEffect(() => {
    if (state.success) {
      router.push("/beauty-admin/services-admin");
    }
  }, [state.success, router]);

  /**
   * Превью изображения
   */
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    } else {
      setPreview(null);
    }
  };

  return (
    <div className="service-form-page">
      {/* Header */}
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Nouveau service</h1>
          <p className="admin-page__subtitle">Créer un nouveau service</p>
        </div>
        <Link
          href="/beauty-admin/services-admin"
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
              placeholder="Ex: Coupe femme"
              required
              minLength={2}
              autoFocus
            />
          </div>

          {/* Description */}
          <div className="admin-page__form-group">
            <label htmlFor="description" className="admin-page__form-label">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              className="admin-page__form-textarea"
              placeholder="Description du service..."
              required
              minLength={10}
              rows={4}
            />
            <span className="admin-page__form-hint">Minimum 10 caractères</span>
          </div>

          {/* Category */}
          <div className="admin-page__form-group">
            <label htmlFor="categoryId" className="admin-page__form-label">
              Catégorie *
            </label>
            <select
              id="categoryId"
              name="categoryId"
              className="admin-page__form-select"
              required
              defaultValue=""
            >
              <option value="" disabled>
                Sélectionner une catégorie
              </option>
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Image */}
          <div className="admin-page__form-group">
            <label htmlFor="image" className="admin-page__form-label">
              Image *
            </label>
            <input
              type="file"
              id="image"
              name="image"
              className="admin-page__form-input"
              accept="image/jpeg,image/png,image/webp"
              required
              onChange={handleImageChange}
            />
            <span className="admin-page__form-hint">
              JPEG, PNG ou WebP. Maximum 5 Mo.
            </span>

            {/* Preview */}
            {preview && (
              <div className="service-form-page__preview">
                <Image
                  src={preview}
                  alt="Aperçu"
                  width={200}
                  height={200}
                  className="service-form-page__preview-image"
                />
              </div>
            )}
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
                  Créer le service
                </>
              )}
            </button>
            <Link
              href="/beauty-admin/services-admin"
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
