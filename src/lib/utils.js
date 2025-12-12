// ═══════════════════════════════════════════════════════════════════════════
// Общие утилиты для проекта
// ═══════════════════════════════════════════════════════════════════════════

const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Получить полный URL изображения
 * 
 * @param {string} path - путь к изображению (например: '/uploads/services/image.webp')
 * @returns {string} - полный URL
 * 
 * @example
 * getImageUrl('/uploads/services/image.webp')
 * // => 'http://localhost:12000/uploads/services/image.webp'
 * 
 * @example
 * getImageUrl('https://example.com/image.jpg')
 * // => 'https://example.com/image.jpg'
 * 
 * @example
 * getImageUrl(null)
 * // => '/images/placeholder.jpg'
 */
export function getImageUrl(path) {
    if (!path) {
        return '/images/placeholder.jpg';
    }

    // Если уже полный URL — возвращаем как есть
    if (path.startsWith('http://') || path.startsWith('https://')) {
        return path;
    }

    // Добавляем базовый URL API
    return `${PUBLIC_API_URL}${path}`;
}

/**
 * Форматирование цены в евро
 * 
 * @param {number} price - цена
 * @returns {string} - отформатированная цена
 * 
 * @example
 * formatPrice(1500)
 * // => '1 500,00 €'
 * 
 * @example
 * formatPrice(99.99)
 * // => '99,99 €'
 */
export function formatPrice(price) {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(price);
}

/**
 * Форматирование даты
 * 
 * @param {string|Date} date - дата
 * @param {object} options - опции форматирования
 * @returns {string} - отформатированная дата
 * 
 * @example
 * formatDate('2024-01-15T10:30:00.000Z')
 * // => '15 janvier 2024'
 * 
 * @example
 * formatDate('2024-01-15', { short: true })
 * // => '15/01/2024'
 */
export function formatDate(date, options = {}) {
    const d = new Date(date);

    if (options.short) {
        return new Intl.DateTimeFormat('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }).format(d);
    }

    return new Intl.DateTimeFormat('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(d);
}

/**
 * Форматирование даты и времени
 * 
 * @param {string|Date} date - дата
 * @returns {string} - отформатированная дата и время
 * 
 * @example
 * formatDateTime('2024-01-15T10:30:00.000Z')
 * // => '15 janvier 2024, 10:30'
 */
export function formatDateTime(date) {
    return new Intl.DateTimeFormat('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(date));
}

/**
 * Склонение слов в зависимости от числа (французский)
 * Во французском только единственное/множественное число
 * 
 * @param {number} count - число
 * @param {string[]} words - массив слов [единственное, множественное]
 * @returns {string} - правильная форма слова
 * 
 * @example
 * pluralize(1, ['produit', 'produits'])
 * // => 'produit'
 * 
 * @example
 * pluralize(5, ['produit', 'produits'])
 * // => 'produits'
 */
export function pluralize(count, words) {
    return count <= 1 ? words[0] : words[1];
}

/**
 * Обрезать текст до указанной длины
 * 
 * @param {string} text - исходный текст
 * @param {number} maxLength - максимальная длина
 * @returns {string} - обрезанный текст с '...'
 * 
 * @example
 * truncate('Une très longue description', 15)
 * // => 'Une très longu...'
 */
export function truncate(text, maxLength) {
    if (!text || text.length <= maxLength) {
        return text;
    }
    return text.slice(0, maxLength).trim() + '...';
}

/**
 * Создать query string из объекта
 * 
 * @param {object} params - параметры
 * @returns {string} - query string
 * 
 * @example
 * createQueryString({ page: 1, category: 'abc', search: '' })
 * // => 'page=1&category=abc'
 */
export function createQueryString(params) {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        // Пропускаем невалидные значения включая строки 'undefined' и 'null'
        if (value !== undefined &&
            value !== null &&
            value !== '' &&
            value !== 'undefined' &&
            value !== 'null') {
            searchParams.set(key, String(value));
        }
    });

    return searchParams.toString();
}

/**
 * Названия секций категорий (французский)
 */
export const SECTION_NAMES = {
    service: 'Services',
    work: 'Réalisations',
    price: 'Tarifs',
    product: 'Produits',
};

/**
 * Получить название секции
 * 
 * @param {string} section - код секции
 * @returns {string} - название секции
 */
export function getSectionName(section) {
    return SECTION_NAMES[section] || section;
}