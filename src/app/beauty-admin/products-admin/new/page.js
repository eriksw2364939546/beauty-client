// ═══════════════════════════════════════════════════════════════════════════
// Page: /beauty-admin/products/new - Создание товара
// ═══════════════════════════════════════════════════════════════════════════

import ProductNewPage from '@/modules/PrivatePages/ProductsPage/ProductNewPage';
import CategoriesService from '@/services/categories.service';
import ProductsService from '@/services/products.service';

export const metadata = {
    title: 'Nouveau produit',
};

export default async function Page() {
    // Параллельно загружаем категории и бренды
    const [categories, brands] = await Promise.all([
        CategoriesService.getForSelect('product'),
        ProductsService.getBrands(),
    ]);

    return <ProductNewPage categories={categories} brands={brands} />;
}