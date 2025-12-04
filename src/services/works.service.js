// ═══════════════════════════════════════════════════════════════════════════
// Works Service - GET запросы для работ (портфолио)
// ═══════════════════════════════════════════════════════════════════════════

import { api } from '@/lib/api';
import { createQueryString } from '@/lib/utils';

class WorksService {
    /**
     * Получить все работы
     * 
     * @param {object} params - параметры запроса
     * @param {string} [params.service] - фильтр по ID услуги
     * @param {string} [params.category] - фильтр по ID категории
     * @param {number} [params.page] - номер страницы (default: 1)
     * @param {number} [params.limit] - количество на странице (default: 12, max: 50)
     * @param {object} [options] - опции fetch
     * @returns {Promise<{ data: array, meta: object }>}
     * 
     * @example
     * const { data, meta } = await WorksService.getAll();
     * const { data, meta } = await WorksService.getAll({ service: '507f...' });
     */
    async getAll(params = {}, options = {}) {
        const query = createQueryString(params);
        const endpoint = query ? `/works?${query}` : '/works';

        // Если передан cache: 'no-store', не добавляем revalidate
        const fetchOptions = options.cache === 'no-store'
            ? options
            : { next: { revalidate: 60 }, ...options };

        const response = await api(endpoint, fetchOptions);

        return {
            data: response.data,
            meta: response.meta,
        };
    }

    /**
     * Получить работу по ID
     * 
     * @param {string} id - ID работы
     * @param {object} [options] - опции fetch
     * @returns {Promise<object>} - данные работы
     */
    async getById(id, options = {}) {
        const response = await api(`/works/${id}`, {
            cache: 'no-store',
            ...options,
        });
        return response.data;
    }

    /**
     * Получить последние работы (для главной страницы)
     * 
     * @param {number} [limit=6] - количество работ
     * @param {object} [options] - опции fetch
     * @returns {Promise<array>} - массив работ
     */
    async getLatest(limit = 6, options = {}) {
        const response = await api(`/works/latest?limit=${limit}`, {
            next: { revalidate: 60 },
            ...options,
        });
        return response.data;
    }

    /**
     * Получить работы по услуге
     * 
     * @param {string} serviceId - ID услуги
     * @param {object} [options] - опции fetch
     * @returns {Promise<array>} - массив работ
     */
    async getByService(serviceId, options = {}) {
        const response = await api(`/works/by-service/${serviceId}`, {
            next: { revalidate: 60 },
            ...options,
        });
        return response.data;
    }

    /**
     * Получить работы по категории
     * 
     * @param {string} categoryId - ID категории
     * @param {object} [options] - опции fetch
     * @returns {Promise<array>} - массив работ
     */
    async getByCategory(categoryId, options = {}) {
        const response = await api(`/works/by-category/${categoryId}`, {
            next: { revalidate: 60 },
            ...options,
        });
        return response.data;
    }
}

export default new WorksService();