"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createWork } from "@/actions/work.actions";
import { ArrowLeft, AlertCircle, Save } from "lucide-react";
import "./WorkFormPage.scss";

/**
 * Страница создания работы
 *
 * @param {object} props
 * @param {array} props.services - услуги для select
 */
export default function WorkNewPage({ services }) {
  const router = useRouter();
  const [preview, setPreview] = useState(null);

  const [state, formAction, isPending] = useActionState(createWork, {
    success: false,
    error: null,
  });

  // При успехе — редирект на список
  useEffect(() => {
    if (state.success) {
      router.push("/beauty-admin/works-admin");
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
    <div className="work-form-page">
      {/* Header */}
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Nouvelle réalisation</h1>
          <p className="admin-page__subtitle">Ajouter une photo au portfolio</p>
        </div>
        <Link href="/beauty-admin/works-admin" className="btn btn--secondary">
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

          {/* Service */}
          <div className="admin-page__form-group">
            <label htmlFor="serviceId" className="admin-page__form-label">
              Service *
            </label>
            <select
              id="serviceId"
              name="serviceId"
              className="admin-page__form-select"
              required
              defaultValue=""
            >
              <option value="" disabled>
                Sélectionner un service
              </option>
              {services.map((service) => (
                <option key={service.value} value={service.value}>
                  {service.label}
                </option>
              ))}
            </select>
            <span className="admin-page__form-hint">
              Le service associé à cette réalisation
            </span>
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
              <div className="work-form-page__preview">
                <Image
                  src={preview}
                  alt="Aperçu"
                  width={300}
                  height={225}
                  className="work-form-page__preview-image"
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
                  Ajout...
                </>
              ) : (
                <>
                  <Save size={20} />
                  Ajouter la réalisation
                </>
              )}
            </button>
            <Link
              href="/beauty-admin/works-admin"
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
