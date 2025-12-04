// ═══════════════════════════════════════════════════════════════════════════
// Page: /beauty-admin/works/new - Создание работы
// ═══════════════════════════════════════════════════════════════════════════

import WorkNewPage from '@/modules/PrivatePages/WorksPage/WorkNewPage';
import ServicesService from '@/services/services.service';

export const metadata = {
    title: 'Nouvelle réalisation',
};

export default async function Page() {
    // Загружаем услуги для select
    const services = await ServicesService.getForSelect();

    return <WorkNewPage services={services} />;
}