// ═══════════════════════════════════════════════════════════════════════════
// Page: /beauty-admin/categories - Список категорий
// ═══════════════════════════════════════════════════════════════════════════

import CategoriesPage from '@/modules/PrivatePages/CategoriesPage/CategoriesPage';
import CategoriesService from '@/services/categories.service';

export const metadata = {
    title: 'Catégories',
};

export default async function Page() {
    const { data: categories } = await CategoriesService.getAll(
        { limit: 100, sort: 'sortOrder' },
        { cache: 'no-store' }
    );

    return <CategoriesPage categories={categories} />;
}