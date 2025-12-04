"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { logout } from "@/actions/auth.actions";
import {
  LayoutDashboard,
  Folder,
  Scissors, // Заменил Spa на Scissors или можно использовать Wand2
  Images,
  Users,
  Package,
  Euro,
  UserCircle,
  LogOut,
} from "lucide-react";
import "./AdminSidebar.scss";

/**
 * Боковое меню админки
 *
 * @param {object} props
 * @param {object} props.user - данные пользователя
 */
export default function AdminSidebar({ user }) {
  const pathname = usePathname();

  const menuItems = [
    {
      href: "/beauty-admin",
      label: "Tableau de bord",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      href: "/beauty-admin/categories-admin",
      label: "Catégories",
      icon: Folder,
    },
    {
      href: "/beauty-admin/services-admin",
      label: "Services",
      icon: Scissors, // Используем Scissors вместо Spa
    },
    {
      href: "/beauty-admin/works-admin",
      label: "Réalisations",
      icon: Images,
    },
    {
      href: "/beauty-admin/masters-admin",
      label: "Professionnels",
      icon: Users,
    },
    {
      href: "/beauty-admin/products-admin",
      label: "Produits",
      icon: Package,
    },
    {
      href: "/beauty-admin/prices-admin",
      label: "Tarifs",
      icon: Euro,
    },
  ];

  /**
   * Проверить активность пункта меню
   */
  const isActive = (href, exact = false) => {
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className="admin-sidebar">
      {/* Логотип */}
      <div className="admin-sidebar__logo">
        <Link href="/beauty-admin">
          <span className="admin-sidebar__logo-text">Beauty Admin</span>
        </Link>
      </div>

      {/* Навигация */}
      <nav className="admin-sidebar__nav">
        <ul className="admin-sidebar__menu">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <li key={item.href} className="admin-sidebar__menu-item">
                <Link
                  href={item.href}
                  className={`admin-sidebar__link ${
                    isActive(item.href, item.exact)
                      ? "admin-sidebar__link--active"
                      : ""
                  }`}
                >
                  <IconComponent className="admin-sidebar__icon" size={20} />
                  <span className="admin-sidebar__label">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Разделитель */}
      <div className="admin-sidebar__divider" />

      {/* Пользователь и выход */}
      <div className="admin-sidebar__footer">
        {user && (
          <div className="admin-sidebar__user">
            <UserCircle className="admin-sidebar__user-icon" size={20} />
            <span className="admin-sidebar__user-email">{user.email}</span>
          </div>
        )}

        <form action={logout}>
          <button type="submit" className="admin-sidebar__logout">
            <LogOut className="admin-sidebar__icon" size={20} />
            <span className="admin-sidebar__label">Déconnexion</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
