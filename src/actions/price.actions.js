// ═══════════════════════════════════════════════════════════════════════════
// Server Actions - Расценки (POST, PATCH, DELETE)
// ═══════════════════════════════════════════════════════════════════════════

'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { apiPost, apiPatch, apiDelete } from '@/lib/api';

const COOKIE_NAME = process.env.COOKIE_NAME;

/**
 * Получить токен из cookies
 */
async function getToken() {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) {
        redirect('/beauty-admin/login');
    }

    return token;
}

/**
 * Ревалидировать все связанные пути
 */
function revalidatePrices() {
    revalidatePath('/beauty-admin/prices-admin');
    // Публичные страницы
    revalidatePath('/');
    revalidatePath('/prices');
}

/**
 * Создать расценку
 * 
 * @param {object} prevState - предыдущее состояние
 * @param {FormData} formData - данные формы (title, price, serviceId, sortOrder)
 * @returns {Promise<{ success: boolean, error?: string, details?: array }>}
 * 
 * @example
 * const [state, formAction, isPending] = useActionState(createPrice, { success: false });
 */
export async function createPrice(prevState, formData) {
    const token = await getToken();

    // Валидация на сервере
    const title = formData.get('title');
    const price = formData.get('price');
    const serviceId = formData.get('serviceId');
    const sortOrder = formData.get('sortOrder');

    if (!title || title.length < 2) {
        return {
            success: false,
            error: 'Le titre doit contenir au moins 2 caractères',
        };
    }

    if (!price || isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
        return {
            success: false,
            error: 'Le prix doit être un nombre positif',
        };
    }

    if (!serviceId) {
        return {
            success: false,
            error: 'Veuillez sélectionner un service',
        };
    }

    const body = {
        title,
        price: parseFloat(price),
        serviceId,
        sortOrder: parseInt(sortOrder) || 0,
    };

    try {
        await apiPost('/admin/prices', body, token);

        revalidatePrices();

        return {
            success: true,
            message: 'Tarif créé avec succès',
        };

    } catch (error) {
        const errorMessages = {
            'service_not_found': 'Service non trouvé',
            'invalid_service': 'Service invalide',
            'validation_error': 'Données invalides',
        };

        return {
            success: false,
            error: errorMessages[error.code] || error.message || 'Erreur lors de la création',
            details: error.details || null,
        };
    }
}

/**
 * Обновить расценку
 * 
 * @param {string} id - ID расценки
 * @param {object} prevState - предыдущее состояние
 * @param {FormData} formData - данные формы
 * @returns {Promise<{ success: boolean, error?: string, details?: array }>}
 * 
 * @example
 * const updateWithId = updatePrice.bind(null, price._id);
 * const [state, formAction, isPending] = useActionState(updateWithId, { success: false });
 */
export async function updatePrice(id, prevState, formData) {
    const token = await getToken();

    // Валидация
    const title = formData.get('title');
    const price = formData.get('price');
    const serviceId = formData.get('serviceId');
    const sortOrder = formData.get('sortOrder');

    if (title && title.length < 2) {
        return {
            success: false,
            error: 'Le titre doit contenir au moins 2 caractères',
        };
    }

    if (price && (isNaN(parseFloat(price)) || parseFloat(price) <= 0)) {
        return {
            success: false,
            error: 'Le prix doit être un nombre positif',
        };
    }

    // Формируем body только с заполненными полями
    const body = {};

    if (title) body.title = title;
    if (price) body.price = parseFloat(price);
    if (serviceId) body.serviceId = serviceId;
    if (sortOrder !== null && sortOrder !== '') body.sortOrder = parseInt(sortOrder);

    // Нет изменений
    if (Object.keys(body).length === 0) {
        return {
            success: false,
            error: 'Aucune modification à enregistrer',
        };
    }

    try {
        await apiPatch(`/admin/prices/${id}`, body, token);

        revalidatePrices();

        return {
            success: true,
            message: 'Tarif mis à jour avec succès',
        };

    } catch (error) {
        const errorMessages = {
            'not_found': 'Tarif non trouvé',
            'service_not_found': 'Service non trouvé',
            'invalid_service': 'Service invalide',
            'validation_error': 'Données invalides',
        };

        return {
            success: false,
            error: errorMessages[error.code] || error.message || 'Erreur lors de la mise à jour',
            details: error.details || null,
        };
    }
}

/**
 * Удалить расценку
 * 
 * @param {string} id - ID расценки
 * @returns {Promise<{ success: boolean, error?: string }>}
 * 
 * @example
 * const result = await deletePrice(price._id);
 */
export async function deletePrice(id) {
    const token = await getToken();

    try {
        await apiDelete(`/admin/prices/${id}`, token);

        revalidatePrices();

        return {
            success: true,
            message: 'Tarif supprimé avec succès',
        };

    } catch (error) {
        const errorMessages = {
            'not_found': 'Tarif non trouvé',
        };

        return {
            success: false,
            error: errorMessages[error.code] || error.message || 'Erreur lors de la suppression',
        };
    }
}

/**
 * Изменить порядок сортировки
 * 
 * @param {string} id - ID расценки
 * @param {number} sortOrder - новый порядок
 * @returns {Promise<{ success: boolean, error?: string }>}
 */
export async function updatePriceSortOrder(id, sortOrder) {
    const token = await getToken();

    try {
        await apiPatch(`/admin/prices/${id}`, { sortOrder }, token);

        revalidatePrices();

        return {
            success: true,
        };

    } catch (error) {
        return {
            success: false,
            error: error.message || 'Erreur lors de la mise à jour',
        };
    }
}