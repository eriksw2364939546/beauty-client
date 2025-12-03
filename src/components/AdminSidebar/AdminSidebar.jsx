"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { logout } from "@/actions/auth.actions";
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
      icon: "dashboard",
      exact: true,
    },
    {
      href: "/beauty-admin/categories",
      label: "Catégories",
      icon: "folder",
    },
    {
      href: "/beauty-admin/services",
      label: "Services",
      icon: "spa",
    },
    {
      href: "/beauty-admin/works",
      label: "Réalisations",
      icon: "photo_library",
    },
    {
      href: "/beauty-admin/masters",
      label: "Professionnels",
      icon: "people",
    },
    {
      href: "/beauty-admin/products",
      label: "Produits",
      icon: "inventory_2",
    },
    {
      href: "/beauty-admin/prices",
      label: "Tarifs",
      icon: "euro",
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
          {menuItems.map((item) => (
            <li key={item.href} className="admin-sidebar__menu-item">
              <Link
                href={item.href}
                className={`admin-sidebar__link ${
                  isActive(item.href, item.exact)
                    ? "admin-sidebar__link--active"
                    : ""
                }`}
              >
                <span className="material-icons admin-sidebar__icon">
                  {item.icon}
                </span>
                <span className="admin-sidebar__label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Разделитель */}
      <div className="admin-sidebar__divider" />

      {/* Пользователь и выход */}
      <div className="admin-sidebar__footer">
        {user && (
          <div className="admin-sidebar__user">
            <span className="material-icons admin-sidebar__user-icon">
              account_circle
            </span>
            <span className="admin-sidebar__user-email">{user.email}</span>
          </div>
        )}

        <form action={logout}>
          <button type="submit" className="admin-sidebar__logout">
            <span className="material-icons admin-sidebar__icon">logout</span>
            <span className="admin-sidebar__label">Déconnexion</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
