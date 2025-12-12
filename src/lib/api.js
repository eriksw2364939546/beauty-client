// ═══════════════════════════════════════════════════════════════════════════
// API Client для Server Components, Server Actions и Client Components
// ═══════════════════════════════════════════════════════════════════════════

// Для серверных компонентов используем API_URL, для клиентских - NEXT_PUBLIC_API_URL
const API_URL = typeof window === 'undefined'
    ? process.env.API_URL
    : process.env.NEXT_PUBLIC_API_URL + '/api';

/**
 * Класс ошибки API
 */
export class ApiError extends Error {
    constructor(code, message, status, details = null) {
        super(message);
        this.name = 'ApiError';
        this.code = code;
        this.status = status;
        this.details = details;
    }
}

/**
 * Базовый API клиент для Server и Client Components
 * 
 * @param {string} endpoint - путь API (например: '/services')
 * @param {RequestInit & { next?: NextFetchRequestConfig }} options - опции fetch
 * @returns {Promise<any>} - данные ответа
 * 
 * @example
 * // Простой GET запрос
 * const data = await api('/services');
 * 
 * @example
 * // GET с кешированием (ISR)
 * const data = await api('/services', { next: { revalidate: 60 } });
 * 
 * @example
 * // GET без кеша
 * const data = await api('/admin/me', { cache: 'no-store' });
 */
export async function api(endpoint, options = {}) {
    const url = `${API_URL}${endpoint}`;

    const config = {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    };

    try {
        const response = await fetch(url, config);
        const data = await response.json();

        if (!data.ok) {
            throw new ApiError(
                data.error || 'unknown_error',
                data.message || 'Неизвестная ошибка',
                response.status,
                data.details || null
            );
        }

        return data;
    } catch (error) {
        // Если это уже ApiError — пробрасываем
        if (error instanceof ApiError) {
            throw error;
        }

        // Ошибка сети или парсинга
        throw new ApiError(
            'network_error',
            'Ошибка соединения с сервером',
            500,
            null
        );
    }
}

/**
 * API клиент с авторизацией
 * 
 * @param {string} endpoint - путь API
 * @param {string} token - JWT токен
 * @param {RequestInit} options - опции fetch
 * @returns {Promise<any>} - данные ответа
 * 
 * @example
 * const token = await getToken();
 * const data = await apiWithAuth('/admin/me', token);
 */
export async function apiWithAuth(endpoint, token, options = {}) {
    if (!token) {
        throw new ApiError('unauthorized', 'Токен не предоставлен', 401);
    }

    return api(endpoint, {
        ...options,
        headers: {
            ...options.headers,
            'Authorization': `Bearer ${token}`,
        },
    });
}

/**
 * POST запрос с JSON body
 * 
 * @param {string} endpoint - путь API
 * @param {object} body - данные для отправки
 * @param {string} [token] - JWT токен (опционально)
 * @returns {Promise<any>} - данные ответа
 * 
 * @example
 * const result = await apiPost('/admin/login', { email, password });
 */
export async function apiPost(endpoint, body, token = null) {
    const headers = {};

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return api(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
        cache: 'no-store',
    });
}

/**
 * PATCH запрос с JSON body
 * 
 * @param {string} endpoint - путь API
 * @param {object} body - данные для отправки
 * @param {string} token - JWT токен
 * @returns {Promise<any>} - данные ответа
 */
export async function apiPatch(endpoint, body, token) {
    return api(endpoint, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(body),
        cache: 'no-store',
    });
}

/**
 * DELETE запрос
 * 
 * @param {string} endpoint - путь API
 * @param {string} token - JWT токен
 * @returns {Promise<any>} - данные ответа
 */
export async function apiDelete(endpoint, token) {
    return api(endpoint, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        cache: 'no-store',
    });
}

/**
 * POST/PATCH запрос с FormData (для загрузки файлов)
 * 
 * @param {string} endpoint - путь API
 * @param {FormData} formData - данные формы
 * @param {string} token - JWT токен
 * @param {string} [method='POST'] - HTTP метод
 * @returns {Promise<any>} - данные ответа
 * 
 * @example
 * const formData = new FormData();
 * formData.append('title', 'Название');
 * formData.append('image', file);
 * const result = await apiFormData('/admin/services', formData, token);
 */
export async function apiFormData(endpoint, formData, token, method = 'POST') {
    const url = `${API_URL}${endpoint}`;

    try {
        const response = await fetch(url, {
            method,
            headers: {
                'Authorization': `Bearer ${token}`,
                // НЕ устанавливаем Content-Type — fetch сам поставит с boundary
            },
            body: formData,
            cache: 'no-store',
        });

        const data = await response.json();

        if (!data.ok) {
            throw new ApiError(
                data.error || 'unknown_error',
                data.message || 'Неизвестная ошибка',
                response.status,
                data.details || null
            );
        }

        return data;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }

        throw new ApiError(
            'network_error',
            'Ошибка соединения с сервером',
            500,
            null
        );
    }
}