import FleetScreen from "@/src/screens/FleetScreen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Our Premium Luxury Chauffeur Fleet CA | Blacark Limo",

  description:
    "Explore luxury sedans, executive SUVs, chauffeur-driven vehicles for airport transfers, private & corporate travel across Northern California with Blacark Limo.",

  keywords: [
    "luxury fleet",
    "chauffeur vehicles",
    "executive sedan",
    "Cadillac Escalade chauffeur",
    "Mercedes-Benz S-Class",
    "luxury SUV rental",
    "black car fleet",
    "executive transportation",
    "chauffeur vehicles Northern California",
    "luxury transportation fleet",
  ],

  alternates: {
    canonical: "/fleet",
  },

  openGraph: {
    type: "website",
    url: "https://www.blacarklimo.com/fleet",
    title: "Explore Our Premium Luxury Chauffeur Fleet CA | Blacark Limo",
    description:
      "Explore luxury sedans, executive SUVs, chauffeur-driven vehicles for airport transfers, private & corporate travel across Northern California with Blacark Limo.",
    images: [
      {
        url: "https://www.blacarklimo.com/assets/images/img13.jpg",
        width: 736,
        height: 736,
        alt: "Blacark Limo Premium Chauffeur Fleet",
      },
    ],
  },
};

export default function Fleet() {
  return <FleetScreen />;
}
