"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createProduct } from "@/actions/product.actions";
import { ArrowLeft, AlertCircle, Save } from "lucide-react";
import "./ProductFormPage.scss";

/**
 * Страница создания товара
 *
 * @param {object} props
 * @param {array} props.categories - категории для select (section: 'product')
 * @param {array} props.brands - список брендов для datalist
 */
export default function ProductNewPage({ categories, brands }) {
  const router = useRouter();
  const [preview, setPreview] = useState(null);

  const [state, formAction, isPending] = useActionState(createProduct, {
    success: false,
    error: null,
  });

  // При успехе — редирект на список
  useEffect(() => {
    if (state.success) {
      router.push("/beauty-admin/products-admin");
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
    <div className="product-form-page">
      {/* Header */}
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Nouveau produit</h1>
          <p className="admin-page__subtitle">
            Ajouter un produit au catalogue
          </p>
        </div>
        <Link
          href="/beauty-admin/products-admin"
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
              placeholder="Ex: Shampoing réparateur"
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
              placeholder="Description du produit..."
              required
              minLength={10}
              rows={4}
            />
          </div>

          {/* Brand */}
          <div className="admin-page__form-group">
            <label htmlFor="brand" className="admin-page__form-label">
              Marque *
            </label>
            <input
              type="text"
              id="brand"
              name="brand"
              className="admin-page__form-input"
              placeholder="Ex: L'Oréal"
              required
              list="brands-list"
            />
            <datalist id="brands-list">
              {brands.map((brand) => (
                <option key={brand} value={brand} />
              ))}
            </datalist>
            <span className="admin-page__form-hint">
              Saisissez une marque existante ou créez-en une nouvelle
            </span>
          </div>

          {/* Code */}
          <div className="admin-page__form-group">
            <label htmlFor="code" className="admin-page__form-label">
              Code article *
            </label>
            <input
              type="text"
              id="code"
              name="code"
              className="admin-page__form-input"
              placeholder="Ex: SHP-001"
              required
            />
            <span className="admin-page__form-hint">
              Référence unique du produit
            </span>
          </div>

          {/* Price */}
          <div className="admin-page__form-group">
            <label htmlFor="price" className="admin-page__form-label">
              Prix (€) *
            </label>
            <input
              type="number"
              id="price"
              name="price"
              className="admin-page__form-input"
              placeholder="0.00"
              required
              min="0.01"
              step="0.01"
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
              <div className="product-form-page__preview">
                <Image
                  src={preview}
                  alt="Aperçu"
                  width={200}
                  height={200}
                  className="product-form-page__preview-image"
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
                  Créer le produit
                </>
              )}
            </button>
            <Link
              href="/beauty-admin/products-admin"
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
