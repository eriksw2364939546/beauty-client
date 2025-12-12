// ═══════════════════════════════════════════════════════════════════════════
// Page: /beauty-admin/products/[id]/edit - Редактирование товара
// ═══════════════════════════════════════════════════════════════════════════

import { notFound } from 'next/navigation';
import ProductEditPage from '@/modules/PrivatePages/ProductsPage/ProductEditPage';
import ProductsService from '@/services/products.service';
import CategoriesService from '@/services/categories.service';

export const metadata = {
    title: 'Modifier le produit',
};

export default async function Page({ params }) {
    const { id } = await params;

    try {
        // Параллельно загружаем товар, категории и бренды
        const [product, categories, brands] = await Promise.all([
            ProductsService.getById(id),
            CategoriesService.getForSelect('product'),
            ProductsService.getBrands(),
        ]);

        return <ProductEditPage product={product} categories={categories} brands={brands} />;
    } catch (error) {
        notFound();
    }
}