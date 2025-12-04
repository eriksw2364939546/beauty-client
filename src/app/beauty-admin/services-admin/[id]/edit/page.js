// ═══════════════════════════════════════════════════════════════════════════
// Page: /beauty-admin/services/[id]/edit - Редактирование услуги
// ═══════════════════════════════════════════════════════════════════════════

import { notFound } from 'next/navigation';
import ServiceEditPage from '@/modules/PrivatePages/ServicesPage/ServiceEditPage';
import ServicesService from '@/services/services.service';
import CategoriesService from '@/services/categories.service';

export const metadata = {
    title: 'Modifier le service',
};

export default async function Page({ params }) {
    const { id } = await params;

    try {
        // Параллельно загружаем услугу и категории
        const [service, categories] = await Promise.all([
            ServicesService.getById(id),
            CategoriesService.getForSelect('service'),
        ]);

        return <ServiceEditPage service={service} categories={categories} />;
    } catch (error) {
        notFound();
    }
}