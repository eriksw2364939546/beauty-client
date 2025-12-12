import MastersPage from "@/modules/MastersPage/MastersPage";
import mastersService from "@/services/masters.service";

export default async function MASTERSPage({ searchParams }) {
    // Получаем параметры из URL
    const params = await searchParams;
    const page = parseInt(params?.page) || 1;
    const limit = 6;
    const search = params?.search || '';

    // Загружаем мастеров с сервера
    let masters = [];
    let meta = { page: 1, limit: 6, total: 0, pages: 1 };

    try {
        const queryParams = {
            page,
            limit
        };

        // Добавляем поиск если есть
        if (search) {
            queryParams.search = search;
        }

        const result = await mastersService.getAll(queryParams);
        masters = result.data;
        meta = result.meta;
    } catch (error) {
        console.error('Ошибка загрузки мастеров:', error);
        // Возвращаем пустые данные при ошибке
    }

    return (
        <MastersPage
            initialMasters={masters}
            initialMeta={meta}
            initialPage={page}
            initialSearch={search}
        />
    );
}

// Генерация метаданных для SEO
export async function generateMetadata() {
    return {
        title: 'Nos maîtres - Professionnels de beauté',
        description: 'Découvrez notre équipe de maîtres professionnels: coiffeurs, esthéticiennes, maquilleurs et autres spécialistes',
    };
}