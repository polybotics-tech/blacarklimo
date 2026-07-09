import FleetSection from "@/src/components/inpage/FleetSection";
import GuideSection from "@/src/components/inpage/GuideSection";

export default function FleetScreen() {
  return (
    <main className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 lg:mx-auto">
      <FleetSection screen="fleet" />
      <GuideSection />
    </main>
  );
}
