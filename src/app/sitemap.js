// app/sitemap.js
// Next.js автоматически создаст sitemap.xml из этого файла

export default async function sitemap() {
    const baseUrl = 'https://delote-beauty.fr'; // ЗАМЕНИ на свой домен

    // Статические страницы
    const staticPages = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/services`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/works`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
    ];


    return [...staticPages];
}