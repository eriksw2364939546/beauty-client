// ═══════════════════════════════════════════════════════════════════════════
// Page: /beauty-admin/prices - Список расценок
// ═══════════════════════════════════════════════════════════════════════════

import PricesPage from '@/modules/PrivatePages/PricesPage/PricesPage';
import PricesService from '@/services/prices.service';

export const metadata = {
    title: 'Tarifs',
};

export default async function Page() {
    const { data: prices } = await PricesService.getAll(
        { limit: 100, sort: 'sortOrder' },
        { cache: 'no-store' }
    );

    return <PricesPage prices={prices} />;
}