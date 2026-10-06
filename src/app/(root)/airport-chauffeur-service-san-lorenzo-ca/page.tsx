
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Airport Chauffeur Service in San Lorenzo CA | Blacark Limo",

  description:
    "Blacark Limo offers chauffeur service to airport in San Lorenzo CA and luxury airport transfer in San Lorenzo CA to SFO, OAK & SJC. Book your private ride now.",

  alternates: {
    canonical:
      "https://www.blacarklimo.com/airport-chauffeur-service-san-lorenzo-ca/",
  },

  openGraph: {
    title: "Airport Chauffeur Service in San Lorenzo, CA | Blacark Limo",

    description:
      "Private airport transportation from San Lorenzo to SFO, OAK, and SJC. Professional chauffeurs, flight tracking, and door-to-door service.",

    url: "https://www.blacarklimo.com/airport-chauffeur-service-san-lorenzo-ca/",

    siteName: "Blacark Limo",

    type: "website",

    images: [
      {
        url: "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=1200&q=85",
        width: 1200,
        height: 630,
        alt: "Airport Chauffeur Service in San Lorenzo, CA - Blacark Limo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Airport Chauffeur Service in San Lorenzo, CA | Blacark Limo",

    description:
      "Private airport transportation from San Lorenzo to SFO, OAK, and SJC. Professional chauffeurs, flight tracking, and door-to-door service.",

    images: [
      "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=1200&q=85",
    ],
  },

  robots: {
    index: true,
    follow: true,
  },
};

type FaqNested = {
  question: string;
  answer: string;
};

type FaqSub = {
  question: string;
  answer: string;
  nested?: FaqNested[];
};

const faqs: {
  question: string;
  answer: string;
  subQuestions?: FaqSub[];
}[] = [
  {
    question: "How much does a chauffeur service to the airport cost?",
    answer:
      "Cost depends on your pickup location, airport, vehicle type, time of day, and extra stops. The most accurate way to find out is to request a quote with your trip details.",
    subQuestions: [
      {
        question: "Is a chauffeur more expensive than a taxi or rideshare?",
        answer:
          "A chauffeur is often priced higher, but you get a scheduled pickup, a private vehicle, and a professional driver. Rideshare prices can rise during busy hours, so a pre-booked ride can be easier to plan around.",
        nested: [
          {
            question: "Do I have to tip my airport chauffeur?",
            // TODO: Confirm your tipping / gratuity policy.
            answer:
              "Tipping is appreciated for good service, but check whether gratuity is already included in your quote.",
          },
          {
            question: "Are there extra charges for tolls or waiting time?",
            answer:
              "Some services add tolls, parking, or extra wait time to the fare. Ask what your quote includes before you book.",
          },
        ],
      },
      {
        question: "What affects the price of a limo airport transfer?",
        answer:
          "Vehicle size, distance, travel time, and special requests such as child seats all play a role.",
      },
    ],
  },
  {
    question: "How far in advance should I book an airport chauffeur?",
    answer:
      "Book as early as you can, especially for early-morning flights, holidays, and busy travel days. Last-minute rides may be possible, so call to check.",
    subQuestions: [
      {
        question: "Can I book a same-day airport ride?",
        answer:
          "Sometimes. It depends on vehicle and chauffeur availability, so call rather than relying on online booking alone.",
        nested: [
          {
            question: "What details do I need to book?",
            answer:
              "Have your pickup address, airport, date, time, passenger count, and luggage count ready. For arrivals, add your airline and flight number.",
          },
        ],
      },
      {
        question: "Can I book a round trip?",
        answer:
          "Yes. You can reserve your ride to the airport and your ride home together.",
      },
    ],
  },
  {
    question: "How early should I leave for the airport from San Lorenzo?",
    answer:
      "A common rule is to arrive about 2 hours before a domestic flight and 3 hours before an international flight. Traffic can change your travel time, so plan a buffer, especially on weekday mornings.",
    subQuestions: [
      {
        question: "How long does it take to get from San Lorenzo to SFO or OAK?",
        answer:
          "Travel time varies with traffic, bridge congestion, and time of day. OAK is generally the closer airport for East Bay travelers, while SFO usually requires more time.",
        nested: [
          {
            question: "Which airport is best for East Bay travelers?",
            answer:
              "OAK is often the most convenient, but SFO and SJC may offer better flight options. Choose based on your airline, destination, and ticket price.",
          },
          {
            question: "What happens if traffic is heavy?",
            answer:
              "Your chauffeur keeps an eye on road conditions and can adjust the route. Leaving with extra time is still the best protection.",
          },
        ],
      },
    ],
  },
  {
    question:
      "What is the difference between a limo service, a black car service, and a chauffeur service?",
    answer:
      'The terms overlap. All three involve a professional driver in a private vehicle. "Limo" often suggests a stretch limousine or a special-occasion ride, "black car" usually means a premium sedan or SUV, and "chauffeur service" describes the professional driver experience.',
    subQuestions: [
      {
        question: "Is a limo airport transfer worth it?",
        answer:
          "It can be a good choice for a special occasion, a group, or if you want extra comfort. For a simple trip, a luxury sedan or SUV often meets the same need.",
        nested: [
          {
            question: "Can I get a luxury SUV instead of a limo?",
            // TODO: Confirm your fleet.
            answer:
              "Yes, SUVs are a popular airport choice for families and travelers with extra bags.",
          },
        ],
      },
      {
        question: "What is the difference between a chauffeur and a rideshare driver?",
        answer:
          "A chauffeur is booked ahead for a set pickup time and provides professional, private service. Rideshare drivers are matched on demand.",
      },
    ],
  },
  {
    question: "Do airport chauffeurs track flights and help with luggage?",
    // TODO: Confirm flight tracking and luggage help.
    answer:
      "Many services track flights for airport pickups and offer luggage help. At Blacark Limo, your chauffeur monitors your flight and assists with your bags.",
    subQuestions: [
      {
        question: "What if my flight is delayed or arrives early?",
        answer:
          "Your pickup time is adjusted based on your updated arrival. Share your flight number when booking so we can follow it.",
        nested: [
          {
            question: "How long will my chauffeur wait at the airport?",
            // TODO: Add your waiting-time policy.
            answer:
              "Wait times vary by service. Ask about any free waiting window before you book.",
          },
        ],
      },
      {
        question: "Where will I meet my chauffeur?",
        // TODO: Confirm meet-and-greet options.
        answer:
          "Your chauffeur sends pickup instructions before you land and meets you at the curb or with a name sign, depending on your booking.",
        nested: [
          {
            question: "Can I bring child seats or extra luggage?",
            // TODO: Confirm child seat availability.
            answer:
              "Tell us at booking so we can assign the right vehicle.",
          },
        ],
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
          `${sub.question} ${sub.answer}`,
          ...(sub.nested || []).map((n) => `${n.question} ${n.answer}`),
        ]),
      ].join(" "),
    },
  })),
};

