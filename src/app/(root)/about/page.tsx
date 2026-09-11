import AboutScreen from "@/src/screens/AboutScreen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Our Luxury Chauffeur Services CA | Blacark Limo",

  description:
    "Learn about trusted luxury chauffeur & black car services offering reliability and professional customer care across Northern California with Blacark Limo.",

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

  openGraph: {
    type: "website",
    url: "https://www.blacarklimo.com/about",
    title: "About Our Luxury Chauffeur Services CA | Blacark Limo",
    description:
      "Learn about trusted luxury chauffeur & black car services offering reliability and professional customer care across Northern California with Blacark Limo.",
  },
};

export default function About() {
  return <AboutScreen />;
}
