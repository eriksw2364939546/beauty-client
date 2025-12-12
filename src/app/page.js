// app/page.js
import HomePage from "@/modules/HomePage/HomePage";
import ServicesService from "@/services/services.service";
import WorksService from "@/services/works.service";

export const metadata = {
  title: "Salon de Beauté à Marseille | Delote-Beauty - Soins Premium",
  description: "✨ Salon de beauté Delote-Beauty à Marseille. Soins du visage, manucure, pédicure, maquillage professionnel. Équipe expérimentée, produits premium. ☎️ Prenez RDV maintenant !",
  alternates: {
    canonical: "https://delote-beauty.fr",
  },
  openGraph: {
    title: "Delote-Beauty Marseille | Votre Salon de Beauté Premium",
    description: "Découvrez l'excellence des soins de beauté à Marseille. Experts certifiés, produits haut de gamme.",
    url: "https://delote-beauty.fr",
    images: [
      {
        url: "/og-image-home.jpg",
        width: 1200,
        height: 630,
        alt: "Intérieur du salon Delote-Beauty à Marseille",
      }
    ],
  },
};

export default async function Home() {
  try {
    console.log('🚀 Starting data fetch...');

    const [servicesResponse, worksData] = await Promise.all([
      ServicesService.getAll({ limit: 50 }),
      WorksService.getLatest(6)
    ]);

    console.log('✅ Services response:', servicesResponse);
    console.log('✅ Works data:', worksData);

    const services = servicesResponse.data || [];
    const works = worksData || [];

    console.log('📦 Passing to HomePage - services:', services.length, 'works:', works.length);

    return <HomePage services={services} works={works} />;
  } catch (error) {
    console.error('❌ Error loading data:', error);
    return <HomePage services={[]} works={[]} />;
  }
}

// Генерация JSON-LD для услуг (дополнительно)
export function generateServiceJsonLd(services) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": services.map((service, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Service",
        "name": service.title,
        "description": service.description,
        "provider": {
          "@type": "BeautySalon",
          "name": "Delote-Beauty"
        }
      }
    }))
  };
}