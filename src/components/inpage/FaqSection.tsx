import { DefaultSectionHeader } from "../reuseable/SectionHeaderComponent";
import { FaqCard } from "../reuseable/CardComponent";
import { ArrowUpRight, Phone } from "lucide-react";
import Link from "next/link";
import constants from "@/src/libs/constants";
import { FaqsType } from "@/src/libs/types";

const HomeFaqSection = () => {
  const faqs: FaqsType[] = [
    {
      question: "Do you provide airport transportation?",
      answer:
        "Yes. We offer luxury airport transfers to and from major Northern California airports, including SFO, OAK, SJC, and SMF. Our chauffeurs provide professional pickup and drpoff services for both domestic and international travelers.",
      foundHelpfulBy: 154,
    },
    {
      question: "What happens if my flight is delayed?",
      answer:
        "No need to worry. You can easily contact our 24/7 support team via Whatsapp or Call. This helps ensure your chauffeur is ready when you arrive wihtout requiring a new reservation.",
      foundHelpfulBy: 27,
    },
    {
      question: "How far in advance should I book my ride?",
      answer:
        "We recommend booking as early as possible to secure your preferred vehicle and schedule, especially during holidays, major events, wedding seasons, and peak travel periods. However, same-day reservations may be available depending on vehicle availability.",
      foundHelpfulBy: 9,
    },
    {
      question: "Are your chauffeurs licensed and insured?",
      answer:
        "Absolutely. All chauffeurs are professionally trained, licensed, insured, and carefully vetted to maintain the highest standards of safety, professionalism, and customer service.",
      foundHelpfulBy: 82,
    },
    {
      question: "Can I make multiple stops during my trips?",
      answer:
        "Yes. Multi-stop transportation can be arranged for business meetings, private eventsm city tours, shopping trips, or flexible hourly bookings. Simply select the 'Hourly' option on the booking page, and add your stops as desired so we can coordinate your schedule accordingly.",
      foundHelpfulBy: 697,
    },
    {
      question: "What payment methods are acceptable?",
      answer:
        "We accept major credit cards, PayPal, Venmo, and other secure payment methods supported through our online reservation system. Payment details are processed securely to ensure a safe and convenient booking experience.",
      foundHelpfulBy: 1083,
    },
    {
      question: "Why does PayPal receipt show Ark Limo?",
      answer:
        "Blacarklimo is operated by Ark Limo. As a result, payments processed through PayPal and certain financial institutions may display 'Ark Limo' as the merchant name on receipts, statements, or transaction records.",
      foundHelpfulBy: 543,
    },
  ];

  return (
    <section
      about="FAQs"
      className="py-6 md:py-8 flex flex-col md:flex-row items-start justify-between gap-6"
    >
      <div className="w-full md:w-1/2 space-y-4">
        <DefaultSectionHeader
          align="left"
          title="FAQs"
          heading={
            <>
              Frequently Asked <span className="text-pri-gold">Questions</span>
              <br />
              Everything You Need To Know
            </>
          }
          subHeading="We believe luxury transportation should be simple, transparent, and stress-free. Browse answers to some the most common questions about reservations, airpot transfers, payments, and chauffeur services across Northern California"
        />

        <div className="w-full md:w-5/6 p-4 rounded-2xl bg-sec-bg space-y-4">
          <div className="space-y-0.5">
            <h4 className="text-pri-text text-[14px] font-medium">
              Need More Help?
            </h4>
            <p className="text-sec-text text-[10px]">
              Do you still have unanswered questions? Feel free to ask our 24/7
              support team. We&apos;ve got you covered.
            </p>
          </div>

          <div className="w-full centralize gap-4">
            <Link
              href={`tel:${constants.companyPhone}`}
              className="py-2 px-6 centralize gap-2 flex-1 rounded-full border border-sec-text hover:border-pri-text group"
            >
              <p className="text-sec-text text-[10px] group-hover:text-pri-text">
                Call Now
              </p>
              <Phone
                size={14}
                strokeWidth={1.3}
                className="text-sec-text group-hover:text-pri-text"
              />
            </Link>

            <Link
              href={"/about/#contact-us"}
              className="py-2 px-6 centralize gap-2 flex-1 rounded-full bg-pri-text hover:bg-sec-text"
            >
              <p className="text-pri-bg text-[10px]">Send Message</p>
              <ArrowUpRight
                size={14}
                strokeWidth={1.3}
                className="text-pri-bg"
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 bg-sec-bg rounded-2xl py-2 px-4">
        {faqs?.map((faq, idx) => (
          <FaqCard key={idx} {...faq} />
        ))}
      </div>
    </section>
  );
};

export { HomeFaqSection };
