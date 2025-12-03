// ═══════════════════════════════════════════════════════════════════════════
// Masters Service - GET запросы для мастеров
// ═══════════════════════════════════════════════════════════════════════════

import { api } from '@/lib/api';
import { createQueryString } from '@/lib/utils';

class MastersService {
    /**
     * Получить всех мастеров
     * 
     * @param {object} params - параметры запроса
     * @param {string} [params.search] - поиск по имени/специальности
     * @param {string} [params.sort] - сортировка (fullName, -fullName, speciality, -speciality, createdAt, -createdAt)
     * @param {number} [params.page] - номер страницы (default: 1)
     * @param {number} [params.limit] - количество на странице (default: 12, max: 50)
     * @param {object} [options] - опции fetch
     * @returns {Promise<{ data: array, meta: object }>}
     * 
     * @example
     * const { data, meta } = await MastersService.getAll();
     * const { data, meta } = await MastersService.getAll({ search: 'coiffeur' });
     */
    async getAll(params = {}, options = {}) {
        const query = createQueryString(params);
        const endpoint = query ? `/masters?${query}` : '/masters';

        const response = await api(endpoint, {
            next: { revalidate: 60 },
            ...options,
        });

        return {
            data: response.data,
            meta: response.meta,
        };
    }

    /**
     * Получить мастера по ID
     * 
     * @param {string} id - ID мастера
     * @param {object} [options] - опции fetch
     * @returns {Promise<object>} - данные мастера
     */
    async getById(id, options = {}) {
        const response = await api(`/masters/${id}`, {
            cache: 'no-store',
            ...options,
        });
        return response.data;
    }

    /**
     * Получить избранных мастеров (для главной страницы)
     * 
     * @param {number} [limit=4] - количество мастеров
     * @param {object} [options] - опции fetch
     * @returns {Promise<array>} - массив мастеров
     */
    async getFeatured(limit = 4, options = {}) {
        const response = await api(`/masters/featured?limit=${limit}`, {
            next: { revalidate: 60 },
            ...options,
        });
        return response.data;
    }

    /**
     * Получить мастеров по специальности
     * 
     * @param {string} speciality - специальность
     * @param {object} [options] - опции fetch
     * @returns {Promise<array>} - массив мастеров
     */
    async getBySpeciality(speciality, options = {}) {
        const response = await api(`/masters/by-speciality?speciality=${encodeURIComponent(speciality)}`, {
            next: { revalidate: 60 },
            ...options,
        });
        return response.data;
    }
}

export default new MastersService();