// ═══════════════════════════════════════════════════════════════════════════
// Auth Service - GET запросы для авторизации
// ═══════════════════════════════════════════════════════════════════════════

import { apiWithAuth } from '@/lib/api';
import { getToken } from '@/lib/auth';

class AuthService {
    /**
     * Получить данные текущего пользователя
     * 
     * @returns {Promise<object>} - данные пользователя
     * @throws {ApiError} - если не авторизован
     * 
     * @example
     * const user = await AuthService.getCurrentUser();
     */
    async getCurrentUser() {
        const token = await getToken();
        const response = await apiWithAuth('/admin/me', token, {
            cache: 'no-store',
        });
        return response.data;
    }

    /**
     * Проверить валидность токена
     * 
     * @returns {Promise<{ valid: boolean, user: object }>}
     * 
     * @example
     * const { valid, user } = await AuthService.verifyToken();
     */
    async verifyToken() {
        const token = await getToken();

        if (!token) {
            return { valid: false, user: null };
        }

        try {
            const response = await apiWithAuth('/admin/verify', token, {
                cache: 'no-store',
            });
            return { valid: true, user: response.data };
        } catch {
            return { valid: false, user: null };
        }
    }
}

export default new AuthService();