// ═══════════════════════════════════════════════════════════════════════════
// Server Actions - Авторизация
// ═══════════════════════════════════════════════════════════════════════════

'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const API_URL = process.env.API_URL;
const COOKIE_NAME = process.env.COOKIE_NAME;
const COOKIE_MAX_AGE = parseInt(process.env.COOKIE_MAX_AGE) || 604800;

/**
 * Вход в админку
 * 
 * @param {object} prevState - предыдущее состояние (для useActionState)
 * @param {FormData} formData - данные формы
 * @returns {Promise<{ success: boolean, error?: string }>}
 * 
 * @example
 * // В Client Component:
 * const [state, formAction, isPending] = useActionState(login, { success: false });
 * <form action={formAction}>...</form>
 */
export async function login(prevState, formData) {
    const email = formData.get('email');
    const password = formData.get('password');

    // Валидация на клиенте тоже есть, но проверим и здесь
    if (!email || !password) {
        return {
            success: false,
            error: 'Veuillez remplir tous les champs', // Заполните все поля
        };
    }

    try {
        const response = await fetch(`${API_URL}/admin/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
            cache: 'no-store',
        });

        const data = await response.json();

        if (!data.ok) {
            // Маппинг ошибок на французский
            const errorMessages = {
                'invalid_credentials': 'Email ou mot de passe incorrect',
                'user_not_found': 'Utilisateur non trouvé',
                'validation_error': 'Données invalides',
            };

            return {
                success: false,
                error: errorMessages[data.error] || data.message || 'Erreur de connexion',
            };
        }

        // Устанавливаем токен в httpOnly cookie
        const cookieStore = await cookies();
        cookieStore.set(COOKIE_NAME, data.data.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: COOKIE_MAX_AGE,
            path: '/',
        });

        return {
            success: true,
            user: data.data.user,
        };

    } catch (error) {
        console.error('Login error:', error);
        return {
            success: false,
            error: 'Erreur de connexion au serveur', // Ошибка подключения к серверу
        };
    }
}

/**
 * Выход из админки
 * 
 * @returns {Promise<void>} - редирект на страницу логина
 * 
 * @example
 * // В форме:
 * <form action={logout}>
 *   <button type="submit">Déconnexion</button>
 * </form>
 */
export async function logout() {
    const cookieStore = await cookies();

    // Удаляем cookie
    cookieStore.delete(COOKIE_NAME);

    // Редирект на страницу логина
    redirect('/beauty-admin/login');
}

/**
 * Обновление профиля (email и/или пароль)
 * 
 * @param {object} prevState - предыдущее состояние
 * @param {FormData} formData - данные формы
 * @returns {Promise<{ success: boolean, error?: string, details?: array }>}
 */
export async function updateProfile(prevState, formData) {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) {
        redirect('/beauty-admin/login');
    }

    const email = formData.get('email');
    const currentPassword = formData.get('currentPassword');
    const newPassword = formData.get('newPassword');

    // Формируем body — отправляем только заполненные поля
    const body = {};

    if (email) {
        body.email = email;
    }

    if (currentPassword && newPassword) {
        body.currentPassword = currentPassword;
        body.newPassword = newPassword;
    }

    if (Object.keys(body).length === 0) {
        return {
            success: false,
            error: 'Aucune modification à enregistrer', // Нет изменений для сохранения
        };
    }

    try {
        const response = await fetch(`${API_URL}/admin/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(body),
            cache: 'no-store',
        });

        const data = await response.json();

        if (!data.ok) {
            const errorMessages = {
                'invalid_password': 'Mot de passe actuel incorrect',
                'validation_error': 'Données invalides',
                'email_exists': 'Cet email est déjà utilisé',
            };

            return {
                success: false,
                error: errorMessages[data.error] || data.message || 'Erreur de mise à jour',
                details: data.details || null,
            };
        }

        return {
            success: true,
            message: 'Profil mis à jour avec succès', // Профиль успешно обновлён
        };

    } catch (error) {
        console.error('Update profile error:', error);
        return {
            success: false,
            error: 'Erreur de connexion au serveur',
        };
    }
}