// ═══════════════════════════════════════════════════════════════════════════
// Page: /beauty-admin/products - Список товаров
// ═══════════════════════════════════════════════════════════════════════════

import ProductsPage from '@/modules/PrivatePages/ProductsPage/ProductsPage';
import ProductsService from '@/services/products.service';

export const metadata = {
    title: 'Produits',
};

export default async function Page({ searchParams }) {
    // Получаем параметры поиска из URL
    const params = await searchParams;
    const searchQuery = params?.search || '';

    // Формируем параметры запроса
    const queryParams = {
        limit: 100
    };

    // Добавляем поисковый запрос если он есть (минимум 2 символа)
    if (searchQuery && searchQuery.trim().length >= 2) {
        queryParams.search = searchQuery.trim();
    }

    const { data: products } = await ProductsService.getAll(
        queryParams,
        { cache: 'no-store' }
    );

    return <ProductsPage products={products} initialSearch={searchQuery} />;
}