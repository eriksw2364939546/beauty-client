// ═══════════════════════════════════════════════════════════════════════════
// Proxy - Защита админских маршрутов (Next.js 16)
// ═══════════════════════════════════════════════════════════════════════════

import { NextResponse } from 'next/server';

const COOKIE_NAME = process.env.COOKIE_NAME || 'admin_token';

/**
 * Proxy для защиты /beauty-admin/* маршрутов
 * 
 * Логика:
 * 1. /beauty-admin/login — доступен всем
 *    - Если есть токен → редирект на /beauty-admin
 * 2. /beauty-admin/* — требует токен
 *    - Если нет токена → редирект на /beauty-admin/login
 */
export default async function proxy(request, context) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get(COOKIE_NAME)?.value;

    // Добавляем pathname в headers для использования в layout
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-pathname', pathname);

    // Страница логина
    if (pathname === '/beauty-admin/login') {
        // Если уже авторизован — редирект на дашборд
        if (token) {
            return NextResponse.redirect(new URL('/beauty-admin', request.url));
        }
        // Иначе — показываем страницу логина
        return NextResponse.next({
            request: { headers: requestHeaders },
        });
    }

    // Все остальные страницы админки требуют авторизации
    if (pathname.startsWith('/beauty-admin')) {
        // Нет токена — редирект на логин
        if (!token) {
            const loginUrl = new URL('/beauty-admin/login', request.url);
            // Сохраняем куда хотел попасть пользователь
            loginUrl.searchParams.set('from', pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next({
        request: { headers: requestHeaders },
    });
}

/**
 * Конфигурация — на какие пути применять proxy
 */
export const config = {
    matcher: '/beauty-admin/:path*',
};