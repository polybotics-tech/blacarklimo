import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luxury Airport Chauffeur Service in San Jose, CA | Blacark Limo",

  description:
    "Book a luxury airport chauffeur service in San Jose, CA with Blacark Limo. Private rides to SJC, SFO & OAK, corporate airport transfers, and limo service. Get a quote.",

  alternates: {
    canonical:
      "https://www.blacarklimo.com/airport-chauffeur-service-san-jose-ca",
  },

  openGraph: {
    title: "Luxury Airport Chauffeur Service in San Jose, CA | Blacark Limo",

    description:
      "Private airport chauffeur service in San Jose, CA with rides to SJC, SFO, and OAK for business travelers, families, hotel guests, and groups.",

    url: "https://www.blacarklimo.com/airport-chauffeur-service-san-jose-ca",

    siteName: "Blacark Limo",

    type: "website",

    images: [
      {
        url: "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=1200&q=85",
        width: 1200,
        height: 630,
        alt: "Luxury Airport Chauffeur Service in San Jose, CA - Blacark Limo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Luxury Airport Chauffeur Service in San Jose, CA | Blacark Limo",

    description:
      "Private airport chauffeur service in San Jose, CA with rides to SJC, SFO, and OAK for business travelers, families, hotel guests, and groups.",

    images: [
      "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=1200&q=85",
    ],
  },

  robots: {
    index: true,
    follow: true,
  },
};


const faqs: {
  question: string;
  answer: string;
  subQuestions?: {
    question: string;
    answer: string;
    nested?: {
      question: string;
      answer: string;
    };
  }[];
}[] = [
  {
    question: "How much does airport chauffeur service in San Jose, CA cost?",
    answer:
      "It depends on the airport, distance, vehicle, and pickup time. Contact Blacark Limo for a quote.",
    subQuestions: [
      {
        question:
          "What affects the cost of a luxury airport transfer in San Jose, CA?",
        answer: "Distance, vehicle type, travel date, and extra stops.",
        nested: {
          question: "Does SFO or OAK cost more than SJC?",
          answer: "Longer routes usually cost more. Ask us for your exact route.",
        },
      },
      {
        question: "Is a chauffeur worth it compared with parking or rideshare?",
        answer: "Often yes for early flights, groups, and business trips.",
      },
    ],
  },
  {
    question: "How early should I book a limo airport transfer in San Jose, CA?",
    answer:
      "Book as early as you can, especially for holidays and early flights.",
    subQuestions: [
      {
        question: "How early should I leave for SJC?",
        answer: "Allow enough time for check-in and security.",
        nested: {
          question: "Should I leave earlier for SFO or OAK?",
          answer:
            "Yes. They are farther away, so allow extra time for traffic.",
        },
      },
      {
        question: "Can I book on short notice?",
        answer:
          "Contact us as soon as you know your plans, and we will check availability.",
      },
    ],
  },
  {
    question:
      "What is the difference between a luxury airport transfer and a rideshare?",
    answer:
      "A luxury airport transfer is a private ride booked in advance with an assigned driver.",
    subQuestions: [
      {
        question: "Can I choose my vehicle?",
        answer:
          "Yes. Tell us your passengers and bags, and we will suggest one.",
        nested: {
          question: "What if my flight is delayed?",
          answer:
            "Share your flight number when you book. If it changes, contact us, and we will adjust.",
        },
      },
    ],
  },
  {
    question: "Where will my chauffeur meet me at SJC?",
    answer:
      "It depends on your airline and terminal. We confirm the exact pickup point before your trip.",
    subQuestions: [
      {
        question: "Will my chauffeur wait after I land?",
        answer:
          "Share your flight details, and we plan the pickup around your arrival.",
        nested: {
          question: "What if I have checked bags?",
          answer:
            "Tell us when you book so we can allow time for baggage claim.",
        },
      },
    ],
  },
  {
    question:
      "Can a chauffeur service to airport in San Jose, CA take me to SFO or OAK?",
    answer:
      "Yes. We offer transfers between San Jose and SFO and OAK, as well as SJC.",
    subQuestions: [
      {
        question: "Can you pick me up from my hotel or office?",
        answer:
          "Yes. We offer pickups from homes, hotels, offices, and other agreed locations.",
        nested: {
          question: "Can I book rides for my team?",
          answer:
            "Yes. Send us the schedule, and we will arrange corporate transfers with luxury airport transport in San Jose, CA.",
        },
      },
    ],
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: [
        faq.answer,
        ...(faq.subQuestions || []).flatMap((sub) => [
          `${sub.question}: ${sub.answer}`,
          ...(sub.nested
            ? [`${sub.nested.question}: ${sub.nested.answer}`]
            : []),
        ]),
      ].join(" "),
    },
  })),
};

