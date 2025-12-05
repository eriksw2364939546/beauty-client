// ═══════════════════════════════════════════════════════════════════════════
// Server Actions - Услуги (POST, PATCH, DELETE)
// ═══════════════════════════════════════════════════════════════════════════

'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { apiFormData, apiDelete } from '@/lib/api';

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
function revalidateServices() {
    revalidatePath('/beauty-admin/services-admin');
    revalidatePath('/beauty-admin/works-admin');
    revalidatePath('/beauty-admin/prices-admin');
    // Публичные страницы
    revalidatePath('/');
    revalidatePath('/services');
    revalidatePath('/works');
    revalidatePath('/prices');
}

/**
 * Создать услугу
 * 
 * @param {object} prevState - предыдущее состояние
 * @param {FormData} formData - данные формы (title, description, categoryId, image)
 * @returns {Promise<{ success: boolean, error?: string, details?: array }>}
 * 
 * @example
 * const [state, formAction, isPending] = useActionState(createService, { success: false });
 */
export async function createService(prevState, formData) {
    const token = await getToken();

    // Валидация на сервере
    const title = formData.get('title');
    const description = formData.get('description');
    const categoryId = formData.get('categoryId');
    const image = formData.get('image');

    if (!title || title.length < 2) {
        return {
            success: false,
            error: 'Le titre doit contenir au moins 2 caractères',
        };
    }

    if (!description || description.length < 10) {
        return {
            success: false,
            error: 'La description doit contenir au moins 10 caractères',
        };
    }

    if (!categoryId) {
        return {
            success: false,
            error: 'Veuillez sélectionner une catégorie',
        };
    }

    if (!image || image.size === 0) {
        return {
            success: false,
            error: 'Veuillez ajouter une image',
        };
    }

    // Проверка типа файла
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(image.type)) {
        return {
            success: false,
            error: 'Format d\'image non supporté. Utilisez JPEG, PNG ou WebP',
        };
    }

    // Проверка размера (5MB)
    if (image.size > 5 * 1024 * 1024) {
        return {
            success: false,
            error: 'L\'image ne doit pas dépasser 5 Mo',
        };
    }

    try {
        // FormData передаётся напрямую — fetch сам поставит Content-Type с boundary
        await apiFormData('/admin/services', formData, token, 'POST');

        revalidateServices();

        return {
            success: true,
            message: 'Service créé avec succès',
        };

    } catch (error) {
        const errorMessages = {
            'duplicate_slug': 'Un service avec ce nom existe déjà',
            'invalid_category': 'Catégorie invalide',
            'category_not_found': 'Catégorie non trouvée',
            'invalid_section': 'La catégorie doit être de type "service"',
            'validation_error': 'Données invalides',
            'file_required': 'L\'image est obligatoire',
            'invalid_file_type': 'Format d\'image non supporté',
        };

        return {
            success: false,
            error: errorMessages[error.code] || error.message || 'Erreur lors de la création',
            details: error.details || null,
        };
    }
}

/**
 * Обновить услугу
 * 
 * @param {string} id - ID услуги
 * @param {object} prevState - предыдущее состояние
 * @param {FormData} formData - данные формы
 * @returns {Promise<{ success: boolean, error?: string, details?: array }>}
 * 
 * @example
 * const updateWithId = updateService.bind(null, service._id);
 * const [state, formAction, isPending] = useActionState(updateWithId, { success: false });
 */
export async function updateService(id, prevState, formData) {
    const token = await getToken();

    // Валидация
    const title = formData.get('title');
    const description = formData.get('description');
    const image = formData.get('image');

    if (title && title.length < 2) {
        return {
            success: false,
            error: 'Le titre doit contenir au moins 2 caractères',
        };
    }

    if (description && description.length < 10) {
        return {
            success: false,
            error: 'La description doit contenir au moins 10 caractères',
        };
    }

    // Проверка изображения (если загружено новое)
    if (image && image.size > 0) {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(image.type)) {
            return {
                success: false,
                error: 'Format d\'image non supporté. Utilisez JPEG, PNG ou WebP',
            };
        }

        if (image.size > 5 * 1024 * 1024) {
            return {
                success: false,
                error: 'L\'image ne doit pas dépasser 5 Mo',
            };
        }
    }

    try {
        await apiFormData(`/admin/services/${id}`, formData, token, 'PATCH');

        revalidateServices();

        return {
            success: true,
            message: 'Service mis à jour avec succès',
        };

    } catch (error) {
        const errorMessages = {
            'not_found': 'Service non trouvé',
            'duplicate_slug': 'Un service avec ce nom existe déjà',
            'invalid_category': 'Catégorie invalide',
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
 * Удалить услугу
 * 
 * @param {string} id - ID услуги
 * @returns {Promise<{ success: boolean, error?: string }>}
 * 
 * @example
 * const result = await deleteService(service._id);
 */
export async function deleteService(id) {
    const token = await getToken();

    try {
        await apiDelete(`/admin/services/${id}`, token);

        revalidateServices();

        return {
            success: true,
            message: 'Service supprimé avec succès',
        };

    } catch (error) {
        const errorMessages = {
            'not_found': 'Service non trouvé',
            'has_works': 'Impossible de supprimer: le service contient des réalisations',
            'has_prices': 'Impossible de supprimer: le service contient des tarifs',
        };

        return {
            success: false,
            error: errorMessages[error.code] || error.message || 'Erreur lors de la suppression',
        };
    }
}