// ═══════════════════════════════════════════════════════════════════════════
// Server Actions - Товары (POST, PATCH, DELETE)
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
function revalidateProducts() {
    revalidatePath('/beauty-admin/products-admin');
    // Публичные страницы
    revalidatePath('/');
    revalidatePath('/products');
}

/**
 * Создать товар
 * 
 * @param {object} prevState - предыдущее состояние
 * @param {FormData} formData - данные формы (title, description, price, code, brand, categoryId, image)
 * @returns {Promise<{ success: boolean, error?: string, details?: array }>}
 * 
 * @example
 * const [state, formAction, isPending] = useActionState(createProduct, { success: false });
 */
export async function createProduct(prevState, formData) {
    const token = await getToken();

    // Валидация на сервере
    const title = formData.get('title');
    const description = formData.get('description');
    const price = formData.get('price');
    const code = formData.get('code');
    const brand = formData.get('brand');
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

    if (!price || isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
        return {
            success: false,
            error: 'Le prix doit être un nombre positif',
        };
    }

    if (!code || code.length < 1) {
        return {
            success: false,
            error: 'Le code article est obligatoire',
        };
    }

    if (!brand || brand.length < 1) {
        return {
            success: false,
            error: 'La marque est obligatoire',
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
        await apiFormData('/admin/products', formData, token, 'POST');

        revalidateProducts();

        return {
            success: true,
            message: 'Produit créé avec succès',
        };

    } catch (error) {
        const errorMessages = {
            'duplicate_slug': 'Un produit avec ce nom existe déjà',
            'duplicate_code': 'Ce code article existe déjà',
            'invalid_category': 'Catégorie invalide',
            'category_not_found': 'Catégorie non trouvée',
            'invalid_section': 'La catégorie doit être de type "product"',
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
 * Обновить товар
 * 
 * @param {string} id - ID товара
 * @param {object} prevState - предыдущее состояние
 * @param {FormData} formData - данные формы
 * @returns {Promise<{ success: boolean, error?: string, details?: array }>}
 * 
 * @example
 * const updateWithId = updateProduct.bind(null, product._id);
 * const [state, formAction, isPending] = useActionState(updateWithId, { success: false });
 */
export async function updateProduct(id, prevState, formData) {
    const token = await getToken();

    // Валидация
    const title = formData.get('title');
    const description = formData.get('description');
    const price = formData.get('price');
    const code = formData.get('code');
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

    if (price && (isNaN(parseFloat(price)) || parseFloat(price) <= 0)) {
        return {
            success: false,
            error: 'Le prix doit être un nombre positif',
        };
    }

    if (code && code.length < 1) {
        return {
            success: false,
            error: 'Le code article ne peut pas être vide',
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
        await apiFormData(`/admin/products/${id}`, formData, token, 'PATCH');

        revalidateProducts();

        return {
            success: true,
            message: 'Produit mis à jour avec succès',
        };

    } catch (error) {
        const errorMessages = {
            'not_found': 'Produit non trouvé',
            'duplicate_slug': 'Un produit avec ce nom existe déjà',
            'duplicate_code': 'Ce code article existe déjà',
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
 * Удалить товар
 * 
 * @param {string} id - ID товара
 * @returns {Promise<{ success: boolean, error?: string }>}
 * 
 * @example
 * const result = await deleteProduct(product._id);
 */
export async function deleteProduct(id) {
    const token = await getToken();

    try {
        await apiDelete(`/admin/products/${id}`, token);

        revalidateProducts();

        return {
            success: true,
            message: 'Produit supprimé avec succès',
        };

    } catch (error) {
        const errorMessages = {
            'not_found': 'Produit non trouvé',
        };

        return {
            success: false,
            error: errorMessages[error.code] || error.message || 'Erreur lors de la suppression',
        };
    }
}