import { generateAreaServed } from "@/src/utils/generator";

export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LimousineService",

    name: "Blacarklimo",

    alternateName: "Ark Limo",

    url: "https://www.blacarklimo.com",

    logo: "https://www.blacarklimo.com/assets/images/logo.png",

    image: "https://www.blacarklimo.com/assets/images/img13.jpg",

    description:
      "Premium chauffeur and limousine transportation serving Northern California with airport transfers, executive travel, hourly chauffeur services, and luxury transportation.",

    telephone: "+1-510-415-8404",
    email: "blacarklimo@gmail.com",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-510-415-8404",
      contactType: "customer service",
      areaServed: "US",
      availableLanguage: "English",
    },

    areaServed: generateAreaServed(),

    address: {
      "@type": "PostalAddress",
      addressRegion: "CA",
      addressCountry: "US",
    },

    priceRange: "$$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",

        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],

        opens: "00:00",
        closes: "23:59",
      },
    ],

    // sameAs: [
    //   "https://facebook.com/...",
    //   "https://instagram.com/...",
    //   "https://linkedin.com/...",
    // ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
