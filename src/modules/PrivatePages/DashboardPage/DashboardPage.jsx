import Link from "next/link";
import "./DashboardPage.scss";

/**
 * Страница Dashboard (главная страница админки)
 *
 * @param {object} props
 * @param {object} props.stats - статистика
 * @param {number} props.stats.categories - количество категорий
 * @param {number} props.stats.services - количество услуг
 * @param {number} props.stats.works - количество работ
 * @param {number} props.stats.masters - количество мастеров
 * @param {number} props.stats.products - количество товаров
 * @param {number} props.stats.prices - количество расценок
 */
export default function DashboardPage({ stats }) {
  const cards = [
    {
      title: "Catégories",
      count: stats.categories,
      icon: "folder",
      href: "/beauty-admin/categories",
      color: "blue",
    },
    {
      title: "Services",
      count: stats.services,
      icon: "spa",
      href: "/beauty-admin/services",
      color: "purple",
    },
    {
      title: "Réalisations",
      count: stats.works,
      icon: "photo_library",
      href: "/beauty-admin/works",
      color: "pink",
    },
    {
      title: "Professionnels",
      count: stats.masters,
      icon: "people",
      href: "/beauty-admin/masters",
      color: "green",
    },
    {
      title: "Produits",
      count: stats.products,
      icon: "inventory_2",
      href: "/beauty-admin/products",
      color: "orange",
    },
    {
      title: "Tarifs",
      count: stats.prices,
      icon: "euro",
      href: "/beauty-admin/prices",
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
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className={`dashboard-page__card dashboard-page__card--${card.color}`}
          >
            <div className="dashboard-page__card-icon">
              <span className="material-icons">{card.icon}</span>
            </div>
            <div className="dashboard-page__card-content">
              <span className="dashboard-page__card-count">{card.count}</span>
              <span className="dashboard-page__card-title">{card.title}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="dashboard-page__section">
        <h2 className="dashboard-page__section-title">Actions rapides</h2>
        <div className="dashboard-page__actions">
          <Link href="/beauty-admin/services/new" className="btn btn--primary">
            <span className="material-icons">add</span>
            Nouveau service
          </Link>
          <Link href="/beauty-admin/works/new" className="btn btn--primary">
            <span className="material-icons">add</span>
            Nouvelle réalisation
          </Link>
          <Link href="/beauty-admin/products/new" className="btn btn--primary">
            <span className="material-icons">add</span>
            Nouveau produit
          </Link>
          <Link href="/beauty-admin/prices/new" className="btn btn--primary">
            <span className="material-icons">add</span>
            Nouveau tarif
          </Link>
        </div>
      </div>
    </div>
  );
}
