import AboutScreen from "@/src/screens/AboutScreen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Blacarklimo",
  description:
    "Learn about Blacarklimo, a trusted provider of luxury chauffeur and black car services across Northern California. Discover our commitment to professionalism, reliability, comfort, and exceptional customer service.",
  keywords: [
    "blacarklimo",
    "about blacarklimo",
    "luxury chauffeur service",
    "black car service",
    "Northern California",
    "executive transportation",
    "professional chauffeurs",
    "airport transportation",
    "premium transportation service",
    "corporate travel",
    "luxury travel solutions",
  ],
  alternates: {
    canonical: "/about",
  },
};

export default function About() {
  return <AboutScreen />;
}
