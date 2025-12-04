// ═══════════════════════════════════════════════════════════════════════════
// Page: /beauty-admin/prices/[id]/edit - Редактирование расценки
// ═══════════════════════════════════════════════════════════════════════════

import { notFound } from 'next/navigation';
import PriceEditPage from '@/modules/PrivatePages/PricesPage/PriceEditPage';
import PricesService from '@/services/prices.service';
import ServicesService from '@/services/services.service';

export const metadata = {
    title: 'Modifier le tarif',
};

export default async function Page({ params }) {
    const { id } = await params;

    try {
        // Параллельно загружаем расценку и услуги
        const [price, services] = await Promise.all([
            PricesService.getById(id),
            ServicesService.getForSelect(),
        ]);

        return <PriceEditPage price={price} services={services} />;
    } catch (error) {
        notFound();
    }
}