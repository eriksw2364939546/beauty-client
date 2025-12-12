// ═══════════════════════════════════════════════════════════════════════════
// Services Service - GET запросы для услуг
// ═══════════════════════════════════════════════════════════════════════════

import { api } from '@/lib/api';
import { createQueryString } from '@/lib/utils';

class ServicesService {
    /**
     * Получить все услуги
     * 
     * @param {object} params - параметры запроса
     * @param {string} [params.category] - фильтр по ID категории
     * @param {string} [params.search] - поиск по названию
     * @param {string} [params.sort] - сортировка (title, -title, createdAt, -createdAt)
     * @param {number} [params.page] - номер страницы (default: 1)
     * @param {number} [params.limit] - количество на странице (default: 12, max: 100)
     * @param {object} [options] - опции fetch
     * @returns {Promise<{ data: array, meta: object }>}
     * 
     * @example
     * const { data, meta } = await ServicesService.getAll();
     * const { data, meta } = await ServicesService.getAll({ category: '507f...' });
     */
    async getAll(params = {}, options = {}) {
        const query = createQueryString(params);
        const endpoint = query ? `/services?${query}` : '/services';

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
     * Получить услугу по slug
     * 
     * @param {string} slug - slug услуги
     * @param {object} [options] - опции fetch
     * @returns {Promise<object>} - данные услуги
     */
    async getBySlug(slug, options = {}) {
        const response = await api(`/services/${slug}`, {
            next: { revalidate: 60 },
            ...options,
        });
        return response.data;
    }

    /**
     * Получить услугу по ID (для админки)
     * 
     * @param {string} id - ID услуги
     * @param {object} [options] - опции fetch
     * @returns {Promise<object>} - данные услуги
     */
    async getById(id, options = {}) {
        const response = await api(`/services/id/${id}`, {
            cache: 'no-store',
            ...options,
        });
        return response.data;
    }

    /**
     * Получить услуги по категории
     * 
     * @param {string} categoryId - ID категории
     * @param {object} [options] - опции fetch
     * @returns {Promise<array>} - массив услуг
     */
    async getByCategory(categoryId, options = {}) {
        const response = await api(`/services/by-category/${categoryId}`, {
            next: { revalidate: 60 },
            ...options,
        });
        return response.data;
    }

    /**
     * Получить услуги для главной страницы
     * 
     * @param {number} [limit=6] - количество услуг
     * @param {object} [options] - опции fetch
     * @returns {Promise<array>} - массив услуг
     */
    async getFeatured(limit = 6, options = {}) {
        const { data } = await this.getAll({ limit }, options);
        return data;
    }

    /**
     * Получить услуги для выпадающего списка (select)
     * 
     * @param {object} [options] - опции fetch
     * @returns {Promise<array>} - массив { value, label }
     */
    async getForSelect(options = {}) {
        const { data } = await this.getAll({ limit: 100 }, options);

        return data.map(service => ({
            value: service._id || service.id,
            label: service.title,
        }));
    }
}

export default new ServicesService();