export default function LuxuryAirportChauffeurServiceSanJosePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <main className="san-lorenzo-page">
        {/* HERO */}
        <section className="hero">
          <div className="hero-overlay" />

          <div className="container hero-content">
            <div className="hero-copy">
              <span className="eyebrow">SAN JOSE AIRPORT CHAUFFEUR</span>

              <h1>
                Luxury Airport Chauffeur Service in San Jose, CA – Private
                Rides to SJC, SFO &amp; OAK
              </h1>

              <p className="hero-intro">
                Blacark Limo provides airport chauffeur service in San Jose,
                CA, for travelers who want a calm, on-time start or end to
                their trip. Our office is in San Lorenzo, CA, and we serve San
                Jose and the wider Northern California region. Our services
                include airport transfers, corporate travel, special events,
                and private transportation.
              </p>

              <div className="hero-buttons">
                <a
                  href="mailto:blacarklimo@gmail.com"
                  className="btn btn-primary"
                >
                  Get Your Free Quote
                </a>

                <a href="#book" className="btn btn-outline">
                  Book Your Chauffeur
                </a>
              </div>

              <div className="hero-trust">
                <span>✓ Private Transportation</span>
                <span>✓ Professional Chauffeurs</span>
                <span>✓ Door-to-Door Service</span>
              </div>
            </div>
          </div>
        </section>

        {/* INTRO */}
        <section className="section">
          <div className="container two-column">
            <div>
              <span className="section-label">SAN JOSE AIRPORT RIDES</span>

              <h2>Luxury Airport Chauffeur Service in San Jose, CA</h2>

              <p>
                If you are flying from or arriving at San José Mineta
                International Airport (SJC), you can skip the parking search
                and the wait for a ride. A professional driver meets you at the
                agreed time, helps with your bags, and takes you straight to
                your destination. Our chauffeur service to airport in San Jose,
                CA is built around one simple idea: your ride should be the
                easy part of your trip.
              </p>

              <p>
                You can book for yourself, your family, a guest, or your whole
                team. Reserve in advance, share your travel details, and we
                plan the pickup around them.
              </p>

              <h3>Airport transportation at a glance</h3>

              <ul className="styled-list">
                <li>
                  <strong>Main airport:</strong> San José Mineta International
                  Airport (SJC)
                </li>
                <li>
                  <strong>Also available:</strong> Transfers to and from San
                  Francisco International Airport (SFO) and Oakland
                  International Airport (OAK)
                </li>
                <li>
                  <strong>Pickup points:</strong> Homes, hotels, offices, and
                  other agreed locations
                </li>
                <li>
                  <strong>Who we serve:</strong> Business travelers, families,
                  hotel guests, and individual travelers
                </li>
                <li>
                  <strong>Booking:</strong> Reserve ahead with Blacark Limo and
                  confirm your trip details with our team
                </li>
              </ul>

              <a
                href="mailto:blacarklimo@gmail.com"
                className="text-cta"
              >
                Get Your Free Quote →
              </a>
            </div>

            <div className="image-card">
              <img
                src="https://www.blacarklimo.com/assets/images/unnamed (5).jpg"
                alt="Luxury airport chauffeur vehicle in San Jose, CA"
              />
            </div>
          </div>
        </section>

        {/* LUXURY AIRPORT TRANSFER */}
        <section className="section section-light">
          <div className="container">
            <div className="section-heading">
              <span className="section-label">LUXURY AIRPORT TRANSFER</span>
              <h2>Luxury Airport Transfer in San Jose, CA</h2>
              <p>
                A luxury airport transfer in San Jose, CA is a private ride
                that you book in advance. A driver is assigned to you, so you
                do not share the vehicle with strangers or make stops for other
                passengers. You travel in a clean, comfortable vehicle at your
                own pace and arrive relaxed.
              </p>
              <p>When you book with Blacark Limo, you can expect:</p>
            </div>

            <div className="feature-grid">
              {[
                "A professional driver who arrives at the time you agreed on",
                "Help with luggage at pickup and drop-off",
                "A clean, well-kept vehicle with room to sit back, work, or rest",
                "A direct ride to your terminal or destination",
                "A clear plan before the day of travel",
              ].map((item) => (
                <div className="feature-item" key={item}>
                  <span className="check">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <p className="wide-copy">
              Many people choose luxury airport transport in San Jose, CA
              because it removes the usual airport stress. You do not need to
              look for parking, pay daily lot fees, or think about where you
              left your car. For early morning departures and late-night
              arrivals, this matters even more. Our drivers plan the route
              around local traffic so you can reach the airport with time to
              spare.
            </p>

            <p className="wide-copy">
              The same care applies when you land. After a long flight, you
              want a familiar face, a comfortable seat, and a smooth ride home
              or to your hotel. Whether it is a family holiday, a work trip, or
              a quiet ride after a late flight, a luxury airport transfer in
              San Jose, CA from Blacark Limo gives you a steady and predictable
              experience from start to finish.
            </p>

            <a
              href="https://www.blacarklimo.com/booking"
              className="text-cta"
            >
              Reserve Your Luxury Transfer →
            </a>
          </div>
        </section>

        {/* AIRPORT */}
        <section className="section">
          <div className="container two-column reverse-mobile">
            <div className="image-card">
              <img
                src="https://www.blacarklimo.com/assets/images/unnamed (5).jpg"
                alt="San Jose airport transportation to SJC, SFO and OAK"
              />
            </div>

            <div>
              <span className="section-label">AIRPORT TRANSPORTATION</span>

              <h2>
                San Jose Airport Transportation to and From SJC, SFO and OAK
              </h2>

              <p>
                San José Mineta International Airport (SJC) is our main focus
                because it sits right in the city we serve. Most of our San
                Jose airport rides begin or end here. We also offer transfers
                between San Jose and the two other major Bay Area airports, San
                Francisco International (SFO) and Oakland International (OAK).
              </p>

              <p>Here is how arranging your airport ride works:</p>

              <ul className="styled-list">
                <li>
                  <strong>For departures:</strong> Choose your pickup address
                  and time. We recommend leaving enough time to check in, clear
                  security, and reach your gate calmly.
                </li>
                <li>
                  <strong>For arrivals:</strong> Share your flight details when
                  you book. We use them to plan your pickup around your arrival
                  time.
                </li>
                <li>
                  <strong>For pickup points:</strong> Tell us your airline and
                  terminal. Our team will confirm the exact pickup or drop-off
                  arrangements with you before your trip.
                </li>
              </ul>

              <a href="/fleet" className="text-cta">
                View Our Fleet →
              </a>
            </div>
          </div>

          <div className="container service-detail">
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Airport</th>
                    <th>Best for</th>
                    <th>Planning tip</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>San José Mineta International (SJC)</td>
                    <td>
                      Everyday travel, business trips, and short, simple
                      transfers
                    </td>
                    <td>Share your airline and terminal when you book</td>
                  </tr>

                  <tr>
                    <td>San Francisco International (SFO)</td>
                    <td>Longer flights and international travel</td>
                    <td>
                      Book early and leave extra time for Bay Area traffic
                    </td>
                  </tr>

                  <tr>
                    <td>Oakland International (OAK)</td>
                    <td>Travelers coming from or going to the East Bay</td>
                    <td>
                      Confirm your pickup time with our team in advance
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="fleet-note">
              Our chauffeur service to airport in San Jose, CA covers
              drop-offs at the terminal as well as pickups after you land. SFO
              and OAK are farther away than SJC, so longer rides need a little
              more planning. The earlier you book, the easier it is for us to
              fit your schedule.
            </p>
          </div>
        </section>

        {/* CORPORATE */}
        <section className="section dark-section">
          <div className="container">
            <div className="section-heading light">
              <span className="section-label">EXECUTIVE TRANSPORTATION</span>
              <h2>Corporate and Executive Airport Transfers in San Jose</h2>

              <p>
                Business travel runs on time. A late ride can mean a missed
                flight or a missed meeting. Blacark Limo offers corporate and
                executive airport transfers in San Jose for people who need
                reliable transportation and a professional image.
              </p>
            </div>

            <div className="corporate-layout">
              <div className="corporate-image">
                <img
                  src="https://www.blacarklimo.com/assets/images/unnamed (6).jpg"
                  alt="Corporate and executive airport transfer in San Jose"
                />
              </div>

              <div className="corporate-content">
                <p>Our drivers can handle:</p>

                <ul className="styled-list light-list">
                  <li>Executive pickups and drop-offs for single travelers</li>
                  <li>Airport transfers for teams traveling to the same event or meeting</li>
                  <li>Rides for clients and guests visiting your company</li>
                  <li>Regular or repeat trips for staff who fly often</li>
                </ul>

                <p>
                  San Jose is a major business center, and many trips start or
                  end at SJC. A quiet vehicle gives you a place to make calls,
                  check email, or prepare for your meeting on the way. Many
                  business travelers choose luxury airport transport in San
                  Jose, CA because it turns travel time into useful time.
                </p>

                <p>
                  If your company books rides for staff or visitors, we can
                  work with you to plan trips. Send us the schedule, the
                  passenger names, and any special requests, and we will help
                  arrange the details.
                </p>

                <p>
                  For companies with frequent travel needs, a regular booking
                  routine saves time and keeps every trip organized.
                </p>

                <p>
                  Our corporate service also covers travel across Northern
                  California. If your trip goes beyond San Jose, such as a ride
                  between the airport and another city in the region, talk to
                  our team about the route.
                </p>

                <a
                  href="mailto:blacarklimo@gmail.com"
                  className="text-cta"
                >
                  Plan a Corporate Transfer →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* LIMO AIRPORT TRANSFER */}
        <section className="section">
          <div className="container two-column">
            <div>
              <span className="section-label">LIMO AIRPORT TRANSFER</span>

              <h2>Limo Airport Transfer in San Jose, CA</h2>

              <p>
                A limo airport transfer in San Jose, CA is a good fit when you
                want extra room, a more refined ride, or a vehicle that suits a
                group. It works well for families, friends traveling together,
                wedding parties, and business teams heading to the same flight.
              </p>

              <p>
                The right vehicle depends on three things: how many people are
                traveling, how much luggage you have, and what kind of ride you
                want. When you book, tell us:
              </p>

              <ul className="styled-list">
                <li>The number of passengers</li>
                <li>
                  The number of suitcases, carry-on bags, and any large items
                  such as golf bags or sports gear
                </li>
                <li>
                  Whether you need space for child seats or other special needs
                </li>
              </ul>

              <p>
                With that information, our team can suggest a vehicle that
                fits everyone comfortably. This is better than guessing and
                finding out at the curb that the bags do not fit.
              </p>

              <h3>A simple way to think about it</h3>

              <ul className="styled-list">
                <li>
                  <strong>One or two travelers:</strong> A private sedan or
                  similar vehicle is often enough.
                </li>
                <li>
                  <strong>A family or small group:</strong> An SUV or a larger
                  vehicle gives more seats and luggage room.
                </li>
                <li>
                  <strong>A bigger group or a special event:</strong> Ask us
                  about larger limo options for the best fit.
                </li>
              </ul>

              <p>
                You can see the vehicles we offer on our fleet page. If you are
                not sure which one to choose, our team will help. A limo
                airport transfer in San Jose, CA is private from door to door,
                so you and your group stay together and arrive together.
              </p>

              <a
                href="mailto:blacarklimo@gmail.com"
                className="text-cta"
              >
                Contact Blacark Limo →
              </a>
            </div>

            <div className="image-card tall">
              <img
                src="https://www.blacarklimo.com/assets/images/unnamed (7).jpg"
                alt="Limo airport transfer in San Jose, CA"
              />
            </div>
          </div>
        </section>

        {/* PRIVATE AIRPORT CHAUFFEUR */}
        <section className="section section-light">
          <div className="container two-column">
            <div className="image-card">
              <img
                src="https://www.blacarklimo.com/assets/images/unnamed (8).jpg"
                alt="Private airport chauffeur service in San Jose, CA"
              />
            </div>

            <div>
              <span className="section-label">PRIVATE AIRPORT CHAUFFEUR</span>

              <h2>Private Airport Chauffeur Service in San Jose, CA</h2>

              <p>
                Our airport chauffeur service is built around scheduled
                pickups. You pick the time and place, and your chauffeur is
                there. This works for homes, hotels, offices, and other
                locations you agree on with our team.
              </p>

              <h3>Who uses our private airport rides</h3>

              <ul className="styled-list">
                <li>
                  <strong>Individual travelers</strong> who want a quiet,
                  comfortable ride without the hassle of parking
                </li>
                <li>
                  <strong>Families</strong> who need space for kids, strollers,
                  and extra bags
                </li>
                <li>
                  <strong>Hotel guests</strong> who want a clean pickup from the
                  lobby and a direct ride to the airport
                </li>
                <li>
                  <strong>Visitors</strong> arriving in San Jose who want
                  someone waiting for them after landing
                </li>
              </ul>

              <p>
                A private chauffeur service to airport in San Jose, CA also
                helps when your schedule is tight. If you have an early flight,
                you do not need to wake up and plan how to get there. If you
                land late, you do not need to wait in a pickup line. Your ride
                is already arranged.
              </p>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE */}
        <section className="section">
          <div className="container">
            <div className="section-heading">
              <span className="section-label">WHY BLACARK LIMO</span>
              <h2>Why Choose Blacark Limo for Airport Transportation?</h2>
              <p>
                There are many ways to get to the airport. Here is why
                travelers choose us:
              </p>
            </div>

            <div className="why-grid">
              {[
                {
                  title: "A local base",
                  text: "Our office is in San Lorenzo, CA, and we serve San Jose and Northern California. We know the area and the routes that matter.",
                },
                {
                  title: "Private rides only",
                  text: "Your trip is planned for you, not shared with other passengers.",
                },
                {
                  title: "Vehicle choices",
                  text: "From solo travel to groups, you can pick a vehicle that fits your passengers and luggage.",
                },
                {
                  title: "One company for many needs",
                  text: "Airport transfers, corporate travel, special events, and private transportation all come from the same team, so you can use us for more than one kind of trip.",
                },
                {
                  title: "Clear communication",
                  text: "We confirm your pickup details before the day of travel, so you know what to expect.",
                },
                {
                  title: "Booking support",
                  text: "Our team helps you choose the right vehicle, set the time, and plan the pickup.",
                },
              ].map((item, index) => (
                <div className="why-card" key={item.title}>
                  <span className="number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p>
                    <strong>{item.title}:</strong> {item.text}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 28 }}>
              <p className="wide-copy">
                We believe good service is made of small things done well:
                arriving on time, treating passengers with respect, keeping
                vehicles clean, and answering questions clearly. These are
                simple promises, and they are the ones that matter most when
                you have a flight to catch.
              </p>

              <p className="wide-copy">
                When you need an airport chauffeur service in San Jose, CA, you
                want someone you can count on. That is what we aim to be,
                whether it is your first ride with us or your fiftieth.
              </p>

              <a
                href="mailto:blacarklimo@gmail.com"
                className="text-cta"
              >
                Get a Quote →
              </a>
            </div>
          </div>
        </section>

        {/* HOW TO BOOK */}
        <section className="section section-light">
          <div className="container">
            <div className="section-heading center">
              <span className="section-label">SIMPLE BOOKING</span>
              <h2>How to Book Your Ride</h2>
            </div>

            <div className="steps">
              <div className="step">
                <span className="step-number">01</span>
                <h3>Send Trip Details</h3>
                <p>
                  Send us your travel date, pickup time, pickup address, and
                  the airport you are using.
                </p>
              </div>

              <div className="step">
                <span className="step-number">02</span>
                <h3>Share Flight Info</h3>
                <p>
                  Share your flight number, the number of passengers, and the
                  number of bags.
                </p>
              </div>

              <div className="step">
                <span className="step-number">03</span>
                <h3>Review &amp; Confirm</h3>
                <p>Review and confirm the details with our team.</p>
              </div>

              <div className="step">
                <span className="step-number">04</span>
                <h3>Enjoy the Ride</h3>
                <p>
                  Meet your chauffeur at the agreed time and place, and enjoy
                  the ride.
                </p>
              </div>
            </div>

            <div className="booking-note">
              <p>
                If your plans change, contact our team as early as you can. The
                sooner we know, the easier it is to adjust.
              </p>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="final-cta" id="book">
          <div className="final-cta-image" />

          <div className="container final-cta-content">
            <span className="section-label light-label">READY TO RIDE?</span>

            <h2>Book Your San Jose Airport Ride With Blacark Limo</h2>

            <p>
              Your trip should start and end on a good note. Reserve your
              private ride with Blacark Limo and let a professional chauffeur
              take care of the drive. Tell us where you are going, when you
              need to be there, and who is traveling with you. We will take it
              from there.
            </p>

            <p className="strong">
              Book your airport ride today. Visit our booking page or contact
              the Blacark Limo team to get started.
            </p>

            <div className="hero-buttons">
              <a
                href="https://www.blacarklimo.com/booking"
                className="btn btn-primary"
              >
                Book Your Airport Ride
              </a>

              <a href="/fleet" className="btn btn-outline">
                View Our Fleet
              </a>
            </div>

          </div>
        </section>

        {/* FAQ */}
        <section className="section faq-section">
          <div className="container faq-container">
            <div className="section-heading">
              <span className="section-label">FAQ</span>
              <h2>Frequently Asked Questions (FAQs)</h2>
              <p>
                Answers to common questions about our San Jose airport
                chauffeur service, SJC, SFO and OAK transfers, vehicles,
                booking, and pricing.
              </p>
            </div>

            <div className="faq-list">
              {faqs.map((faq, index) => (
                <details className="faq-item" key={faq.question}>
                  <summary>
                    <span>
                      {index + 1}. {faq.question}
                    </span>
                    <span className="faq-plus">+</span>
                  </summary>

                  <div className="faq-answer">
                    <p>{faq.answer}</p>

                    {faq.subQuestions?.map((sub) => (
                      <ul key={sub.question}>
                        <li>
                          <strong>{sub.question}</strong>
                          <br />
                          {sub.answer}

                          {sub.nested && (
                            <ul>
                              <li>
                                <strong>{sub.nested.question}</strong>
                                <br />
                                {sub.nested.answer}
                              </li>
                            </ul>
                          )}
                        </li>
                      </ul>
                    ))}
                  </div>
                </details>
              ))}
            </div>

            <div className="faq-cta">
              <h3>Ready for a Private Airport Ride in San Jose?</h3>
              <p>
                Request your quote and let us know your pickup location,
                airport, date, time, passengers, and luggage.
              </p>

              <a
                href="mailto:blacarklimo@gmail.com"
                className="btn btn-primary"
              >
                Request Your Quote
              </a>
            </div>
          </div>
        </section>
      </main>

      <style>{`
  .san-lorenzo-page {
    --black: #09090b;
    --dark: #151518;
    --dark-card: #18181b;
    --gold: #d4b32f;
    --gold-light: #e7c943;
    --cream: #101012;
    --white: #f7f7f7;
    --text: #f2f2f2;
    --muted: #b7b7bb;
    --border: #2b2b2f;

    color: var(--text);
    background: var(--black);
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
    line-height: 1.55;
  }

  .san-lorenzo-page * {
    box-sizing: border-box;
  }

 .san-lorenzo-page .container {
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  padding-left: 32px;
  padding-right: 32px;
}

@media (max-width: 600px) {
  .san-lorenzo-page .container {
    padding-left: 16px;
    padding-right: 16px;
  }
}

  /* HERO */
  .san-lorenzo-page .hero {
    min-height: 620px;
    position: relative;
    display: flex;
    align-items: center;
    overflow: hidden;
    background:
      linear-gradient(
        90deg,
        rgba(5, 5, 6, .94) 0%,
        rgba(5, 5, 6, .78) 48%,
        rgba(5, 5, 6, .35) 100%
      ),
      url("https://www.blacarklimo.com/assets/images/unnamed (8).jpg")
      center/cover no-repeat;
  }

  .san-lorenzo-page .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(0, 0, 0, .48),
      rgba(0, 0, 0, .1)
    );
  }

  .san-lorenzo-page .hero-content {
    position: relative;
    z-index: 2;
    padding: 90px 0;
  }

  .san-lorenzo-page .hero-copy {
    max-width: 760px;
    color: var(--white);
  }

  .san-lorenzo-page .eyebrow,
  .san-lorenzo-page .section-label {
    display: inline-block;
    color: var(--gold);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2px;
    margin-bottom: 12px;
  }

  .san-lorenzo-page .hero h1 {
    max-width: 820px;
    margin: 0 0 20px;
    color: var(--white);
    font-size: clamp(36px, 4.5vw, 58px);
    line-height: 1.08;
    letter-spacing: -1.5px;
    font-weight: 700;
  }

  .san-lorenzo-page .hero-intro {
    max-width: 650px;
    margin: 0 0 26px;
    color: #dedee1;
    font-size: 15px;
    line-height: 1.65;
  }

  .san-lorenzo-page .hero-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin: 22px 0;
  }

  .san-lorenzo-page .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 42px;
    padding: 0 22px;
    border-radius: 3px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: .1px;
    text-decoration: none;
    transition: .25s ease;
  }

  .san-lorenzo-page .btn-primary {
    color: #111;
    background: var(--gold);
    border: 1px solid var(--gold);
  }

  .san-lorenzo-page .btn-primary:hover {
    background: var(--gold-light);
    border-color: var(--gold-light);
    transform: translateY(-2px);
  }

  .san-lorenzo-page .btn-outline {
    color: var(--white);
    background: transparent;
    border: 1px solid #77777b;
  }

  .san-lorenzo-page .btn-outline:hover {
    color: #111;
    background: var(--gold);
    border-color: var(--gold);
  }

  .san-lorenzo-page .hero-trust {
    display: flex;
    flex-wrap: wrap;
    gap: 18px;
    margin-top: 28px;
    color: #d0d0d3;
    font-size: 12px;
  }

  /* SECTION BASE */
  .san-lorenzo-page .section {
    padding: 78px 0;
    background: var(--black);
    color: var(--text);
  }

  .san-lorenzo-page .section-light {
    background: #101012;
  }

  .san-lorenzo-page .section-heading {
    max-width: 820px;
    margin-bottom: 34px;
  }

  .san-lorenzo-page .section-heading.center {
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }

  .san-lorenzo-page h2 {
    margin: 0 0 18px;
    color: var(--white);
    font-size: clamp(28px, 3.3vw, 42px);
    line-height: 1.15;
    letter-spacing: -.7px;
    font-weight: 700;
  }

  .san-lorenzo-page h3 {
    margin: 0 0 13px;
    color: var(--white);
    font-size: 20px;
    line-height: 1.25;
    font-weight: 600;
  }

  .san-lorenzo-page p {
    margin: 0 0 16px;
    color: #c1c1c5;
    font-size: 14px;
    line-height: 1.65;
  }

  .san-lorenzo-page .two-column {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 55px;
    align-items: center;
  }

  /* IMAGES */
  .san-lorenzo-page .image-card {
    min-height: 420px;
    overflow: hidden;
    background: #19191c;
    border: 1px solid #2b2b2f;
    border-radius: 10px;
  }

  .san-lorenzo-page .image-card.tall {
    min-height: 540px;
  }

  .san-lorenzo-page .image-card img,
  .san-lorenzo-page .corporate-image img {
    display: block;
    width: 100%;
    height: 100%;
    min-height: inherit;
    object-fit: cover;
  }

  /* TEXT LINKS / BUTTONS */
  .san-lorenzo-page .text-cta {
    display: inline-flex;
    margin-top: 16px;
    padding: 11px 17px;
    color: #111;
    background: var(--gold);
    border: 1px solid var(--gold);
    border-radius: 3px;
    font-size: 12px;
    font-weight: 700;
    text-decoration: none;
    transition: .25s ease;
  }

  .san-lorenzo-page .text-cta:hover {
    background: var(--gold-light);
    transform: translateY(-2px);
  }

  /* FEATURE LISTS */
  .san-lorenzo-page .feature-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0 18px;
    margin: 26px 0;
    border-top: 1px solid var(--border);
  }

  .san-lorenzo-page .feature-grid.two {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .san-lorenzo-page .feature-item {
    display: flex;
    align-items: flex-start;
    gap: 11px;
    padding: 15px 8px 15px 0;
    color: #dedee1;
    border-bottom: 1px solid var(--border);
    font-size: 13px;
    line-height: 1.55;
  }

  .san-lorenzo-page .check {
    flex: 0 0 21px;
    width: 21px;
    height: 21px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #111;
    background: var(--gold);
    border-radius: 50%;
    font-size: 11px;
    font-weight: 800;
  }

  .san-lorenzo-page .wide-copy {
    max-width: 950px;
  }

  .san-lorenzo-page .styled-list {
    margin: 18px 0 22px;
    padding-left: 20px;
    color: #d2d2d5;
  }

  .san-lorenzo-page .styled-list li {
    margin: 8px 0;
    padding-left: 4px;
    font-size: 13px;
    line-height: 1.6;
  }

  .san-lorenzo-page .styled-list li::marker {
    color: var(--gold);
  }

  .san-lorenzo-page .service-detail {
    margin-top: 65px;
  }

  /* CORPORATE SECTION */
  .san-lorenzo-page .dark-section {
    color: #d4d4d7;
    background: #151518;
  }

  .san-lorenzo-page .dark-section h2,
  .san-lorenzo-page .dark-section h3 {
    color: var(--white);
  }

  .san-lorenzo-page .section-heading.light p {
    color: #c1c1c5;
  }

  .san-lorenzo-page .corporate-layout {
    display: grid;
    grid-template-columns: .9fr 1.1fr;
    gap: 50px;
    align-items: center;
  }

  .san-lorenzo-page .corporate-image {
    min-height: 440px;
    overflow: hidden;
    border-radius: 10px;
  }

  .san-lorenzo-page .light-list {
    color: #dedee1;
  }

  .san-lorenzo-page .reverse-mobile {
    direction: ltr;
  }

  .san-lorenzo-page .reverse-mobile > * {
    direction: ltr;
  }

  /* VEHICLE TABLE */
  .san-lorenzo-page .table-wrap {
    overflow-x: auto;
    background: #151518;
    border: 1px solid #303034;
    border-radius: 8px;
  }

  .san-lorenzo-page table {
    width: 100%;
    min-width: 700px;
    border-collapse: collapse;
  }

  .san-lorenzo-page th,
  .san-lorenzo-page td {
    padding: 14px 16px;
    color: #d9d9dc;
    border-bottom: 1px solid #303034;
    border-right: 1px solid #303034;
    text-align: left;
    vertical-align: top;
    font-size: 13px;
  }

  .san-lorenzo-page th {
    color: #111;
    background: var(--gold);
    font-size: 12px;
    font-weight: 700;
  }

  .san-lorenzo-page tr:last-child td {
    border-bottom: 0;
  }

  .san-lorenzo-page td:last-child,
  .san-lorenzo-page th:last-child {
    border-right: 0;
  }

  .san-lorenzo-page .fleet-note {
    margin: 20px 0 0;
    color: #aaaab0;
    font-size: 13px;
    font-style: italic;
  }

  /* WHY CHOOSE US */
  .san-lorenzo-page .why-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
  }

  .san-lorenzo-page .why-card {
    display: flex;
    gap: 16px;
    padding: 22px;
    background: var(--dark-card);
    border: 1px solid #29292d;
    border-radius: 8px;
  }

  .san-lorenzo-page .why-card p {
    margin: 0;
    color: #d6d6d9;
    font-size: 13px;
  }

  .san-lorenzo-page .number {
    color: var(--gold);
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 1px;
  }

  /* BOOKING STEPS */
  .san-lorenzo-page .steps {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 14px;
  }

  .san-lorenzo-page .step {
    min-height: 220px;
    padding: 24px;
    background: var(--dark-card);
    border: 1px solid #2b2b2f;
    border-radius: 8px;
  }

  .san-lorenzo-page .step-number {
    display: block;
    margin-bottom: 25px;
    color: var(--gold);
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 1.5px;
  }

  .san-lorenzo-page .step h3 {
    font-size: 17px;
  }

  .san-lorenzo-page .step p {
    color: #bdbdc2;
    font-size: 13px;
  }

  .san-lorenzo-page .booking-note {
    max-width: 900px;
    margin: 28px auto 0;
    padding: 22px 25px;
    background: #171719;
    border-left: 3px solid var(--gold);
    border-radius: 4px;
  }

  .san-lorenzo-page .booking-note p {
    margin: 0;
    font-size: 13px;
  }

  /* FINAL CTA */
  .san-lorenzo-page .final-cta {
    position: relative;
    display: flex;
    align-items: center;
    min-height: 570px;
    overflow: hidden;
    color: var(--white);
    background: #09090b;
  }

  .san-lorenzo-page .final-cta-image {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(
        90deg,
        rgba(5, 5, 6, .94),
        rgba(5, 5, 6, .68)
      ),
      url("https://www.blacarklimo.com/assets/images/unnamed (8).jpg")
      center/cover no-repeat;
  }

  .san-lorenzo-page .final-cta-content {
    position: relative;
    z-index: 2;
    max-width: 900px;
    padding-top: 75px;
    padding-bottom: 75px;
  }

  .san-lorenzo-page .final-cta h2 {
    max-width: 760px;
    color: var(--white);
  }

  .san-lorenzo-page .final-cta p {
    max-width: 740px;
    color: #d0d0d3;
    font-size: 14px;
  }

  .san-lorenzo-page .final-cta .strong {
    color: var(--white);
    font-weight: 600;
  }

  .san-lorenzo-page .light-label {
    color: var(--gold);
  }

  .san-lorenzo-page .corporate-link {
    display: inline-block;
    margin-top: 10px;
    color: var(--gold);
    font-size: 13px;
    font-weight: 700;
    text-decoration: underline;
  }

  /* FAQ */
  .san-lorenzo-page .faq-section {
    background: var(--black);
  }

  .san-lorenzo-page .faq-container {
    max-width: 1000px;
  }

  .san-lorenzo-page .faq-list {
    border-top: 1px solid var(--border);
  }

  .san-lorenzo-page .faq-item {
    border-bottom: 1px solid var(--border);
  }

  .san-lorenzo-page .faq-item summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 22px;
    padding: 20px 0;
    color: var(--white);
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    list-style: none;
  }

  .san-lorenzo-page .faq-item summary::-webkit-details-marker {
    display: none;
  }

  .san-lorenzo-page .faq-plus {
    flex: 0 0 28px;
    width: 28px;
    height: 28px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--gold);
    border: 1px solid var(--gold);
    border-radius: 50%;
    font-size: 20px;
    font-weight: 400;
  }

  .san-lorenzo-page .faq-item[open] .faq-plus {
    transform: rotate(45deg);
  }

  .san-lorenzo-page .faq-answer {
    padding: 0 45px 22px 0;
    color: #bdbdc2;
  }

  .san-lorenzo-page .faq-answer p,
  .san-lorenzo-page .faq-answer li {
    color: #bdbdc2;
    font-size: 13px;
  }

  .san-lorenzo-page .faq-answer ul {
    margin: 14px 0 0;
    padding-left: 20px;
  }

  .san-lorenzo-page .faq-answer li {
    margin: 12px 0;
  }

  .san-lorenzo-page .faq-answer strong {
    color: var(--white);
  }

  .san-lorenzo-page .faq-cta {
    margin-top: 50px;
    padding: 38px;
    color: var(--white);
    background: #171719;
    border: 1px solid #29292d;
    border-radius: 10px;
    text-align: center;
  }

  .san-lorenzo-page .faq-cta h3 {
    color: var(--white);
    font-size: 24px;
  }

  .san-lorenzo-page .faq-cta p {
    max-width: 650px;
    margin: 0 auto 22px;
    color: #bdbdc2;
    font-size: 13px;
  }

  /* TABLET */
  @media (max-width: 900px) {
    .san-lorenzo-page .hero {
      min-height: 560px;
    }

    .san-lorenzo-page .two-column,
    .san-lorenzo-page .corporate-layout {
      grid-template-columns: 1fr;
      gap: 35px;
    }

    .san-lorenzo-page .feature-grid,
    .san-lorenzo-page .feature-grid.two,
    .san-lorenzo-page .why-grid {
      grid-template-columns: 1fr;
    }

    .san-lorenzo-page .steps {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .san-lorenzo-page .image-card,
    .san-lorenzo-page .image-card.tall,
    .san-lorenzo-page .corporate-image {
      min-height: 380px;
    }
  }

  /* MOBILE */
  @media (max-width: 600px) {
    .san-lorenzo-page {
      font-size: 13px;
    }

    .san-lorenzo-page .container {
      width: calc(100% - 28px);
    }

    .san-lorenzo-page .section {
      padding: 58px 0;
    }

    .san-lorenzo-page .hero {
      min-height: 590px;
      background-position: 65% center;
    }

    .san-lorenzo-page .hero-content {
      padding: 65px 0;
    }

    .san-lorenzo-page .hero h1 {
      font-size: 36px;
      line-height: 1.1;
      letter-spacing: -1px;
    }

    .san-lorenzo-page .hero-intro {
      font-size: 14px;
    }

    .san-lorenzo-page .hero-buttons {
      flex-direction: column;
      align-items: stretch;
    }

    .san-lorenzo-page .btn {
      width: 100%;
    }

    .san-lorenzo-page .hero-trust {
      display: grid;
      gap: 8px;
      font-size: 11px;
    }

    .san-lorenzo-page h2 {
      font-size: 29px;
      line-height: 1.15;
    }

    .san-lorenzo-page h3 {
      font-size: 18px;
    }

    .san-lorenzo-page .feature-item {
      padding-right: 0;
      font-size: 12px;
    }

    .san-lorenzo-page .steps {
      grid-template-columns: 1fr;
    }

    .san-lorenzo-page .step {
      min-height: auto;
      padding: 22px;
    }

    .san-lorenzo-page .why-card {
      padding: 18px;
    }

    .san-lorenzo-page .faq-cta {
      padding: 28px 18px;
    }

    .san-lorenzo-page .faq-answer {
      padding-right: 0;
    }

    .san-lorenzo-page .faq-item summary {
      font-size: 13px;
    }

    .san-lorenzo-page .image-card,
    .san-lorenzo-page .image-card.tall,
    .san-lorenzo-page .corporate-image {
      min-height: 290px;
    }

    .san-lorenzo-page .final-cta {
      min-height: 580px;
    }

    .san-lorenzo-page .final-cta p {
      font-size: 13px;
    }
  }
  /* Keep all San Lorenzo sections aligned to one content width */
.san-lorenzo-page .container {
  width: 100%;
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 32px;
  padding-right: 32px;
}

/* Let section headings use the same container width */
.san-lorenzo-page .section-heading {
  width: 100%;
  max-width: none;
}

/* FAQ should follow the same container alignment */
.san-lorenzo-page .faq-container {
  width: 100%;
  max-width: 1024px;
}

/* Keep nested service content aligned with the main container */
.san-lorenzo-page .service-detail {
  width: 100%;
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
}

/* Mobile spacing */
@media (max-width: 600px) {
  .san-lorenzo-page .container,
  .san-lorenzo-page .faq-container,
  .san-lorenzo-page .service-detail {
    width: 100%;
    padding-left: 16px;
    padding-right: 16px;
  }
}
`}</style>    </>
  );
}

