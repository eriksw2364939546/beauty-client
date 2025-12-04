// ═══════════════════════════════════════════════════════════════════════════
// Admin Layout - Общий layout для всех страниц админки
// ═══════════════════════════════════════════════════════════════════════════

import { headers } from 'next/headers';
import AuthService from '@/services/auth.service';
import AdminSidebar from '@/components/AdminSidebar/AdminSidebar';
import './admin.scss';

export const metadata = {
    title: {
        template: '%s | Beauty Admin',
        default: 'Beauty Admin',
    },
    description: 'Panneau d\'administration du salon de beauté',
    robots: {
        index: false,
        follow: false,
    },
};

export default async function AdminLayout({ children }) {
    // Получаем текущий путь из headers (установлен в middleware)
    const headersList = await headers();
    const pathname = headersList.get('x-pathname') || '';

    // Для страницы логина — только children без sidebar
    const isLoginPage = pathname.includes('/login');

    if (isLoginPage) {
        return <>{children}</>;
    }

    // Для остальных страниц — middleware уже проверил токен
    // Здесь просто получаем данные юзера для sidebar
    const { user } = await AuthService.verifyToken();

    return (
        <div className="admin-layout">
            <AdminSidebar user={user} />

            <main className="admin-layout__main">
                <div className="admin-layout__content">
                    {children}
                </div>
            </main>
        </div>
    );
}