export default function AirportChauffeurServiceSanLorenzoPage() {
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
              <span className="eyebrow">AIRPORT CHAUFFEUR SERVICE</span>

              <h1>Airport Chauffeur Service in San Lorenzo CA</h1>

              <p className="hero-intro">
                Getting to the airport should not add stress to your trip.
                Blacark Limo provides private airport transportation from San
                Lorenzo to SFO, OAK, SJC, and other Bay Area airports. A
                professional chauffeur picks you up at your door, handles your
                luggage, and drives you straight to your terminal. No parking,
                no shared shuttles, and no last-minute ride hunting.
              </p>

              <p className="hero-intro">
                Our office is right here in San Lorenzo, so we know the East
                Bay and the routes people take to reach the airport. We also
                serve travelers across Northern California.
              </p>

              <div className="hero-buttons">
                <a
                  href="mailto:blacarklimo@gmail.com"
                  className="btn btn-primary"
                >
                  Get a Free Quote
                </a>

                <a
                  href="https://www.blacarklimo.com/booking"
                  className="btn btn-outline"
                >
                  Book Your Airport Transfer
                </a>
              </div>

              <div className="hero-trust">
                <span>✓ SFO, OAK &amp; SJC</span>
                <span>✓ Professional Chauffeurs</span>
                <span>✓ Door-to-Door Service</span>
              </div>
            </div>
          </div>
        </section>

        {/* RELIABLE CHAUFFEUR SERVICE */}
        <section className="section">
          <div className="container two-column">
            <div>
              <span className="section-label">SAN LORENZO AIRPORT CHAUFFEUR</span>

              <h2>Reliable Chauffeur Service to Airport in San Lorenzo, CA</h2>

              <p>
                If you need a dependable chauffeur service to airport in San
                Lorenzo, CA, our team plans your ride around your flight, not
                the other way around. You choose the pickup time and place. Your
                chauffeur arrives on schedule, helps you load your bags, and
                takes you directly to your departure terminal so you can start
                your trip relaxed.
              </p>

              <p>Our airport rides are a good fit for many kinds of travelers:</p>

              <ul className="styled-list">
                <li>Business travelers who need a quiet, on-time ride before an early flight</li>
                <li>Families who want a private vehicle with room for luggage</li>
                <li>Individual travelers who prefer a calm, direct ride</li>
                <li>Guests heading out for vacations, weddings, or long trips</li>
              </ul>

              <p>
                We offer one-way and round-trip bookings, so you can arrange
                your ride to the airport and your ride home in one reservation.
                Early-morning and late-night pickups are also available. Please
                share your flight time when you book so we can plan the right
                pickup time.
              </p>

              <a
                href="https://www.blacarklimo.com/booking"
                className="text-cta"
              >
                Book Your Airport Transfer →
              </a>
            </div>

            <div className="image-card">
              <img
                src="https://www.blacarklimo.com/assets/images/arrive-style-luxury-car-rentals-airport.jpg"
                alt="Chauffeur service to airport in San Lorenzo, CA"
              />
            </div>
          </div>
        </section>

        {/* LUXURY AIRPORT TRANSFER */}
        <section className="section section-light">
          <div className="container">
            <div className="section-heading">
              <span className="section-label">LUXURY AIRPORT TRANSFER</span>
              <h2>Luxury Airport Transfer in San Lorenzo, CA</h2>
              <p>
                A luxury airport transfer in San Lorenzo, CA is more than a
                nice car. It is the full experience from the moment you book to
                the moment you reach the curb. Here is what you can expect when
                you ride with Blacark Limo:
              </p>
            </div>

            <div className="feature-grid">
              {[
                "A clean, comfortable, well-kept vehicle",
                "A professional chauffeur who knows the area and drives with care",
                "Private transportation with no other passengers or extra stops",
                "Help with your luggage at pickup and drop-off",
                "Door-to-door service from your home, hotel, or office",
                // TODO: Confirm which amenities you provide.
                "Bottled water and other amenities",
              ].map((item) => (
                <div className="feature-item" key={item}>
                  <span className="check">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <p className="wide-copy">
              The result is a smooth, quiet ride where you can rest, answer
              emails, or simply enjoy a few calm minutes before your flight.
              When you land, the same level of care is waiting for you.
            </p>
          </div>
        </section>

        {/* AIRPORTS: SFO, OAK, SJC */}
        <section className="section">
          <div className="container two-column reverse-mobile">
            <div className="image-card tall">
              <img
                src="https://www.blacarklimo.com/assets/images/businessman-with-bag-hand-standing-near-glass-door-airport-looking-car-front-him-medical-mask-his-face.jpg"
                alt="San Lorenzo airport transportation to SFO, OAK and SJC"
              />
            </div>

            <div>
              <span className="section-label">AIRPORT TRANSPORTATION</span>

              <h2>San Lorenzo Airport Transportation to SFO, OAK &amp; SJC</h2>

              <p>
                We provide private rides between San Lorenzo and the three main
                Bay Area airports. Each airport has its own traffic patterns and
                pickup rules, and your chauffeur plans for them ahead of time.
              </p>

              <div className="airport-block">
                <h3>SFO Airport Transportation</h3>
                <p>
                  San Francisco International Airport is a popular choice for
                  long-distance and international flights. We provide
                  drop-offs at the departures level and pickups for arriving
                  passengers. Travel time from San Lorenzo depends on the time
                  of day and bridge traffic, so we recommend leaving extra
                  time, especially during weekday rush hours. We do not promise
                  a fixed travel time, but we plan your pickup with real
                  traffic in mind.
                </p>
              </div>

              <div className="airport-block">
                <h3>OAK Airport Transportation</h3>
                <p>
                  Oakland International Airport is the closest major airport to
                  San Lorenzo, which makes it a convenient option for many East
                  Bay travelers. We offer pickups and drop-offs at OAK, and our
                  chauffeurs share clear pickup instructions with arriving
                  passengers so meeting up is simple.
                </p>
              </div>

              <div className="airport-block">
                <h3>SJC Airport Transportation</h3>
                <p>
                  Norman Y. Mineta San Jose International Airport is a good
                  option for travelers heading to the South Bay or Silicon
                  Valley. We provide private transfers from San Lorenzo to SJC
                  with the same door-to-door service you get on every ride,
                  including help with your bags.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="section section-light">
          <div className="container">
            <div className="section-heading center">
              <span className="section-label">SIMPLE BOOKING</span>
              <h2>How Our Airport Chauffeur Service in San Lorenzo, CA Works</h2>
              <p>
                Booking is simple. Our airport chauffeur service in San Lorenzo,
                CA follows four easy steps.
              </p>
            </div>

            <div className="steps">
              <div className="step">
                <span className="step-number">01</span>
                <h3>Reserve your ride.</h3>
                <p>
                  Tell us your pickup address, airport, date, time, number of
                  passengers, and how much luggage you have. You can book
                  online or call us.
                </p>
              </div>

              <div className="step">
                <span className="step-number">02</span>
                <h3>Get your confirmation.</h3>
                <p>
                  You will receive a confirmation with your trip details. If
                  anything needs to change, contact us, and we will update your
                  booking.
                </p>
              </div>

              <div className="step">
                <span className="step-number">03</span>
                <h3>We monitor your trip.</h3>
                <p>
                  For airport arrivals, our team keeps an eye on your flight
                  status so your pickup can be adjusted if your plane is early
                  or late.
                </p>
              </div>

              <div className="step">
                <span className="step-number">04</span>
                <h3>Enjoy your ride.</h3>
                <p>
                  Your chauffeur meets you at the scheduled time and drives you
                  directly to the airport, or from the airport to your
                  destination.
                </p>
              </div>
            </div>

            <div className="center-cta">
              <a
                href="https://www.blacarklimo.com/booking"
                className="btn btn-primary"
              >
                Reserve Your Chauffeur
              </a>
            </div>
          </div>
        </section>

        {/* FLIGHT TRACKING + MEET AND GREET */}
        <section className="section dark-section">
          <div className="container">
            <div className="section-heading light">
              <span className="section-label">FLIGHT TRACKING</span>
              <h2>Flight Tracking for Airport Pickups</h2>

              <p>
                Flights do not always land on time. That is why we track your
                flight for airport pickups. If your plane arrives early, we
                adjust. If it is delayed, we adjust that too, so your chauffeur
                is ready when you are. Please give us your airline and flight
                number when you book.
              </p>

              <p>
                Flight tracking helps us plan well, but we cannot control
                weather or air traffic. What we can do is stay in touch and
                keep your pickup as smooth as possible.
              </p>

              <a
                href="https://www.blacarklimo.com/booking"
                className="text-cta"
              >
                Check Availability →
              </a>
            </div>

            <div className="corporate-layout">
              <div className="corporate-image">
                <img
                  src="https://www.blacarklimo.com/assets/images/luxury-car-private-jet.jpg"
                  alt="Airport pickup and meet-and-greet chauffeur service"
                />
              </div>

              <div className="corporate-content">
                <span className="section-label">MEET AND GREET</span>
                <h3>Airport Pickup &amp; Meet-and-Greet Service</h3>

                {/* TODO: Confirm your meet-and-greet options. */}
                <p>
                  Arriving in a busy airport can be confusing. To make it
                  easier, we share pickup instructions before you land.
                  Depending on your airport and preference, your chauffeur can
                  meet you at the curb or inside the terminal with a name sign.
                </p>

                <ul className="styled-list light-list">
                  <li>Your chauffeur contacts you by phone or text once you land</li>
                  <li>Your chauffeur helps with your luggage and walks you to the vehicle</li>
                  <li>If your flight is delayed, we update your pickup time</li>
                </ul>

                <p>
                  Let us know at booking if you would like a name-sign meeting
                  or a curbside pickup, and we will note it on your
                  reservation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* EVERY TYPE OF TRAVELER */}
        <section className="section">
          <div className="container two-column">
            <div>
              <span className="section-label">FOR EVERY TRAVELER</span>

              <h2>Airport Transportation for Every Type of Traveler</h2>

              <p>
                Blacark Limo offers luxury airport transport in San Lorenzo, CA
                for many kinds of trips. Here is how we help each type of
                traveler.
              </p>

              <div className="airport-block">
                <h3>Business Travelers</h3>
                <p>
                  Time matters when you travel for work. We offer scheduled
                  pickups, a comfortable and quiet ride, and direct routes to
                  the airport. If your company travels often, ask us about
                  corporate accounts.
                </p>
              </div>

              <div className="airport-block">
                <h3>Families</h3>
                {/* TODO: Confirm child seat availability. */}
                <p>
                  Traveling with children and bags is easier with a private
                  vehicle. We pick you up at your home or hotel, and there is
                  room for your luggage. Please tell us at booking if you need
                  a child seat.
                </p>
              </div>

              <div className="airport-block">
                <h3>Individual Travelers</h3>
                <p>
                  If you like a peaceful ride, a private chauffeur is a great
                  choice. There are no shared shuttle stops, no waiting for
                  other riders, and no need to drive yourself.
                </p>
              </div>

              <div className="airport-block">
                <h3>Groups</h3>
                {/* TODO: Confirm your fleet. */}
                <p>
                  Traveling with coworkers, friends, or relatives? Choose an
                  SUV or Sprinter van so everyone rides together.
                </p>
              </div>

              <a
                href="mailto:blacarklimo@gmail.com"
                className="text-cta"
              >
                Request Airport Transportation →
              </a>
            </div>

            <div className="image-card tall">
              <img
                src="https://www.blacarklimo.com/assets/images/seamless-travel-experience-luxury-car-rentals-airports.jpg"
                alt="Luxury airport transport in San Lorenzo, CA for every traveler"
              />
            </div>
          </div>
        </section>

        {/* FLEET */}
        <section className="section section-light" id="fleet">
          <div className="container">
            <div className="section-heading">
              <span className="section-label">OUR VEHICLES</span>
              <h2>Choose the Right Vehicle for Your Airport Transfer</h2>

              <p>
                The best vehicle depends on how many people are traveling and
                how much luggage you have. Use this table as a quick guide, and
                let us know your needs so we can recommend the right fit.
              </p>
            </div>

            {/* TODO: Confirm passenger numbers for each vehicle. */}
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Vehicle</th>
                    <th>Passengers</th>
                    <th>Best For</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>Luxury Sedan</td>
                    <td>Up to 3</td>
                    <td>Solo travelers, couples, and business travelers</td>
                  </tr>

                  <tr>
                    <td>Luxury SUV</td>
                    <td>Up to 6</td>
                    <td>Families, extra luggage, and small groups</td>
                  </tr>

                  <tr>
                    <td>Sprinter Van</td>
                    <td>Up to 14</td>
                    <td>Larger groups traveling together</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="fleet-note">
              Not sure which vehicle to pick? Contact us with your passenger
              and luggage count, and we will help you choose.
            </p>
          </div>
        </section>

        {/* PRIVATE LIMOUSINE RIDES */}
        <section className="section">
          <div className="container two-column reverse-mobile">
            <div className="image-card">
              <img
                src="https://www.blacarklimo.com/assets/images/arrive-style-luxury-car-rentals-airport.jpg"
                alt="Private limousine ride to the airport from San Lorenzo"
              />
            </div>

            <div>
              <span className="section-label">LIMO AIRPORT TRANSFER</span>

              <h2>Private Limousine Rides to the Airport from San Lorenzo</h2>

              <p>
                Some travelers want a little extra style for the ride. Our limo
                airport transfer in San Lorenzo, CA, gives you a private,
                chauffeur-driven ride to or from the airport. It works well for
                business travel, anniversaries, birthdays, or a special evening
                before or after a flight.
              </p>

              <p>
                You may hear the terms limo service, black car service, and
                chauffeur service used in different ways. In simple terms, they
                all describe a professional driver taking you where you need to
                go in a comfortable private vehicle. Tell us the kind of
                experience you want, and we will match you with the right
                option.
              </p>

              <p>
                Blacark Limo also provides corporate travel, special event
                transportation, and private rides across Northern California.
                Ask us if you would like to combine your airport ride with
                another trip.
              </p>

              <a href="/fleet" className="text-cta">
                View Our Fleet →
              </a>
            </div>
          </div>
        </section>

        {/* AREAS */}
        <section className="section section-light">
          <div className="container two-column">
            <div>
              <span className="section-label">LOCAL SERVICE AREA</span>

              <h2>Airport Transportation Serving San Lorenzo and Nearby Areas</h2>

              {/* TODO: Confirm service areas. */}
              <p>
                Our office is in San Lorenzo, and we regularly pick up
                travelers in nearby East Bay communities, including San
                Leandro, Hayward, Castro Valley, Oakland, and Alameda. Whether
                you live, work, or stay in one of these areas, we can arrange a
                private ride to SFO, OAK, or SJC.
              </p>

              <p>
                We also serve other parts of Northern California. If your
                pickup is outside the East Bay, contact us, and we will confirm
                availability.
              </p>
            </div>

            <div className="image-card">
              <img
                src="https://www.blacarklimo.com/assets/images/business-couple-walking-with-suitcase-parking-lot.jpg"
                alt="Airport transportation serving San Lorenzo and the East Bay"
              />
            </div>
          </div>
        </section>

        {/* WHY CHOOSE */}
        <section className="section">
          <div className="container">
            <div className="section-heading">
              <span className="section-label">WHY BLACARK LIMO</span>
              <h2>Why Choose Our Airport Chauffeur Service in San Lorenzo, CA?</h2>
              <p>
                When you pick an airport chauffeur service in San Lorenzo, CA,
                you want to know what you are getting. Here is what we stand
                behind:
              </p>
            </div>

            {/* TODO: Add years in business, 24/7 dispatch, fixed pricing — only if true. */}
            <div className="why-grid">
              {[
                "Professional chauffeurs who focus on safe, courteous service",
                "Clean, well-maintained vehicles",
                "Flight tracking for airport arrivals",
                "Scheduled pickups planned around your flight",
                "A local San Lorenzo office and knowledge of East Bay roads",
                "Simple booking online or by phone",
                "Licensed and insured chauffeurs",
              ].map((item, index) => (
                <div className="why-card" key={index}>
                  <span className="number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="final-cta" id="book">
          <div className="final-cta-image" />

          <div className="container final-cta-content">
            <span className="section-label light-label">READY TO RIDE?</span>

            <h2>Book Your San Lorenzo Airport Chauffeur</h2>

            <p>
              Ready for a comfortable airport transfer from San Lorenzo?
              Reserve your private chauffeur today for a ride to or from SFO,
              OAK, SJC, or another Bay Area airport.
            </p>

            <div className="hero-buttons">
              {/* TODO: Replace href with tel:+1XXXXXXXXXX once the phone number is confirmed. */}
              <a
                href="https://www.blacarklimo.com/booking"
                className="btn btn-primary"
              >
                Call to Book Now
              </a>

              <a
                href="mailto:blacarklimo@gmail.com"
                className="btn btn-outline"
              >
                Get a Free Quote
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section faq-section">
          <div className="container faq-container">
            <div className="section-heading">
              <span className="section-label">FAQ</span>
              <h2>Frequently Asked Questions</h2>
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

                    {faq.subQuestions && (
                      <ul>
                        {faq.subQuestions.map((sub) => (
                          <li key={sub.question}>
                            <strong>{sub.question}</strong>
                            <br />
                            {sub.answer}

                            {sub.nested && (
                              <ul>
                                {sub.nested.map((n) => (
                                  <li key={n.question}>
                                    <strong>{n.question}</strong>
                                    <br />
                                    {n.answer}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </details>
              ))}
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
    margin: 0 0 18px;
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

  /* AIRPORT / TRAVELER SUB-BLOCKS */
  .san-lorenzo-page .airport-block {
    margin-top: 22px;
    padding-left: 16px;
    border-left: 2px solid var(--gold);
  }

  .san-lorenzo-page .airport-block h3 {
    margin-bottom: 8px;
    font-size: 17px;
  }

  .san-lorenzo-page .airport-block p {
    margin-bottom: 0;
    font-size: 13px;
  }

  .san-lorenzo-page .center-cta {
    margin-top: 34px;
    text-align: center;
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

  /* DARK SECTION */
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
    min-width: 560px;
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

.san-lorenzo-page .section-heading {
  width: 100%;
  max-width: none;
}

.san-lorenzo-page .faq-container {
  width: 100%;
  max-width: 1024px;
}

.san-lorenzo-page .service-detail {
  width: 100%;
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
}

@media (max-width: 600px) {
  .san-lorenzo-page .container,
  .san-lorenzo-page .faq-container,
  .san-lorenzo-page .service-detail {
    width: 100%;
    padding-left: 16px;
    padding-right: 16px;
  }
}
`}</style>
    </>
  );
}
