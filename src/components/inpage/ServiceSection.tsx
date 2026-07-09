import { DefaultSectionHeader } from "@/src/components/reuseable/SectionHeaderComponent";
import { LongServiceCard, ShortServiceCard } from "../reuseable/CardComponent";

const ServiceSection = ({ screen }: ServiceSectionProps) => {
  const isAbout: boolean = screen === "about";

  return (
    <section about="Services We Offer" className="py-6 md:py-8 space-y-6">
      <DefaultSectionHeader
        title="Services We Offer"
        hideTitle={isAbout}
        heading={
          <>
            Premium <span className="text-pri-gold">Chauffeur Services</span>{" "}
            <br />
            Made For Every Occasion
          </>
        }
        subHeading="Whether you need airport transfers, corporate transportation, or a private hourly service, every service is carefully tailored to ensure punctuality, privacy, comfort, and an elevated travel experience"
      />

      <div className="flex flex-wrap gap-4">
        <LongServiceCard
          title="Corporate Transportation"
          desc="Professional executive transportation designed for business meetings, corporate events, and daily executive travels to give you the boss vibe."
          points={[
            "Executive Business Travel",
            "Corporate Event Transportation",
            "VIP Client Transfers",
          ]}
          photo_uri="/assets/images/img7.jpg"
        />
        <ShortServiceCard
          title="Airport Transfers"
          desc="Reliable and stress-free airport pickup & dropoff with professional chauffeurs to ensure to enjoy the premium experience."
          link={{ text: "Book Now" }}
        />

        <ShortServiceCard
          title="Special Events"
          desc="Dedicated luxury transportation service for concerts, weddings, parties, sporting events, and unforgettable nights out."
        />
        <LongServiceCard
          title="Hourly Chauffeur Services"
          desc="Flexible chauffeur service available by the hour for clients who require convenience, privacy, and multiple stops throughout their day."
          points={[
            "Leisure & Shopping Trips",
            "Long City Tours",
            "Multi-Stop Travel",
          ]}
          photo_uri="/assets/images/img21.jpg"
          isInverted={true}
        />
      </div>
    </section>
  );
};

export default ServiceSection;

interface ServiceSectionProps {
  screen: "home" | "about";
}
