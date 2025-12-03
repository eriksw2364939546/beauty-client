// ═══════════════════════════════════════════════════════════════════════════
// Page: /beauty-admin/products - Список товаров
// ═══════════════════════════════════════════════════════════════════════════

import ProductsPage from '@/modules/PrivatePages/ProductsPage/ProductsPage';
import ProductsService from '@/services/products.service';

export const metadata = {
    title: 'Produits',
};

export default async function Page() {
    const { data: products } = await ProductsService.getAll(
        { limit: 100 },
        { cache: 'no-store' }
    );

    return <ProductsPage products={products} />;
}