import { BookingNavigation } from "@/src/components/reuseable/Navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book A Chauffeur | Blacarklimo",
  description:
    "Reserve premium chauffeur services with Blacarklimo. Book luxury airport transfers, executive transportation, hourly chauffeur services, and private rides throughout Northern California with secure online reservations.",
  keywords: [
    "book chauffeur service",
    "airport transfer booking",
    "luxury transportation booking",
    "executive car service",
    "black car reservation",
    "chauffeur booking Northern California",
    "airport transportation",
    "private driver service",
    "luxury ride booking",
    "hourly chauffeur service",
  ],
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <BookingNavigation>{children}</BookingNavigation>;
};

export default Layout;
