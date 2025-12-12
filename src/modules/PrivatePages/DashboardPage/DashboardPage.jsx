import Link from "next/link";
import {
  Folder,
  Scissors,
  Images,
  Users,
  Package,
  Euro,
  Plus,
} from "lucide-react";
import "./DashboardPage.scss";

/**
 * Страница Dashboard (главная страница админки)
 *
 * @param {object} props
 * @param {object} props.stats - статистика
 * @param {number} props.stats.categories-admin - количество категорий
 * @param {number} props.stats.services-admin - количество услуг
 * @param {number} props.stats.works-admin - количество работ
 * @param {number} props.stats.masters-admin - количество мастеров
 * @param {number} props.stats.products-admin - количество товаров
 * @param {number} props.stats.prices-admin - количество расценок
 */
export default function DashboardPage({ stats }) {
  const cards = [
    {
      title: "Catégories",
      count: stats.categories,
      icon: Folder,
      href: "/beauty-admin/categories-admin",
      color: "blue",
    },
    {
      title: "Services",
      count: stats.services,
      icon: Scissors,
      href: "/beauty-admin/services-admin",
      color: "purple",
    },
    {
      title: "Réalisations",
      count: stats.works,
      icon: Images,
      href: "/beauty-admin/works-admin",
      color: "pink",
    },
    {
      title: "Professionnels",
      count: stats.masters,
      icon: Users,
      href: "/beauty-admin/masters-admin",
      color: "green",
    },
    {
      title: "Produits",
      count: stats.products,
      icon: Package,
      href: "/beauty-admin/products-admin",
      color: "orange",
    },
    {
      title: "Tarifs",
      count: stats.prices,
      icon: Euro,
      href: "/beauty-admin/prices-admin",
      color: "teal",
    },
  ];

  return (
    <div className="dashboard-page">
      {/* Header */}
      <div className="dashboard-page__header">
        <h1 className="dashboard-page__title">Tableau de bord</h1>
        <p className="dashboard-page__subtitle">
          Bienvenue dans votre espace d'administration
        </p>
      </div>

      {/* Stats Grid */}
      <div className="dashboard-page__grid">
        {cards.map((card) => {
          const IconComponent = card.icon;
          return (
            <Link
              key={card.href}
              href={card.href}
              className={`dashboard-page__card dashboard-page__card--${card.color}`}
            >
              <div className="dashboard-page__card-icon">
                <IconComponent size={24} />
              </div>
              <div className="dashboard-page__card-content">
                <span className="dashboard-page__card-count">{card.count}</span>
                <span className="dashboard-page__card-title">{card.title}</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="dashboard-page__section">
        <h2 className="dashboard-page__section-title">Actions rapides</h2>
        <div className="dashboard-page__actions">
          <Link
            href="/beauty-admin/services-admin/new"
            className="btn btn--primary"
          >
            <Plus size={18} />
            Nouveau service
          </Link>
          <Link
            href="/beauty-admin/works-admin/new"
            className="btn btn--primary"
          >
            <Plus size={18} />
            Nouvelle réalisation
          </Link>
          <Link
            href="/beauty-admin/products-admin/new"
            className="btn btn--primary"
          >
            <Plus size={18} />
            Nouveau produit
          </Link>
          <Link
            href="/beauty-admin/prices-admin/new"
            className="btn btn--primary"
          >
            <Plus size={18} />
            Nouveau tarif
          </Link>
        </div>
      </div>
    </div>
  );
}
