"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { updateMaster } from "@/actions/master.actions";
import { getImageUrl } from "@/lib/utils";
import { ArrowLeft, AlertCircle, Save } from "lucide-react";
import "./MasterFormPage.scss";

/**
 * Страница редактирования мастера
 *
 * @param {object} props
 * @param {object} props.master - данные мастера
 */
export default function MasterEditPage({ master }) {
  const router = useRouter();
  const [preview, setPreview] = useState(null);

  // Получаем id (поддержка _id и id)
  const masterId = master._id || master.id;

  // Bind id к action
  const updateMasterWithId = updateMaster.bind(null, masterId);

  const [state, formAction, isPending] = useActionState(updateMasterWithId, {
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
   * Превью нового изображения
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

  /**
   * Кастомный обработчик формы
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Удаляем поле image, если оно пустое
    const imageFile = formData.get("image");
    if (!imageFile || imageFile.size === 0) {
      formData.delete("image");
    }

    // Вызываем action
    formAction(formData);
  };

  return (
    <div className="master-form-page">
      {/* Header */}
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Modifier le professionnel</h1>
          <p className="admin-page__subtitle">{master.fullName}</p>
        </div>
        <Link href="/beauty-admin/masters-admin" className="btn btn--secondary">
          <ArrowLeft size={20} />
          Retour
        </Link>
      </div>

      {/* Form */}
      <div className="admin-page__card">
        <form onSubmit={handleSubmit} className="admin-page__form">
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
              defaultValue={master.fullName}
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
              defaultValue={master.speciality}
            />
          </div>

          {/* Current Image */}
          <div className="admin-page__form-group">
            <label className="admin-page__form-label">Photo actuelle</label>
            <div className="master-form-page__current-image">
              <Image
                src={getImageUrl(master.image)}
                alt={master.fullName}
                width={150}
                height={150}
                className="master-form-page__preview-image"
              />
            </div>
          </div>

          {/* New Image */}
          <div className="admin-page__form-group">
            <label htmlFor="image" className="admin-page__form-label">
              Nouvelle photo (optionnel)
            </label>
            <input
              type="file"
              id="image"
              name="image"
              className="admin-page__form-input"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
            />
            <span className="admin-page__form-hint">
              Laissez vide pour conserver la photo actuelle. JPEG, PNG ou WebP.
              Maximum 5 Mo.
            </span>

            {/* Preview */}
            {preview && (
              <div className="master-form-page__preview">
                <span className="master-form-page__current-image-label">
                  Nouvelle photo :
                </span>
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
