// ═══════════════════════════════════════════════════════════════════════════
// Server Actions - Работы/Портфолио (POST, DELETE)
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
function revalidateWorks() {
    revalidatePath('/beauty-admin/works-admin');
    // Публичные страницы
    revalidatePath('/');
    revalidatePath('/works');
    revalidatePath('/services');
}

/**
 * Создать работу
 * 
 * @param {object} prevState - предыдущее состояние
 * @param {FormData} formData - данные формы (serviceId, image)
 * @returns {Promise<{ success: boolean, error?: string, details?: array }>}
 * 
 * @example
 * const [state, formAction, isPending] = useActionState(createWork, { success: false });
 */
export async function createWork(prevState, formData) {
    const token = await getToken();

    // Валидация на сервере
    const serviceId = formData.get('serviceId');
    const image = formData.get('image');

    if (!serviceId) {
        return {
            success: false,
            error: 'Veuillez sélectionner un service',
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
        await apiFormData('/admin/works', formData, token, 'POST');

        revalidateWorks();

        return {
            success: true,
            message: 'Réalisation créée avec succès',
        };

    } catch (error) {
        const errorMessages = {
            'service_not_found': 'Service non trouvé',
            'invalid_service': 'Service invalide',
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
 * Удалить работу
 * 
 * @param {string} id - ID работы
 * @returns {Promise<{ success: boolean, error?: string }>}
 * 
 * @example
 * const result = await deleteWork(work._id);
 */
export async function deleteWork(id) {
    const token = await getToken();

    try {
        await apiDelete(`/admin/works/${id}`, token);

        revalidateWorks();

        return {
            success: true,
            message: 'Réalisation supprimée avec succès',
        };

    } catch (error) {
        const errorMessages = {
            'not_found': 'Réalisation non trouvée',
        };

        return {
            success: false,
            error: errorMessages[error.code] || error.message || 'Erreur lors de la suppression',
        };
    }
}