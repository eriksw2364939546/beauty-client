"use client";

import { useState } from "react";
import { useActionState } from "react";
import { updateProfile } from "@/actions/auth.actions";
import {
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Save,
  Mail,
  Lock,
  Shield,
} from "lucide-react";
import "./SettingsPage.scss";

/**
 * Страница настроек профиля
 *
 * @param {object} props
 * @param {object} props.user - данные текущего пользователя
 */
export default function SettingsPage({ user }) {
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [state, formAction, isPending] = useActionState(updateProfile, {
    success: false,
    error: null,
    message: null,
  });

  // Переключение видимости пароля
  const togglePassword = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="settings-page">
      {/* Header */}
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Paramètres</h1>
          <p className="admin-page__subtitle">
            Gérez votre compte administrateur
          </p>
        </div>
      </div>

      {/* Current Info */}
      <div className="admin-page__card settings-page__info">
        <h2 className="settings-page__section-title">Informations actuelles</h2>
        <div className="settings-page__current">
          <div className="settings-page__current-item">
            <span className="settings-page__current-label">
              <Mail size={16} className="settings-page__current-icon" />
              Email
            </span>
            <span className="settings-page__current-value">
              {user?.email || "—"}
            </span>
          </div>
          <div className="settings-page__current-item">
            <span className="settings-page__current-label">
              <Shield size={16} className="settings-page__current-icon" />
              Rôle
            </span>
            <span className="badge badge--service">
              {user?.role || "admin"}
            </span>
          </div>
        </div>
      </div>

      {/* Update Form */}
      <div className="admin-page__card">
        <h2 className="settings-page__section-title">Modifier le profil</h2>

        <form action={formAction} className="admin-page__form">
          {/* Success Message */}
          {state.success && (
            <div className="alert alert--success">
              <CheckCircle size={20} className="alert__icon" />
              <span>{state.message}</span>
            </div>
          )}

          {/* Error Message */}
          {state.error && (
            <div className="alert alert--error">
              <AlertCircle size={20} className="alert__icon" />
              <span>{state.error}</span>
            </div>
          )}

          {/* Current Password (required) */}
          <div className="admin-page__form-group">
            <label htmlFor="currentPassword" className="admin-page__form-label">
              <Lock size={16} className="admin-page__form-icon" />
              Mot de passe actuel *
            </label>
            <div className="settings-page__password-input">
              <input
                type={showPasswords.current ? "text" : "password"}
                id="currentPassword"
                name="currentPassword"
                className="admin-page__form-input"
                placeholder="Votre mot de passe actuel"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="settings-page__password-toggle"
                onClick={() => togglePassword("current")}
                tabIndex={-1}
              >
                {showPasswords.current ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
            <span className="admin-page__form-hint">
              Requis pour toute modification
            </span>
          </div>

          <hr className="settings-page__divider" />

          {/* New Email */}
          <div className="admin-page__form-group">
            <label htmlFor="newEmail" className="admin-page__form-label">
              <Mail size={16} className="admin-page__form-icon" />
              Nouvel email
            </label>
            <input
              type="email"
              id="newEmail"
              name="newEmail"
              className="admin-page__form-input"
              placeholder="nouveau@email.com"
              autoComplete="email"
            />
            <span className="admin-page__form-hint">
              Laissez vide pour ne pas modifier
            </span>
          </div>

          <hr className="settings-page__divider" />

          {/* New Password */}
          <div className="admin-page__form-group">
            <label htmlFor="newPassword" className="admin-page__form-label">
              <Lock size={16} className="admin-page__form-icon" />
              Nouveau mot de passe
            </label>
            <div className="settings-page__password-input">
              <input
                type={showPasswords.new ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                className="admin-page__form-input"
                placeholder="Nouveau mot de passe"
                minLength={6}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="settings-page__password-toggle"
                onClick={() => togglePassword("new")}
                tabIndex={-1}
              >
                {showPasswords.new ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <span className="admin-page__form-hint">
              Minimum 6 caractères. Laissez vide pour ne pas modifier
            </span>
          </div>

          {/* Confirm Password */}
          <div className="admin-page__form-group">
            <label htmlFor="confirmPassword" className="admin-page__form-label">
              <Lock size={16} className="admin-page__form-icon" />
              Confirmer le mot de passe
            </label>
            <div className="settings-page__password-input">
              <input
                type={showPasswords.confirm ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                className="admin-page__form-input"
                placeholder="Confirmer le nouveau mot de passe"
                minLength={6}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="settings-page__password-toggle"
                onClick={() => togglePassword("confirm")}
                tabIndex={-1}
              >
                {showPasswords.confirm ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
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
                  <Save size={20} className="btn__icon" />
                  Enregistrer les modifications
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
