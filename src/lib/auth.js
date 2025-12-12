// ═══════════════════════════════════════════════════════════════════════════
// Auth Utilities для Server Components и Server Actions
// ═══════════════════════════════════════════════════════════════════════════

import { cookies } from 'next/headers';

const API_URL = process.env.API_URL
const COOKIE_NAME = process.env.COOKIE_NAME

/**
 * Получить токен из cookies (Server Side)
 * 
 * @returns {Promise<string|null>} - JWT токен или null
 * 
 * @example
 * const token = await getToken();
 * if (!token) redirect('/beauty-admin/login');
 */
export async function getToken() {
    const cookieStore = await cookies();
    return cookieStore.get(COOKIE_NAME)?.value || null;
}

/**
 * Установить токен в cookies
 * 
 * @param {string} token - JWT токен
 * @returns {Promise<void>}
 */
export async function setToken(token) {
    const cookieStore = await cookies();
    const maxAge = parseInt(process.env.COOKIE_MAX_AGE) || 604800; // 7 дней

    cookieStore.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge,
        path: '/',
    });
}

/**
 * Удалить токен из cookies
 * 
 * @returns {Promise<void>}
 */
export async function removeToken() {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
}

/**
 * Получить данные текущего пользователя
 * 
 * @returns {Promise<object|null>} - данные пользователя или null
 * 
 * @example
 * const user = await getAuthUser();
 * if (!user) redirect('/beauty-admin/login');
 * console.log(user.email);
 */
export async function getAuthUser() {
    const token = await getToken();

    if (!token) {
        return null;
    }

    try {
        const response = await fetch(`${API_URL}/admin/me`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            cache: 'no-store',
        });

        const data = await response.json();

        if (!data.ok) {
            return null;
        }

        return data.data;
    } catch {
        return null;
    }
}

/**
 * Проверить валидность токена и получить пользователя
 * 
 * @returns {Promise<{ isValid: boolean, user: object|null }>}
 * 
 * @example
 * const { isValid, user } = await verifyAuth();
 * if (!isValid) redirect('/beauty-admin/login');
 */
export async function verifyAuth() {
    const token = await getToken();

    if (!token) {
        return { isValid: false, user: null };
    }

    try {
        // Проверяем токен через API
        const verifyResponse = await fetch(`${API_URL}/admin/verify`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            cache: 'no-store',
        });

        const verifyData = await verifyResponse.json();

        if (!verifyData.ok) {
            return { isValid: false, user: null };
        }

        // Получаем данные пользователя
        const user = await getAuthUser();

        return { isValid: true, user };
    } catch {
        return { isValid: false, user: null };
    }
}

/**
 * Проверить авторизацию (только валидность, без данных юзера)
 * Быстрее чем verifyAuth() — один запрос вместо двух
 * 
 * @returns {Promise<boolean>}
 * 
 * @example
 * const isAuth = await checkAuth();
 * if (!isAuth) redirect('/beauty-admin/login');
 */
export async function checkAuth() {
    const token = await getToken();

    if (!token) {
        return false;
    }

    try {
        const response = await fetch(`${API_URL}/admin/verify`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            cache: 'no-store',
        });

        const data = await response.json();
        return data.ok === true;
    } catch {
        return false;
    }
}