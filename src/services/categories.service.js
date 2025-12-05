// ═══════════════════════════════════════════════════════════════════════════
// Categories Service - GET запросы для категорий
// ═══════════════════════════════════════════════════════════════════════════

import { api } from '@/lib/api';
import { createQueryString } from '@/lib/utils';

class CategoriesService {
    /**
     * Получить все категории
     * 
     * @param {object} params - параметры запроса
     * @param {string} [params.section] - фильтр по секции (service, work, price, product)
     * @param {string} [params.sort] - сортировка (sortOrder, -sortOrder, title, -title)
     * @param {number} [params.page] - номер страницы
     * @param {number} [params.limit] - количество на странице
     * @param {object} [options] - опции fetch (revalidate и т.д.)
     * @returns {Promise<{ data: array, meta: object }>}
     * 
     * @example
     * const { data } = await CategoriesService.getAll();
     * const { data } = await CategoriesService.getAll({ section: 'service' });
     */
    async getAll(params = {}, options = {}) {
        const query = createQueryString(params);
        const endpoint = query ? `/categories?${query}` : '/categories';

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
     * Получить категорию по ID
     * 
     * @param {string} id - ID категории
     * @param {object} [options] - опции fetch
     * @returns {Promise<object>} - данные категории
     */
    async getById(id, options = {}) {
        const response = await api(`/categories/${id}`, {
            next: { revalidate: 300 },
            ...options,
        });
        return response.data;
    }

    /**
     * Получить категорию по slug
     * 
     * @param {string} slug - slug категории
     * @param {object} [options] - опции fetch
     * @returns {Promise<object>} - данные категории
     */
    async getBySlug(slug, options = {}) {
        const response = await api(`/categories/slug/${slug}`, {
            next: { revalidate: 300 },
            ...options,
        });
        return response.data;
    }

    /**
     * Получить категории сгруппированные по секциям
     * 
     * @param {object} [options] - опции fetch
     * @returns {Promise<object>} 
     */
    async getGrouped(options = {}) {
        const { data } = await this.getAll({ limit: 100 }, options);

        const grouped = {
            service: [],
            price: [],
            product: [],
        };

        data.forEach(category => {
            if (grouped[category.section]) {
                grouped[category.section].push(category);
            }
        });

        return grouped;
    }

    /**
     * Получить категории для выпадающего списка (select)
     * 
     * @param {string} section - секция (service, work, price, product)
     * @param {object} [options] - опции fetch
     * @returns {Promise<array>} - массив { value, label }
     */
    async getForSelect(section, options = {}) {
        const { data } = await this.getAll({ section, limit: 100 }, options);

        return data.map(category => ({
            value: category._id || category.id,
            label: category.title,
        }));
    }
}

export default new CategoriesService();