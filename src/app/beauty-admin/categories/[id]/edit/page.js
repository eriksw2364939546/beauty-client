// ═══════════════════════════════════════════════════════════════════════════
// Page: /beauty-admin/categories/[id]/edit - Редактирование категории
// ═══════════════════════════════════════════════════════════════════════════

import { notFound } from 'next/navigation';
import CategoryEditPage from '@/modules/PrivatePages/CategoriesPage/CategoryEditPage';
import CategoriesService from '@/services/categories.service';

export const metadata = {
    title: 'Modifier la catégorie',
};

export default async function Page({ params }) {
    const { id } = await params;

    try {
        const category = await CategoriesService.getById(id);
        return <CategoryEditPage category={category} />;
    } catch (error) {
        notFound();
    }
}