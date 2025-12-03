// ═══════════════════════════════════════════════════════════════════════════
// Page: /beauty-admin/masters/[id]/edit - Редактирование мастера
// ═══════════════════════════════════════════════════════════════════════════

import { notFound } from 'next/navigation';
import MasterEditPage from '@/modules/PrivatePages/MastersPage/MasterEditPage';
import MastersService from '@/services/masters.service';

export const metadata = {
    title: 'Modifier le professionnel',
};

export default async function Page({ params }) {
    const { id } = await params;

    try {
        const master = await MastersService.getById(id);
        return <MasterEditPage master={master} />;
    } catch (error) {
        notFound();
    }
}