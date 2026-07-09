import TrustBuildingSection from "@/src/components/inpage/TrustBuildingSection";
import ServiceSection from "@/src/components/inpage/ServiceSection";
import { ContactFormSection } from "@/src/components/inpage/ContactFormSection";

export default function AboutScreen() {
  return (
    <main className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 lg:mx-auto">
      <ServiceSection screen="about" />
      <TrustBuildingSection screen="about" />
      <ContactFormSection />
    </main>
  );
}
