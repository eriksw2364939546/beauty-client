// ═══════════════════════════════════════════════════════════════════════════
// Server Actions - Мастера (POST, PATCH, DELETE)
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
function revalidateMasters() {
    revalidatePath('/beauty-admin/masters-admin');
    // Публичные страницы
    revalidatePath('/');
    revalidatePath('/masters');
}

/**
 * Создать мастера
 * 
 * @param {object} prevState - предыдущее состояние
 * @param {FormData} formData - данные формы (fullName, speciality, image)
 * @returns {Promise<{ success: boolean, error?: string, details?: array }>}
 * 
 * @example
 * const [state, formAction, isPending] = useActionState(createMaster, { success: false });
 */
export async function createMaster(prevState, formData) {
    const token = await getToken();

    // Валидация на сервере
    const fullName = formData.get('fullName');
    const speciality = formData.get('speciality');
    const image = formData.get('image');

    if (!fullName || fullName.length < 2) {
        return {
            success: false,
            error: 'Le nom doit contenir au moins 2 caractères',
        };
    }

    if (!speciality || speciality.length < 2) {
        return {
            success: false,
            error: 'La spécialité doit contenir au moins 2 caractères',
        };
    }

    if (!image || image.size === 0) {
        return {
            success: false,
            error: 'Veuillez ajouter une photo',
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
        await apiFormData('/admin/masters', formData, token, 'POST');

        revalidateMasters();

        return {
            success: true,
            message: 'Professionnel créé avec succès',
        };

    } catch (error) {
        const errorMessages = {
            'validation_error': 'Données invalides',
            'file_required': 'La photo est obligatoire',
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
 * Обновить мастера
 * 
 * @param {string} id - ID мастера
 * @param {object} prevState - предыдущее состояние
 * @param {FormData} formData - данные формы
 * @returns {Promise<{ success: boolean, error?: string, details?: array }>}
 * 
 * @example
 * const updateWithId = updateMaster.bind(null, master._id);
 * const [state, formAction, isPending] = useActionState(updateWithId, { success: false });
 */
export async function updateMaster(id, prevState, formData) {
    const token = await getToken();

    // Валидация
    const fullName = formData.get('fullName');
    const speciality = formData.get('speciality');
    const image = formData.get('image');

    if (fullName && fullName.length < 2) {
        return {
            success: false,
            error: 'Le nom doit contenir au moins 2 caractères',
        };
    }

    if (speciality && speciality.length < 2) {
        return {
            success: false,
            error: 'La spécialité doit contenir au moins 2 caractères',
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
        await apiFormData(`/admin/masters/${id}`, formData, token, 'PATCH');

        revalidateMasters();

        return {
            success: true,
            message: 'Professionnel mis à jour avec succès',
        };

    } catch (error) {
        const errorMessages = {
            'not_found': 'Professionnel non trouvé',
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
 * Удалить мастера
 * 
 * @param {string} id - ID мастера
 * @returns {Promise<{ success: boolean, error?: string }>}
 * 
 * @example
 * const result = await deleteMaster(master._id);
 */
export async function deleteMaster(id) {
    const token = await getToken();

    try {
        await apiDelete(`/admin/masters/${id}`, token);

        revalidateMasters();

        return {
            success: true,
            message: 'Professionnel supprimé avec succès',
        };

    } catch (error) {
        const errorMessages = {
            'not_found': 'Professionnel non trouvé',
        };

        return {
            success: false,
            error: errorMessages[error.code] || error.message || 'Erreur lors de la suppression',
        };
    }
}