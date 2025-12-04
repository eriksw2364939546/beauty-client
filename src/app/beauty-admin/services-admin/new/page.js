// ═══════════════════════════════════════════════════════════════════════════
// Page: /beauty-admin/services/new - Создание услуги
// ═══════════════════════════════════════════════════════════════════════════

import ServiceNewPage from '@/modules/PrivatePages/ServicesPage/ServiceNewPage';
import CategoriesService from '@/services/categories.service';

export const metadata = {
    title: 'Nouveau service',
};

export default async function Page() {
    // Загружаем категории секции 'service' для select
    const categories = await CategoriesService.getForSelect('service');
    console.log('Categories for select:', categories);
    return <ServiceNewPage categories={categories} />;
}