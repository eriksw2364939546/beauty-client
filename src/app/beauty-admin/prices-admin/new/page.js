// ═══════════════════════════════════════════════════════════════════════════
// Page: /beauty-admin/prices/new - Создание расценки
// ═══════════════════════════════════════════════════════════════════════════

import PriceNewPage from '@/modules/PrivatePages/PricesPage/PriceNewPage';
import ServicesService from '@/services/services.service';

export const metadata = {
    title: 'Nouveau tarif',
};

export default async function Page() {
    // Загружаем услуги для select
    const services = await ServicesService.getForSelect();

    return <PriceNewPage services={services} />;
}