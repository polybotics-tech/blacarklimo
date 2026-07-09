import FleetScreen from "@/src/screens/FleetScreen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Luxury Fleet | Blacarklimo",
  description:
    "Explore our premium fleet of luxury sedans, executive SUVs, and chauffeur-driven vehicles designed for airport transfers, corporate travel, special events, and private transportation throughout Northern California.",
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
};

export default function Fleet() {
  return <FleetScreen />;
}
