// ═══════════════════════════════════════════════════════════════════════════
// Server Actions - Категории (POST, PATCH, DELETE)
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
function revalidateCategories() {
    revalidatePath('/beauty-admin/categories-admin');
    revalidatePath('/beauty-admin/services-admin');
    // revalidatePath('/beauty-admin/works-admin');
    revalidatePath('/beauty-admin/products-admin');
    revalidatePath('/beauty-admin/prices-admin');
    // Публичные страницы
    revalidatePath('/services');
    // revalidatePath('/works');
    revalidatePath('/products');
    revalidatePath('/prices');
}

/**
 * Создать категорию
 * 
 * @param {object} prevState - предыдущее состояние
 * @param {FormData} formData - данные формы
 * @returns {Promise<{ success: boolean, error?: string, details?: array }>}
 * 
 * @example
 * const [state, formAction, isPending] = useActionState(createCategory, { success: false });
 */
export async function createCategory(prevState, formData) {
    const token = await getToken();

    const body = {
        title: formData.get('title'),
        section: formData.get('section'),
        sortOrder: parseInt(formData.get('sortOrder')) || 0,
    };

    // Валидация
    if (!body.title || body.title.length < 2) {
        return {
            success: false,
            error: 'Le titre doit contenir au moins 2 caractères',
        };
    }

    if (!['service', 'price', 'product'].includes(body.section)) {
        return {
            success: false,
            error: 'Section invalide',
        };
    }

    try {
        await apiPost('/admin/categories', body, token);

        revalidateCategories();

        return {
            success: true,
            message: 'Catégorie créée avec succès',
        };

    } catch (error) {
        const errorMessages = {
            'duplicate_slug': 'Une catégorie avec ce nom existe déjà',
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
 * Обновить категорию
 * 
 * @param {string} id - ID категории
 * @param {object} prevState - предыдущее состояние
 * @param {FormData} formData - данные формы
 * @returns {Promise<{ success: boolean, error?: string, details?: array }>}
 * 
 * @example
 * const updateWithId = updateCategory.bind(null, category._id);
 * const [state, formAction, isPending] = useActionState(updateWithId, { success: false });
 */
export async function updateCategory(id, prevState, formData) {
    const token = await getToken();

    const body = {};

    const title = formData.get('title');
    if (title) {
        body.title = title;
    }

    const sortOrder = formData.get('sortOrder');
    if (sortOrder !== null && sortOrder !== '') {
        body.sortOrder = parseInt(sortOrder);
    }

    // Нет изменений
    if (Object.keys(body).length === 0) {
        return {
            success: false,
            error: 'Aucune modification à enregistrer',
        };
    }

    // Валидация
    if (body.title && body.title.length < 2) {
        return {
            success: false,
            error: 'Le titre doit contenir au moins 2 caractères',
        };
    }

    try {
        await apiPatch(`/admin/categories/${id}`, body, token);

        revalidateCategories();

        return {
            success: true,
            message: 'Catégorie mise à jour avec succès',
        };

    } catch (error) {
        const errorMessages = {
            'not_found': 'Catégorie non trouvée',
            'duplicate_slug': 'Une catégorie avec ce nom existe déjà',
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
 * Удалить категорию
 * 
 * @param {string} id - ID категории
 * @returns {Promise<{ success: boolean, error?: string }>}
 * 
 * @example
 * const result = await deleteCategory(category._id);
 */
export async function deleteCategory(id) {
    const token = await getToken();

    try {
        await apiDelete(`/admin/categories/${id}`, token);

        revalidateCategories();

        return {
            success: true,
            message: 'Catégorie supprimée avec succès',
        };

    } catch (error) {
        const errorMessages = {
            'not_found': 'Catégorie non trouvée',
            'has_dependencies': 'Impossible de supprimer: la catégorie contient des éléments',
            'category_has_services': 'Impossible de supprimer: la catégorie contient des services',
            'category_has_works': 'Impossible de supprimer: la catégorie contient des réalisations',
            'category_has_products': 'Impossible de supprimer: la catégorie contient des produits',
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
 * @param {string} id - ID категории
 * @param {number} sortOrder - новый порядок
 * @returns {Promise<{ success: boolean, error?: string }>}
 */
export async function updateCategorySortOrder(id, sortOrder) {
    const token = await getToken();

    try {
        await apiPatch(`/admin/categories/${id}/sort-order`, { sortOrder }, token);

        revalidateCategories();

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