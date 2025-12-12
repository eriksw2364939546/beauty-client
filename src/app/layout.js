import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Script from "next/script";

export const metadata = {
  metadataBase: new URL('https://delote-beauty.vercel.app'),
  title: {
    default: "Delote-Beauty Marseille | Salon de Beauté Premium",
    template: "%s | Delote-Beauty Marseille"
  },
  description: "Salon de beauté premium à Marseille. Soins du visage, manucure, pédicure, maquillage professionnel. Prenez rendez-vous dès maintenant !",
  keywords: [
    "salon de beauté Marseille",
    "soins du visage Marseille",
    "manucure Marseille",
    "pédicure Marseille",
    "institut de beauté Marseille",
    "esthéticienne Marseille",
    "maquillage professionnel Marseille",
    "nettoyage du visage Marseille",
    "épilation Marseille",
    "salon beauté Vieux-Port"
  ],
  authors: [{ name: "Delote-Beauty" }],
  creator: "Delote-Beauty",
  publisher: "Delote-Beauty",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://delote-beauty.vercel.app",
    siteName: "Delote-Beauty Marseille",
    title: "Delote-Beauty Marseille | Salon de Beauté Premium",
    description: "Découvrez notre salon de beauté à Marseille. Équipe expérimentée, produits premium, ambiance relaxante.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Salon Delote-Beauty Marseille",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Delote-Beauty Marseille | Salon de Beauté Premium",
    description: "Salon de beauté premium à Marseille",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  // JSON-LD для локального бизнеса
  const businessJsonLd = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "name": "Delote-Beauty",
    "image": "https://delote-beauty.vercel.app/logo.png",
    "@id": "https://delote-beauty.vercel.app",
    "url": "https://delote-beauty.vercel.app",
    "telephone": "+33 4 91 33 21 00",
    "priceRange": "€€",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "42 Rue Paradis",
      "addressLocality": "Marseille",
      "postalCode": "13001",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 43.2965,
      "longitude": 5.3698
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "19:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "10:00",
        "closes": "18:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/delotebeautymarseille",
      "https://www.instagram.com/delote_beauty_marseille"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127"
    }
  };

  // JSON-LD для организации
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Delote-Beauty",
    "url": "https://delote-beauty.vercel.app",
    "logo": "https://delote-beauty.vercel.app/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+33-4-91-33-21-00",
      "contactType": "customer service",
      "areaServed": "FR",
      "availableLanguage": ["French", "English"]
    },
    "sameAs": [
      "https://www.facebook.com/delotebeautymarseille",
      "https://www.instagram.com/delote_beauty_marseille"
    ]
  };

  return (
    <html lang="fr">
      <head>
        {/* Preconnect для ускорения загрузки шрифтов */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Шрифты */}
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Manufacturing+Consent&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=swap"
          rel="stylesheet"
        />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://delote-beauty.vercel.app" />

        {/* JSON-LD структурированные данные - Бизнес */}
        <Script
          id="json-ld-business"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
          strategy="beforeInteractive"
        />

        {/* JSON-LD структурированные данные - Организация */}
        <Script
          id="json-ld-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}