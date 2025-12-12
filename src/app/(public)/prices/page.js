// app/prices/page.js
import PricesPage from "@/modules/PricesPage/PricesPage";
import pricesService from "@/services/prices.service";
import servicesService from "@/services/services.service";

export const metadata = {
    title: "Tarifs des services - Salon de beauté",
    description: "Découvrez nos tarifs pour tous les services de beauté",
};

export default async function PricesPageRoute({ searchParams }) {
    try {
        // ВАЖНО: await для searchParams
        const params = await searchParams;

        // Получаем параметры из URL
        const serviceSlug = params?.service;
        const page = parseInt(params?.page) || 1;
        const limit = 12; // Количество на странице

        // Проверяем что serviceSlug валидный (не 'undefined' и не пустой)
        const hasValidFilter = serviceSlug &&
            serviceSlug !== 'undefined' &&
            serviceSlug !== 'null' &&
            serviceSlug !== 'all';

        // Получаем все услуги для фильтров
        const servicesResponse = await servicesService.getAll({ limit: 100 });
        const services = servicesResponse.data || [];

        // Получаем расценки с фильтрацией и пагинацией
        let pricesData = [];
        let meta = { page: 1, limit: 3, total: 0, pages: 1 };
        let activeServiceId = null;
        let shouldUseGrouped = false; // Флаг для использования grouped режима

        if (hasValidFilter) {
            // Находим услугу по slug
            const service = services.find(s => s.slug === serviceSlug);

            if (service) {
                // Получаем ID услуги (может быть _id или id)
                activeServiceId = service._id || service.id;

                if (!activeServiceId) {
                    console.error('Ошибка: у услуги нет _id или id!');
                    const result = await pricesService.getAll({ page, limit });
                    pricesData = result.data;
                    meta = result.meta;
                } else {
                    // Получаем расценки для конкретной услуги с пагинацией
                    const result = await pricesService.getAll({
                        service: activeServiceId,
                        page,
                        limit
                    });
                    pricesData = result.data;
                    meta = result.meta;
                }
            } else {
                // Если услуга не найдена - показываем все с пагинацией
                const result = await pricesService.getAll({ page, limit });
                pricesData = result.data;
                meta = result.meta;
            }
        } else {
            // Если не выбрана услуга - получаем все с пагинацией (НЕ grouped!)
            const result = await pricesService.getAll({ page, limit });
            pricesData = result.data;
            meta = result.meta;
        }

        return (
            <PricesPage
                prices={pricesData}
                services={services}
                activeServiceSlug={hasValidFilter ? serviceSlug : 'all'}
                activeServiceId={activeServiceId}
                meta={meta}
                currentPage={page}
                isGrouped={false} // Всегда false т.к. используем getAll()
            />
        );
    } catch (error) {
        console.error('Error loading prices page:', error);
        return (
            <PricesPage
                prices={[]}
                services={[]}
                activeServiceSlug="all"
                activeServiceId={null}
                meta={{ page: 1, limit: 12, total: 0, pages: 1 }}
                currentPage={1}
                isGrouped={false}
            />
        );
    }
}