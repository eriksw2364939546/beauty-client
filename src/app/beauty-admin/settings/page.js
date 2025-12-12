// ═══════════════════════════════════════════════════════════════════════════
// Page: /beauty-admin/settings - Настройки профиля
// ═══════════════════════════════════════════════════════════════════════════

import SettingsPage from '@/modules/PrivatePages/SettingsPage/SettingsPage';
import AuthService from '@/services/auth.service';

export const metadata = {
    title: 'Paramètres',
};

export default async function Page() {
    // Получаем данные текущего пользователя
    const user = await AuthService.getCurrentUser();

    return <SettingsPage user={user} />;
}