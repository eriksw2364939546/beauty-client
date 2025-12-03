// ═══════════════════════════════════════════════════════════════════════════
// Page: /beauty-admin/services - Список услуг
// ═══════════════════════════════════════════════════════════════════════════

import ServicesPage from '@/modules/PrivatePages/ServicesPage/ServicesPage';
import ServicesService from '@/services/services.service';

export const metadata = {
    title: 'Services',
};

export default async function Page() {
    const { data: services } = await ServicesService.getAll(
        { limit: 100 },
        { cache: 'no-store' }
    );

    return <ServicesPage services={services} />;
}