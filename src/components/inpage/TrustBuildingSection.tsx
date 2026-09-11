import { DefaultSectionHeader } from "../reuseable/SectionHeaderComponent";
import { Car, Check, Clock, Headphones, Star } from "lucide-react";
import Image from "next/image";

const TrustBuildingSection = ({ screen }: TrustBuildingSectionProps) => {
  const isAbout: boolean = screen === "about";

  const qualities = [
    "Professional Chauffeurs",
    "On-Time Guarantee",
    "24/7 Customer Support",
    "Fully Insured Fleet",
    "Privacy, Discretion, and Confidentiality",
    "Easy Online Booking",
  ];
  const statistics = [
    {
      value: "99.8%",
      desc: "On-Time Arrival",
      icon: <Clock size={10} strokeWidth={2.3} className="text-pri-gold" />,
    },
    { isBar: true },
    {
      value: "1,000+",
      desc: "Rides Completed",
      icon: <Car size={10} strokeWidth={2.3} className="text-pri-gold" />,
    },
    { isBar: true },
    {
      value: "5.0",
      desc: "Overall Rating",
      icon: <Star size={10} strokeWidth={2.3} className="text-pri-gold" />,
    },
    { isBar: true },
    {
      value: "24/7",
      desc: "Support Team",
      icon: (
        <Headphones size={10} strokeWidth={2.3} className="text-pri-gold" />
      ),
    },
  ];

  return (
    <section
      about="Why Choose Us"
      className="py-6 md:py-8 flex flex-col lg:flex-row items-start justify-between gap-6"
    >
      <div className="w-full lg:w-1/2 flex flex-col md:flex-row md:items-start md:justify-between lg:flex-col gap-5">
        <div className="w-full md:w-1/2 lg:w-full">
          <DefaultSectionHeader
            align="left"
            title="Why Choose Us"
            heading={
              <>
                <span className="text-pri-gold">Excellence</span> In Every Mile
                <br />
                Service Beyond Expectations
              </>
            }
            subHeading="Our reputation is built on provivding dependable chaufeur services, luxury vehicles, and personalized attention for every client. We focus on delivering comfort, safety, and excellence from reservation to arrival."
          />
        </div>

        <ul className="space-y-2">
          {qualities?.map((quality, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full centralize bg-pri-gold">
                <Check size={12} strokeWidth={1.8} className="text-pri-bg" />
              </div>

              <p className="text-pri-text font-medium">{quality}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col gap-4 rounded-2xl py-2">
        <div className="w-full h-82 md:max-w-96 lg:max-w-none md:mx-auto lg:mx-0 flex flex-col gap-4">
          <div className="w-full flex flex-1 items-center gap-4">
            <div className="h-full flex flex-1 bg-sec-bg rounded-lg overflow-hidden relative">
              <Image
                src="/assets/images/img13.jpg"
                alt="why-choose-us-image"
                fill
                sizes="200px"
                className="object-cover"
              />
            </div>
            <div className="h-full flex flex-1 bg-sec-bg rounded-lg overflow-hidden relative">
              <Image
                src="/assets/images/img14.jpg"
                alt="why-choose-us-image"
                fill
                sizes="200px"
                className="object-cover"
              />
            </div>
          </div>
          <div className="w-full flex flex-1 items-center gap-4">
            <div className="h-full flex flex-1 bg-sec-bg rounded-lg overflow-hidden relative">
              <Image
                src="/assets/images/img22.jpg"
                alt="why-choose-us-image"
                fill
                sizes="200px"
                className="object-cover"
              />
            </div>
            <div className="h-full flex flex-1 bg-sec-bg rounded-lg overflow-hidden relative">
              <Image
                src="/assets/images/img24.jpg"
                alt="why-choose-us-image"
                fill
                sizes="200px"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {!isAbout && (
          <ul className="w-full max-w-96 mx-auto py-2 px-3 rounded-lg flex items-center gap-4 card-glow">
            {statistics?.map((stat, idx) => {
              return stat?.isBar ? (
                <div
                  key={`${idx}-bar`}
                  className="w-0.5 h-3 rounded-full bg-sec-text"
                ></div>
              ) : (
                <li key={idx} className="centralize flex-col gap-[-2px]">
                  <div className="w-full flex flex-row items-center gap-1">
                    <div className="w-4 h-4 rounded-[3px] bg-shadow-glow centralize">
                      {stat.icon}
                    </div>
                    <h4 className="text-sec-gold text-left">{stat.value}</h4>
                  </div>
                  <p className="text-[8px]">{stat.desc}</p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
};

export default TrustBuildingSection;

interface TrustBuildingSectionProps {
  screen: "home" | "about";
}
