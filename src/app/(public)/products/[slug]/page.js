import ProductDetailPage from "@/modules/ProductDetailPage/ProductDetailPage";
import productsService from "@/services/products.service";
import { notFound } from "next/navigation";

export default async function PRODUCTPage({ params }) {
    // Получаем slug из параметров
    const { slug } = await params;

    try {
        // Загружаем товар по slug
        const product = await productsService.getBySlug(slug);

        // Передаем товар как props
        return <ProductDetailPage product={product} />;
    } catch (error) {
        console.error('Ошибка загрузки товара:', error);

        // Если товар не найден - показываем 404
        notFound();
    }
}

// Генерация метаданных для SEO
export async function generateMetadata({ params }) {
    const { slug } = await params;

    try {
        const product = await productsService.getBySlug(slug);

        return {
            title: `${product.title} - ${product.category?.title || product.brand}`,
            description: product.description,
            openGraph: {
                title: product.title,
                description: product.description,
                images: [product.image],
            },
        };
    } catch (error) {
        return {
            title: 'Produit non trouvé',
        };
    }
}