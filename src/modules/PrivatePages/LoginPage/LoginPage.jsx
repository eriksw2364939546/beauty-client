"use client";

import { useActionState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { login } from "@/actions/auth.actions";
import "./LoginPage.scss";

/**
 * Страница авторизации
 */
export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("from") || "/beauty-admin";

  const [state, formAction, isPending] = useActionState(login, {
    success: false,
    error: null,
  });

  // При успешной авторизации — редирект
  useEffect(() => {
    if (state.success) {
      router.push(redirectTo);
      router.refresh();
    }
  }, [state.success, router, redirectTo]);

  return (
    <div className="login-page">
      <div className="login-page__container">
        {/* Логотип */}
        <div className="login-page__logo">
          <h1 className="login-page__title">Beauty Admin</h1>
          <p className="login-page__subtitle">Panneau d'administration</p>
        </div>

        {/* Форма */}
        <form action={formAction} className="login-page__form">
          {/* Ошибка */}
          {state.error && (
            <div className="login-page__error">
              <span className="material-icons">error_outline</span>
              <span>{state.error}</span>
            </div>
          )}

          {/* Email */}
          <div className="login-page__field">
            <label htmlFor="email" className="login-page__label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="login-page__input"
              placeholder="admin@example.com"
              required
              autoComplete="email"
              autoFocus
            />
          </div>

          {/* Пароль */}
          <div className="login-page__field">
            <label htmlFor="password" className="login-page__label">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="login-page__input"
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>

          {/* Кнопка */}
          <button
            type="submit"
            className="login-page__button"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <span className="login-page__spinner" />
                Connexion...
              </>
            ) : (
              "Se connecter"
            )}
          </button>
        </form>

        {/* Копирайт */}
        <p className="login-page__copyright">
          © {new Date().getFullYear()} Beauty Salon. Tous droits réservés.
        </p>
      </div>
    </div>
  );
}
