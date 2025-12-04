// ═══════════════════════════════════════════════════════════════════════════
// Page: /beauty-admin/masters - Список мастеров
// ═══════════════════════════════════════════════════════════════════════════

import MastersPage from '@/modules/PrivatePages/MastersPage/MastersPage';
import MastersService from '@/services/masters.service';

export const metadata = {
    title: 'Professionnels',
};

export default async function Page() {
    const { data: masters } = await MastersService.getAll(
        { limit: 50 },
        { cache: 'no-store' }
    );

    return <MastersPage masters={masters} />;
}