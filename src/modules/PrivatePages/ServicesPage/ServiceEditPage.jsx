"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { updateService } from "@/actions/service.actions";
import { getImageUrl } from "@/lib/utils";
import { ArrowLeft, AlertCircle, Save } from "lucide-react";
import "./ServiceFormPage.scss";

/**
 * Страница редактирования услуги
 *
 * @param {object} props
 * @param {object} props.service - данные услуги
 * @param {array} props.categories - категории для select (section: 'service')
 */
export default function ServiceEditPage({ service, categories }) {
  const router = useRouter();
  const [preview, setPreview] = useState(null);

  // Получаем id (поддержка _id и id)
  const serviceId = service._id || service.id;

  // Bind id к action
  const updateServiceWithId = updateService.bind(null, serviceId);

  const [state, formAction, isPending] = useActionState(updateServiceWithId, {
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
    <div className="service-form-page">
      {/* Header */}
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Modifier le service</h1>
          <p className="admin-page__subtitle">{service.title}</p>
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
        <form onSubmit={handleSubmit} className="admin-page__form">
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
              defaultValue={service.title}
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
              defaultValue={service.description}
            />
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
              defaultValue={service.category?._id || ""}
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

          {/* Current Image */}
          <div className="admin-page__form-group">
            <label className="admin-page__form-label">Image actuelle</label>
            <div className="service-form-page__current-image">
              <Image
                src={getImageUrl(service.image)}
                alt={service.title}
                width={200}
                height={200}
                className="service-form-page__preview-image"
              />
            </div>
          </div>

          {/* New Image */}
          <div className="admin-page__form-group">
            <label htmlFor="image" className="admin-page__form-label">
              Nouvelle image (optionnel)
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
              Laissez vide pour conserver l'image actuelle. JPEG, PNG ou WebP.
              Maximum 5 Mo.
            </span>

            {/* Preview */}
            {preview && (
              <div className="service-form-page__preview">
                <span className="service-form-page__current-image-label">
                  Nouvelle image :
                </span>
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

          {/* Slug (readonly) */}
          <div className="admin-page__form-group">
            <label className="admin-page__form-label">Slug</label>
            <input
              type="text"
              className="admin-page__form-input"
              value={service.slug}
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
