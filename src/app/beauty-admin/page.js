// ═══════════════════════════════════════════════════════════════════════════
// Page: /beauty-admin - Dashboard (главная страница админки)
// ═══════════════════════════════════════════════════════════════════════════

import DashboardPage from '@/modules/PrivatePages/DashboardPage/DashboardPage';
import CategoriesService from '@/services/categories.service';
import ServicesService from '@/services/services.service';
import WorksService from '@/services/works.service';
import MastersService from '@/services/masters.service';
import ProductsService from '@/services/products.service';
import PricesService from '@/services/prices.service';

export const metadata = {
    title: 'Tableau de bord',
};

/**
 * Загрузить статистику для Dashboard
 */
async function getStats() {
    try {
        // Параллельно загружаем все данные
        const [
            categoriesRes,
            servicesRes,
            worksRes,
            mastersRes,
            productsRes,
            pricesRes,
        ] = await Promise.all([
            CategoriesService.getAll({ limit: 1 }),
            ServicesService.getAll({ limit: 1 }),
            WorksService.getAll({ limit: 1 }),
            MastersService.getAll({ limit: 1 }),
            ProductsService.getAll({ limit: 1 }),
            PricesService.getAll({ limit: 1 }),
        ]);

        return {
            categories: categoriesRes.meta?.total || 0,
            services: servicesRes.meta?.total || 0,
            works: worksRes.meta?.total || 0,
            masters: mastersRes.meta?.total || 0,
            products: productsRes.meta?.total || 0,
            prices: pricesRes.meta?.total || 0,
        };
    } catch (error) {
        console.error('Error loading dashboard stats:', error);
        return {
            categories: 0,
            services: 0,
            works: 0,
            masters: 0,
            products: 0,
            prices: 0,
        };
    }
}

export default async function Page() {
    const stats = await getStats();

    return <DashboardPage stats={stats} />;
}