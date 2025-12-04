// ═══════════════════════════════════════════════════════════════════════════
// Page: /beauty-admin/works - Список работ/портфолио
// ═══════════════════════════════════════════════════════════════════════════

import WorksPage from '@/modules/PrivatePages/WorksPage/WorksPage';
import WorksService from '@/services/works.service';

export const metadata = {
    title: 'Réalisations',
};

export default async function Page() {
    const { data: works } = await WorksService.getAll(
        { limit: 50 },
        { cache: 'no-store' }
    );

    return <WorksPage works={works} />;
}