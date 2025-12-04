// ═══════════════════════════════════════════════════════════════════════════
// Products Service - GET запросы для товаров
// ═══════════════════════════════════════════════════════════════════════════

import { api } from '@/lib/api';
import { createQueryString } from '@/lib/utils';

class ProductsService {
    /**
     * Получить все товары
     * 
     * @param {object} params - параметры запроса
     * @param {string} [params.category] - фильтр по ID категории
     * @param {string} [params.brand] - фильтр по бренду
     * @param {string} [params.search] - поиск по названию
     * @param {string} [params.sort] - сортировка (title, -title, price, -price, createdAt, -createdAt)
     * @param {number} [params.page] - номер страницы (default: 1)
     * @param {number} [params.limit] - количество на странице (default: 12, max: 100)
     * @param {object} [options] - опции fetch
     * @returns {Promise<{ data: array, meta: object }>}
     * 
     * @example
     * const { data, meta } = await ProductsService.getAll();
     * const { data, meta } = await ProductsService.getAll({ brand: 'L\'Oreal' });
     */
    async getAll(params = {}, options = {}) {
        const query = createQueryString(params);
        const endpoint = query ? `/products?${query}` : '/products';

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
     * Получить товар по slug
     * 
     * @param {string} slug - slug товара
     * @param {object} [options] - опции fetch
     * @returns {Promise<object>} - данные товара
     */
    async getBySlug(slug, options = {}) {
        const response = await api(`/products/${slug}`, {
            next: { revalidate: 60 },
            ...options,
        });
        return response.data;
    }

    /**
     * Получить товар по ID (для админки)
     * 
     * @param {string} id - ID товара
     * @param {object} [options] - опции fetch
     * @returns {Promise<object>} - данные товара
     */
    async getById(id, options = {}) {
        const response = await api(`/products/id/${id}`, {
            cache: 'no-store',
            ...options,
        });
        return response.data;
    }

    /**
     * Получить товар по артикулу
     * 
     * @param {string} code - артикул товара
     * @param {object} [options] - опции fetch
     * @returns {Promise<object>} - данные товара
     */
    async getByCode(code, options = {}) {
        const response = await api(`/products/code/${code}`, {
            next: { revalidate: 60 },
            ...options,
        });
        return response.data;
    }

    /**
     * Поиск товаров
     * 
     * @param {string} query - поисковый запрос
     * @param {number} [limit=12] - количество результатов
     * @param {object} [options] - опции fetch
     * @returns {Promise<array>} - массив товаров
     */
    async search(query, limit = 12, options = {}) {
        const response = await api(`/products/search?q=${encodeURIComponent(query)}&limit=${limit}`, {
            next: { revalidate: 60 },
            ...options,
        });
        return response.data;
    }

    /**
     * Получить рекомендуемые товары (для главной страницы)
     * 
     * @param {number} [limit=6] - количество товаров
     * @param {object} [options] - опции fetch
     * @returns {Promise<array>} - массив товаров
     */
    async getFeatured(limit = 6, options = {}) {
        const response = await api(`/products/featured?limit=${limit}`, {
            next: { revalidate: 60 },
            ...options,
        });
        return response.data;
    }

    /**
     * Получить список всех брендов
     * 
     * @param {object} [options] - опции fetch
     * @returns {Promise<array>} - массив брендов
     */
    async getBrands(options = {}) {
        const response = await api('/products/brands', {
            next: { revalidate: 300 },
            ...options,
        });
        return response.data;
    }

    /**
     * Получить товары по категории
     * 
     * @param {string} categoryId - ID категории
     * @param {object} [options] - опции fetch
     * @returns {Promise<array>} - массив товаров
     */
    async getByCategory(categoryId, options = {}) {
        const response = await api(`/products/by-category/${categoryId}`, {
            next: { revalidate: 60 },
            ...options,
        });
        return response.data;
    }

    /**
     * Получить бренды для выпадающего списка (select)
     * 
     * @param {object} [options] - опции fetch
     * @returns {Promise<array>} - массив { value, label }
     */
    async getBrandsForSelect(options = {}) {
        const brands = await this.getBrands(options);

        return brands.map(brand => ({
            value: brand,
            label: brand,
        }));
    }
}

export default new ProductsService();