"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createPrice } from "@/actions/price.actions";
import { ArrowLeft, AlertCircle, Save } from "lucide-react";
import "./PriceFormPage.scss";

/**
 * Страница создания расценки
 *
 * @param {object} props
 * @param {array} props.services - услуги для select
 */
export default function PriceNewPage({ services }) {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(createPrice, {
    success: false,
    error: null,
  });

  // При успехе — редирект на список
  useEffect(() => {
    if (state.success) {
      router.push("/beauty-admin/prices-admin");
    }
  }, [state.success, router]);

  return (
    <div className="price-form-page">
      {/* Header */}
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Nouveau tarif</h1>
          <p className="admin-page__subtitle">Ajouter un tarif à la grille</p>
        </div>
        <Link href="/beauty-admin/prices-admin" className="btn btn--secondary">
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
              placeholder="Ex: Coupe courte"
              required
              minLength={2}
              autoFocus
            />
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
              Le service associé à ce tarif
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
              Les tarifs sont triés par ordre croissant
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
                  Créer le tarif
                </>
              )}
            </button>
            <Link
              href="/beauty-admin/prices-admin"
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
