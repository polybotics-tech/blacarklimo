import HeroSection from "@/src/components/inpage/HeroSection";
import FleetSection from "@/src/components/inpage/FleetSection";
import ServiceSection from "@/src/components/inpage/ServiceSection";
import TrustBuildingSection from "@/src/components/inpage/TrustBuildingSection";
import GuideSection from "@/src/components/inpage/GuideSection";
import TestimonialSection from "@/src/components/inpage/TestimonialSection";
import { HomeFaqSection } from "@/src/components/inpage/FaqSection";
import LocationSection from "@/src/components/inpage/LocationSection";

export default function HomeScreen() {
  return (
    <main className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 lg:mx-auto">
      <HeroSection />
      <FleetSection screen="home" />
      <TrustBuildingSection screen="home" />
      <ServiceSection screen="home" />
      <TestimonialSection />
      <LocationSection />
      <GuideSection />
      <HomeFaqSection />
    </main>
  );
}
