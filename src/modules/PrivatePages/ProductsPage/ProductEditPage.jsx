"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { updateProduct } from "@/actions/product.actions";
import { getImageUrl } from "@/lib/utils";
import { ArrowLeft, AlertCircle, Save } from "lucide-react";
import "./ProductFormPage.scss";

/**
 * Страница редактирования товара
 *
 * @param {object} props
 * @param {object} props.product - данные товара
 * @param {array} props.categories - категории для select (section: 'product')
 * @param {array} props.brands - список брендов для datalist
 */
export default function ProductEditPage({ product, categories, brands }) {
  const router = useRouter();
  const [preview, setPreview] = useState(null);
  const [priceValue, setPriceValue] = useState(product.price?.toString() || "");

  // Получаем id (поддержка _id и id)
  const productId = product._id || product.id;

  // Bind id к action
  const updateProductWithId = updateProduct.bind(null, productId);

  const [state, formAction, isPending] = useActionState(updateProductWithId, {
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

    // Обработка цены - фиксим проблему с плавающей точкой
    const price = formData.get("price");
    if (price) {
      // Конвертируем строку в число и фиксим до 2 знаков после запятой
      const fixedPrice = parseFloat(price).toFixed(2);
      formData.set("price", fixedPrice);
    }

    // Вызываем action
    formAction(formData);
  };

  /**
   * Обработчик изменения цены
   */
  const handlePriceChange = (e) => {
    const value = e.target.value;
    setPriceValue(value);
  };

  /**
   * Форматирование цены при потере фокуса
   */
  const handlePriceBlur = (e) => {
    const value = e.target.value;
    if (value) {
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        const formatted = numValue.toFixed(2);
        setPriceValue(formatted);
        e.target.value = formatted;
      }
    }
  };

  return (
    <div className="product-form-page">
      {/* Header */}
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Modifier le produit</h1>
          <p className="admin-page__subtitle">{product.title}</p>
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
              placeholder="Ex: Shampoing réparateur"
              required
              minLength={2}
              defaultValue={product.title}
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
              defaultValue={product.description}
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
              defaultValue={product.brand}
            />
            <datalist id="brands-list">
              {brands.map((brand) => (
                <option key={brand} value={brand} />
              ))}
            </datalist>
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
              defaultValue={product.code}
            />
          </div>

          {/* Price - с фиксом проблемы плавающей точки */}
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
              value={priceValue}
              onChange={handlePriceChange}
              onBlur={handlePriceBlur}
            />
            <span className="admin-page__form-hint">
              Utilisez un point comme séparateur décimal (ex: 15.99)
            </span>
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
              defaultValue={product.category?._id || ""}
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
            <div className="product-form-page__current-image">
              <Image
                src={getImageUrl(product.image)}
                alt={product.title}
                width={200}
                height={200}
                className="product-form-page__preview-image"
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
              <div className="product-form-page__preview">
                <span className="product-form-page__current-image-label">
                  Nouvelle image :
                </span>
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

          {/* Slug (readonly) */}
          <div className="admin-page__form-group">
            <label className="admin-page__form-label">Slug</label>
            <input
              type="text"
              className="admin-page__form-input"
              value={product.slug}
              disabled
            />
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
