// ═══════════════════════════════════════════════════════════════════════════
// Admin Layout - Общий layout для всех страниц админки
// ═══════════════════════════════════════════════════════════════════════════

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
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
    // Получаем текущий путь
    const headersList = await headers();
    const pathname = headersList.get('x-pathname') || '';

    // Для страницы логина — не показываем sidebar и не проверяем авторизацию
    const isLoginPage = pathname.includes('/login');

    if (isLoginPage) {
        return <>{children}</>;
    }

    // Проверяем авторизацию на сервере
    const { valid, user } = await AuthService.verifyToken();

    // Если не авторизован — редирект на логин
    if (!valid) {
        redirect('/beauty-admin/login');
    }

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