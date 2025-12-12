// services/prices.service.js
// ═══════════════════════════════════════════════════════════════════════════
// Prices Service - GET запросы для расценок
// ═══════════════════════════════════════════════════════════════════════════

import { api } from '@/lib/api';
import { createQueryString } from '@/lib/utils';

class PricesService {
    /**
     * Получить все расценки
     * 
     * @param {object} params - параметры запроса
     * @param {string} [params.service] - фильтр по ID услуги
     * @param {string} [params.category] - фильтр по ID категории
     * @param {string} [params.search] - поиск
     * @param {string} [params.sort] - сортировка (sortOrder, -sortOrder, price, -price)
     * @param {number} [params.page] - номер страницы (default: 1)
     * @param {number} [params.limit] - количество на странице (default: 50)
     * @param {object} [options] - опции fetch
     * @returns {Promise<{ data: array, meta: object }>}
     * 
     * @example
     * const { data, meta } = await PricesService.getAll();
     * const { data, meta } = await PricesService.getAll({ service: '507f...', page: 2 });
     */
    async getAll(params = {}, options = {}) {
        // Фильтруем undefined/null/пустые значения и строку 'undefined'
        const cleanParams = {};

        Object.keys(params).forEach(key => {
            const value = params[key];
            if (value !== undefined &&
                value !== null &&
                value !== '' &&
                value !== 'undefined' &&
                value !== 'null') {
                cleanParams[key] = value;
            }
        });

        const query = createQueryString(cleanParams);
        const endpoint = query ? `/prices?${query}` : '/prices';

        // Если передан cache: 'no-store', не добавляем revalidate
        const fetchOptions = options.cache === 'no-store'
            ? options
            : { next: { revalidate: 300 }, ...options };

        const response = await api(endpoint, fetchOptions);

        return {
            data: response.data,
            meta: response.meta,
        };
    }

    /**
     * Получить расценку по ID
     * 
     * @param {string} id - ID расценки
     * @param {object} [options] - опции fetch
     * @returns {Promise<object>} - данные расценки
     */
    async getById(id, options = {}) {
        const response = await api(`/prices/${id}`, {
            cache: 'no-store',
            ...options,
        });
        return response.data;
    }

    /**
     * Получить расценки по услуге
     * 
     * @param {string} serviceId - ID услуги
     * @param {object} [options] - опции fetch
     * @returns {Promise<array>} - массив расценок
     */
    async getByService(serviceId, options = {}) {
        const response = await api(`/prices/by-service/${serviceId}`, {
            next: { revalidate: 300 },
            ...options,
        });
        return response.data;
    }

    /**
     * Получить расценки сгруппированные по услугам
     * 
     * @param {object} [options] - опции fetch
     * @returns {Promise<array>} - массив сгруппированных расценок
     * 
     * @example
     * const grouped = await PricesService.getGrouped();
     * // [{ service: { _id, title, category }, items: [{ _id, title, price }, ...] }, ...]
     */
    async getGrouped(options = {}) {
        const response = await api('/prices/grouped', {
            next: { revalidate: 300 },
            ...options,
        });
        return response.data;
    }

    /**
     * Получить расценки по категории
     * 
     * @param {string} categoryId - ID категории
     * @param {object} [options] - опции fetch
     * @returns {Promise<array>} - массив расценок
     */
    async getByCategory(categoryId, options = {}) {
        const response = await api(`/prices/by-category/${categoryId}`, {
            next: { revalidate: 300 },
            ...options,
        });
        return response.data;
    }
}

export default new PricesService();