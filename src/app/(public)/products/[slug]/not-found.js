import Link from "next/link";
import "./not-found.scss";

export default function NotFound() {
    return (
        <main className="product-not-found">
            <div className="container">
                <div className="product-not-found__content">
                    <h1 className="product-not-found__title">404</h1>
                    <h2 className="product-not-found__subtitle">Produit non trouvé</h2>
                    <p className="product-not-found__text">
                        Désolé, le produit que vous recherchez n'existe pas ou a été supprimé.
                    </p>
                    <Link href="/products" className="product-not-found__link">
                        ← Retour au catalogue
                    </Link>
                </div>
            </div>
        </main>
    );
}
