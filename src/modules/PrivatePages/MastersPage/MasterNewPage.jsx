"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createMaster } from "@/actions/master.actions";
import { ArrowLeft, AlertCircle, Save } from "lucide-react";
import "./MasterFormPage.scss";

/**
 * Страница создания мастера
 */
export default function MasterNewPage() {
  const router = useRouter();
  const [preview, setPreview] = useState(null);

  const [state, formAction, isPending] = useActionState(createMaster, {
    success: false,
    error: null,
  });

  // При успехе — редирект на список
  useEffect(() => {
    if (state.success) {
      router.push("/beauty-admin/masters-admin");
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
    <div className="master-form-page">
      {/* Header */}
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Nouveau professionnel</h1>
          <p className="admin-page__subtitle">Ajouter un membre de l'équipe</p>
        </div>
        <Link href="/beauty-admin/masters-admin" className="btn btn--secondary">
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

          {/* Full Name */}
          <div className="admin-page__form-group">
            <label htmlFor="fullName" className="admin-page__form-label">
              Nom complet *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="admin-page__form-input"
              placeholder="Ex: Marie Dupont"
              required
              minLength={2}
              autoFocus
            />
          </div>

          {/* Speciality */}
          <div className="admin-page__form-group">
            <label htmlFor="speciality" className="admin-page__form-label">
              Spécialité *
            </label>
            <input
              type="text"
              id="speciality"
              name="speciality"
              className="admin-page__form-input"
              placeholder="Ex: Coiffeuse, Esthéticienne"
              required
              minLength={2}
            />
          </div>

          {/* Image */}
          <div className="admin-page__form-group">
            <label htmlFor="image" className="admin-page__form-label">
              Photo *
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
              <div className="master-form-page__preview">
                <Image
                  src={preview}
                  alt="Aperçu"
                  width={150}
                  height={150}
                  className="master-form-page__preview-image"
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
                  Créer le professionnel
                </>
              )}
            </button>
            <Link
              href="/beauty-admin/masters-admin"
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
