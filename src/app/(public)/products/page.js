import ProductsPage from "@/modules/ProductsPage/ProductsPage";
import productsService from "@/services/products.service";
import categoriesService from "@/services/categories.service";

export default async function PRODUCTSPage({ searchParams }) {
    // Получаем параметры из URL
    const params = await searchParams;

    // ВАЖНО: проверяем что category существует и не равен 'undefined'
    const categoryParam = params?.category;
    const category = (categoryParam && categoryParam !== 'undefined') ? categoryParam : 'all';

    // Получаем поисковый запрос
    const searchQuery = params?.search || '';

    const page = parseInt(params?.page) || 1;
    const limit = 6;

    // Загружаем категории (бренды)
    const { data: categoriesData } = await categoriesService.getAll({
        section: 'product',
        sort: 'sortOrder'
    });

    // Формируем массив категорий с правильными ключами
    const categories = [
        { _id: "all", id: "all", title: "Tous les produits" },
        ...categoriesData.map(cat => ({
            ...cat,
            _id: cat._id || cat.id,
            id: cat.id || cat._id
        }))
    ];

    // Загружаем продукты с фильтрацией
    let products = [];
    let meta = { page: 1, limit: 6, total: 0, pages: 1 };

    try {
        const queryParams = {
            page,
            limit
        };

        // Добавляем фильтр по категории, если не "all"
        if (category !== 'all') {
            queryParams.category = category;
        }

        // Добавляем поисковый запрос если есть
        if (searchQuery) {
            queryParams.search = searchQuery;
        }

        const result = await productsService.getAll(queryParams);
        products = result.data;
        meta = result.meta;
    } catch (error) {
        console.error('Ошибка загрузки продуктов:', error);
        // Возвращаем пустые данные при ошибке
    }

    return (
        <ProductsPage
            initialProducts={products}
            initialMeta={meta}
            categories={categories}
            initialCategory={category}
            initialPage={page}
            initialSearch={searchQuery}
        />
    );
}