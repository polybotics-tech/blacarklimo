import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Executive Chauffeur Service Morgan Hill, CA | Blacark Limo",

  description:
    "Book executive chauffeur service in Morgan Hill, CA, with Blacark Limo. Business hire, hourly, and day service and private rides. Request an online quote today!",

  alternates: {
    canonical:
      "https://www.blacarklimo.com/morgan-hill-ca",
  },

  openGraph: {
    title: "Executive Chauffeur Service Morgan Hill, CA | Blacark Limo",

    description:
      "Book executive chauffeur service in Morgan Hill, CA, with Blacark Limo. Business hire, hourly, and day service and private rides. Request an online quote today!",

    url: "https://www.blacarklimo.com/morgan-hill-ca",

    siteName: "Blacark Limo",

    type: "website",

    images: [
      {
        url: "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=1200&q=85",
        width: 1200,
        height: 630,
        alt: "Executive Chauffeur Service in Morgan Hill, CA - Blacark Limo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Executive Chauffeur Service in Morgan Hill, CA | Blacark Limo",

    description:
      "Professional chauffeur service in Morgan Hill, CA for business travel, hourly bookings, full-day itineraries, airport transfers, and private trips.",

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
    }[];
  }[];
}[] = [
  {
    question: "What is an executive chauffeur service in Morgan Hill, CA?",
    answer:
      "It is a private, pre-booked ride with a professional driver who follows your schedule. Blacark Limo handles business travel, airport transfers, and private trips from Morgan Hill across Northern California.",
    subQuestions: [
      {
        question: "Who uses an executive chauffeur service?",
        answer:
          "Business owners, executives, visiting clients, and professionals with tight schedules. Families and event guests use it too.",
        nested: [
          {
            question:
              "Is a chauffeur better than a taxi or rideshare for business?",
            answer:
              "Often, yes. A chauffeur is booked in advance, arrives on time, and stays with you through your plans. You avoid pickup waits and changing drivers.",
          },
          {
            question:
              "Who should I hire for business chauffeur hire in Morgan Hill, CA?",
            answer:
              "Choose a company with professional drivers, clear quotes, and a booking process you can trust. Blacark Limo plans each trip around your meetings and timing.",
          },
        ],
      },
      {
        question:
          "Is a luxury chauffeur service near Morgan Hill, CA worth it for a short trip?",
        answer:
          "It can be, if you value comfort, privacy, and punctuality. Many people book it for airport rides, client pickups, and special occasions.",
      },
    ],
  },
  {
    question: "How does car service by the hour work in Morgan Hill, CA?",
    answer:
      "You book a chauffeur and vehicle for a set number of hours. Your chauffeur can make several stops and wait between them.",
    subQuestions: [
      {
        question: "How many hours do I need to book?",
        answer:
          "Minimum hours depend on the vehicle and trip. Blacark Limo confirms this in your quote before you book.",
        nested: [
          {
            question: "What happens if my plans run longer than expected?",
            answer:
              "Extra time can usually be added if the vehicle is available. Tell your chauffeur early so the change can be arranged.",
          },
        ],
      },
      {
        question: "Can the chauffeur wait while I attend a meeting?",
        answer:
          "Yes. Waiting time is part of hourly service, so your ride is ready when you finish.",
      },
      {
        question: "Who is hourly service best for?",
        answer:
          "People with several stops in one day, such as meetings, appointments, shopping, or venue visits.",
      },
    ],
  },
  {
    question: "Can I book a day chauffeur hire in Morgan Hill, CA?",
    answer:
      "Yes. Day chauffeur hire gives you one driver for a full day of business or leisure travel. Share your stops and timing, and Blacark Limo recommends a booking length.",
    subQuestions: [
      {
        question: "What can I do with a full-day booking?",
        answer:
          "Attend back-to-back meetings, visit Santa Clara Valley wineries, or run personal errands without arranging new rides.",
        nested: [
          {
            question: "Who can I bring along?",
            answer:
              "Colleagues, clients, or family, as long as the vehicle fits your group and luggage. Give your passenger count when you request a quote.",
          },
        ],
      },
      {
        question: "Does the chauffeur stay with me all day?",
        answer:
          "Yes. Your chauffeur stays on schedule and waits during your stops.",
      },
    ],
  },
  {
    question: "Do you offer airport transfers from Morgan Hill?",
    answer:
      "Yes. Blacark Limo arranges rides between Morgan Hill and San Jose International Airport (SJC). It also serves SFO and OAK across the wider Bay Area.",
    subQuestions: [
      {
        question: "How early should I book an airport chauffeur?",
        answer:
          "Book as early as possible, especially for early flights and busy travel days.",
        nested: [
          {
            question: "Who should I tell about flight changes?",
            answer:
              "Contact Blacark Limo as soon as your plans change so your pickup time can be reviewed.",
          },
        ],
      },
      {
        question: "Can a chauffeur help with my luggage?",
        answer:
          "Chauffeurs assist with luggage when needed. Share your bag count so the right vehicle is assigned.",
      },
    ],
  },
  {
    question: "How much does a chauffeur service cost, and how do I book?",
    answer:
      "Price depends on the service type, vehicle, trip length, and date. Blacark Limo gives a quote before you confirm, so you know the cost upfront.",
    subQuestions: [
      {
        question:
          "What affects the price of a luxury car service near Morgan Hill, CA?",
        answer:
          "Hours booked, distance, vehicle size, and any extra stops or waiting time.",
        nested: [
          {
            question: "Who do I contact for a quote?",
            answer:
              "Use the Request a Quote button or call Blacark Limo with your pickup address, date, time, destination, and passenger count.",
          },
        ],
      },
      {
        question: "Is gratuity included?",
        answer:
          "This varies by booking. Ask when you request your quote so it is clear in advance.",
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
          ...(sub.nested || []).map(
            (n) => `${n.question}: ${n.answer}`
          ),
        ]),
      ].join(" "),
    },
  })),
};

export default function ExecutiveChauffeurServiceMorganHillPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <main className="morgan-hill-page">
        {/* HERO */}
        <section className="hero">
          <div className="hero-overlay" />

          <div className="container hero-content">
            <div className="hero-copy">
              <span className="eyebrow">EXECUTIVE CHAUFFEUR SERVICE</span>

              <h1>Executive Chauffeur Service in Morgan Hill, CA</h1>

              <p className="hero-intro">
                Blacark Limo offers executive chauffeur service in Morgan Hill,
                CA, so you can sit back, prepare for your day, and arrive calm
                and ready.
              </p>

              <div className="hero-buttons">
                <a
                  href="mailto:blacarklimo@gmail.com"
                  className="btn btn-primary"
                >
                  Request a Quote
                </a>

                <a href="#book" className="btn btn-outline">
                  Book a Chauffeur
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
              <span className="section-label">MORGAN HILL CHAUFFEUR</span>

              <h2>Executive Chauffeur Service in Morgan Hill, CA</h2>

              <p>
                Getting to a meeting on time should not mean worrying about
                traffic, parking, or directions. Blacark Limo offers executive
                chauffeur service in Morgan Hill, CA, so you can sit back,
                prepare for your day, and arrive calm and ready. Our
                professional chauffeurs and comfortable vehicles are available
                for business travel, airport transfers, special events, and
                private trips.
              </p>

              <p>
                Our office is in San Lorenzo, CA, and we serve Morgan Hill and
                communities across Northern California. Tell us where you need
                to go, and we will plan a ride around your schedule.
              </p>

              <a
                href="mailto:blacarklimo@gmail.com"
                className="text-cta"
              >
                Request a Quote →
              </a>
            </div>

            <div className="image-card">
              <img
                src="https://www.blacarklimo.com/assets/images/parking-valet-his-job-with-vehicle-woman.jpg"
                alt="luxury chauffeur service near me"
              />
            </div>
          </div>
        </section>

        {/* BUSINESS CHAUFFEUR HIRE */}
        <section className="section section-light">
          <div className="container">
            <div className="section-heading">
              <span className="section-label">BUSINESS TRAVEL</span>
              <h2>Professional Business Chauffeur Hire in Morgan Hill, CA</h2>
              <p>
                Business travel works best when the ride is one less thing to
                manage. Our business chauffeur hire in Morgan Hill, CA, gives
                executives, professionals, and corporate guests a private and
                dependable way to get where they need to be. Your chauffeur
                arrives on time, handles the driving, and lets you focus on
                calls, emails, or preparing for what comes next.
              </p>
              <p>We can help with:</p>
            </div>

            <div className="feature-grid">
              {[
                "Rides to corporate offices, client appointments, and business meetings",
                "Transportation for conferences, trade events, and company visits",
                "Multi-stop itineraries and roadshows in one day",
                "Airport transfers for you, your team, or visiting clients",
                "Pickups for guests who are new to the area",
              ].map((item) => (
                <div className="feature-item" key={item}>
                  <span className="check">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <p className="wide-copy">
              Our chauffeurs are courteous, discreet, and respectful of your
              time. If you are working during the ride, you can expect a quiet,
              professional setting. If you are hosting a client, you can expect
              a polished arrival that leaves a good first impression.
            </p>

            <p className="wide-copy">
              Reservations make planning easier, especially for recurring trips
              or larger groups. If your company needs regular transportation,
              contact us to discuss scheduling and billing options that suit
              your team.
            </p>

            <a
              href="https://www.blacarklimo.com/booking"
              className="text-cta"
            >
              Book a Chauffeur →
            </a>
          </div>
        </section>

        {/* CAR SERVICE BY THE HOUR */}
        <section className="section">
          <div className="container two-column reverse-mobile">
            <div className="image-card">
              <img
                src="https://www.blacarklimo.com/assets/images/taxi-driver-getting-ready-customer.jpg"
                alt="day chauffeur hire in morgan hill ca"
              />
            </div>

            <div>
              <span className="section-label">HOURLY SERVICE</span>

              <h2>Car Service by the Hour in Morgan Hill, CA</h2>

              <p>
                Some days do not fit into a single pickup and drop-off. Our car
                service by the hour in Morgan Hill, CA, lets you keep a
                chauffeur and vehicle with you for a set period, so you can move
                from one place to the next without booking a new ride each time.
              </p>

              <p>
                To get the most from your booking, share your planned stops,
                pickup times, and number of passengers when you request a
                quote. This helps us recommend the right amount of time and the
                right vehicle.
              </p>

              <p>
                Hourly rates, minimum booking times, and any extra charges
                depend on the vehicle and the trip. We will explain all of this
                clearly before you confirm, so there are no surprises on the
                day.
              </p>

              <a
                href="mailto:blacarklimo@gmail.com"
                className="text-cta"
              >
                Get an Hourly Quote →
              </a>
            </div>
          </div>

          <div className="container service-detail">
            <h3>Hourly service is a good fit when you need</h3>

            <div className="feature-grid two">
              {[
                {
                  label: "Multiple stops:",
                  text: "Visit several offices, venues, or homes in one trip.",
                },
                {
                  label: "Waiting time:",
                  text: "Your chauffeur stays nearby while you attend a meeting or appointment.",
                },
                {
                  label: "Flexibility:",
                  text: "Adjust the plan as your day changes, within the time you booked.",
                },
                {
                  label: "As-directed travel:",
                  text: "Tell your chauffeur where to go next, without a fixed route.",
                },
              ].map((item) => (
                <div className="feature-item" key={item.label}>
                  <span className="check">✓</span>
                  <span>
                    <strong>{item.label}</strong> {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LONGER ITINERARIES */}
        <section className="section dark-section">
          <div className="container">
            <div className="section-heading light">
              <span className="section-label">DAY CHAUFFEUR HIRE</span>
              <h2>
                Executive Chauffeur Service in Morgan Hill, CA for Longer
                Itineraries
              </h2>

              <p>
                An executive chauffeur service in Morgan Hill, CA, is about more
                than the ride itself. It is about having one reliable person who
                knows your plan, keeps to your timing, and takes care of the
                details on the road.
              </p>

              <p>
                When your schedule runs across a full day, day chauffeur hire in
                Morgan Hill, CA, can make everything simpler. Instead of
                arranging a separate ride for each stop, you book one chauffeur
                for the whole itinerary. This works well for:
              </p>
            </div>

            <div className="corporate-layout">
              <div className="corporate-image">
                <img
                  src="https://www.blacarklimo.com/assets/images/senior-businesswoman-exiting-car-with-chauffeur-executive-travel.jpg"
                  alt="Executive chauffeur service in Morgan Hill for full-day itineraries"
                />
              </div>

              <div className="corporate-content">
                <ul className="styled-list light-list">
                  <li>A day of business meetings across the South Bay</li>
                  <li>Client visits, site tours, and corporate hospitality</li>
                  <li>
                    Private sightseeing and winery trips in the Santa Clara
                    Valley
                  </li>
                  <li>Shopping, dining, and personal appointments</li>
                  <li>Family visits and special days out</li>
                </ul>

                <p>
                  Before your booking, we talk through your pickup point, stops,
                  timing, and return plan. Your chauffeur then follows the
                  schedule you have set, while staying ready for reasonable
                  changes. If you are not sure how long you will need, tell us
                  what you plan to do, and we will help you choose a sensible
                  booking length.
                </p>

                <p>
                  This kind of planning means fewer delays, less stress, and
                  more time for what matters to you.
                </p>

                <a
                  href="https://www.blacarklimo.com/booking"
                  className="text-cta"
                >
                  Plan My Day Itinerary →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* PRIVATE TRAVEL */}
        <section className="section">
          <div className="container two-column">
            <div>
              <span className="section-label">PRIVATE TRAVEL</span>

              <h2>Comfortable, Private Travel Made Simple</h2>

              <p>
                If you have ever searched for a ‘luxury car service near me’,
                you probably wanted three things: a clean vehicle, a driver you
                can trust, and a ride that starts on time. That is what we aim
                to provide with every booking.
              </p>

              <p>
                Our vehicles are well maintained and prepared before each trip.
                Inside, you can expect comfortable seating, a quiet cabin, and
                room for your luggage. Whether you are travelling alone, with
                colleagues, or with family, we can help you choose a vehicle
                that suits your group size and the bags you are bringing.
              </p>

              <p>
                Privacy matters, too. Your ride is yours alone, with no
                strangers and no shared stops. That makes it easy to take a
                call, review notes, or simply relax after a long day.
              </p>

              <p>
                Pickups are arranged around your plans. Tell us where and when
                you want to be collected, and we will confirm the details before
                your trip. Clear booking steps and clear communication mean you
                know what to expect from start to finish.
              </p>

              <a
                href="/fleet"
                className="text-cta"
              >
                View Our Fleet →
              </a>
            </div>

            <div className="image-card tall">
              <img
                src="https://www.blacarklimo.com/assets/images/portrait-adult-chauffeur-standing-by-luxury-sedan-vip-transport.jpg"
                alt="business chauffeur hire in morgan hill ca"
              />
            </div>
          </div>
        </section>

        {/* FLEET */}
        <section className="section section-light" id="fleet">
          <div className="container">
            <div className="section-heading">
              <span className="section-label">OUR VEHICLES</span>
              <h2>Luxury Vehicles for Comfortable Travel</h2>

              <p>
                We match the vehicle to the trip rather than sending whatever
                is available. Passenger count, luggage, and the kind of
                occasion all factor into the recommendation.
              </p>
            </div>

            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Vehicle</th>
                    <th>Passengers</th>
                    <th>Luggage</th>
                    <th>Best For</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>Luxury Sedan</td>
                    <td>Up to 3</td>
                    <td>2–3 bags</td>
                    <td>
                      Airport transfers, business meetings, solo or couple
                      travel
                    </td>
                  </tr>

                  <tr>
                    <td>Executive SUV</td>
                    <td>Up to 6</td>
                    <td>4–5 bags</td>
                    <td>
                      Family airport runs, small groups, extra luggage space
                    </td>
                  </tr>

                  <tr>
                    <td>Premium SUV</td>
                    <td>Up to 6</td>
                    <td>5–6 bags</td>
                    <td>
                      Corporate clients, VIP travel, longer Northern California
                      trips
                    </td>
                  </tr>

                  <tr>
                    <td>Sprinter Van</td>
                    <td>Up to 14</td>
                    <td>Large capacity</td>
                    <td>
                      Group transportation, corporate shuttles
                    </td>
                  </tr>

                  <tr>
                    <td>Stretch Limousine</td>
                    <td>Up to 10</td>
                    <td>Limited</td>
                    <td>
                      Weddings, proms, anniversaries, nights out
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="fleet-note">
              Not sure which vehicle fits? Tell us how many passengers and how
              many bags you have, and we will suggest the right option before
              we confirm.
            </p>
          </div>
        </section>

        {/* MORE THAN A RIDE */}
        <section className="section">
          <div className="container two-column">
            <div className="image-card">
              <img
                src="https://www.blacarklimo.com/assets/images/luxury-chauffeur-near-car-outdoors.jpg"
                alt="Luxury chauffeur service near Morgan Hill, CA for work and personal travel"
              />
            </div>

            <div>
              <span className="section-label">WORK AND LIFE</span>

              <h2>More Than a Ride: Chauffeur Service for Work and Life</h2>

              <p>
                A taxi or app ride gets you from one point to another. A luxury
                chauffeur service near Morgan Hill, CA should do more than that.
                It should give you a driver who plans, knows the route, and
                treats your trip as the priority.
              </p>

              <p>
                With Blacark Limo, you get a professional chauffeur who dresses
                neatly, drives safely, and helps with your luggage when needed.
                Your trip is booked in advance, so your vehicle is ready when
                you are.
              </p>

              <p>This service suits many kinds of travel:</p>

              <ul className="styled-list">
                <li>
                  <strong>Airport transfers:</strong> Travel to and from the
                  airport without parking or rideshare waits.
                </li>
                <li>
                  <strong>Corporate travel:</strong> Move between meetings and
                  events with a calm, organized schedule.
                </li>
                <li>
                  <strong>Special occasions:</strong> Arrive in comfort for
                  weddings, anniversaries, birthdays, and dinners.
                </li>
                <li>
                  <strong>Private transportation:</strong> Get to appointments,
                  social events, and family gatherings with ease.
                </li>
                <li>
                  <strong>Nights out:</strong> Enjoy the evening without
                  worrying about driving home.
                </li>
              </ul>

              <p>
                Whatever the reason for your trip, we keep the focus on comfort,
                punctuality, and respect for your plans.
              </p>

              <a
                href="https://www.blacarklimo.com/booking"
                className="text-cta"
              >
                Reserve Your Airport Transfer →
              </a>
            </div>
          </div>
        </section>

        {/* SERVICE AREAS */}
        <section className="section section-light">
          <div className="container">
            <div className="section-heading">
              <span className="section-label">LOCAL SERVICE AREA</span>
              <h2>Our Chauffeur Service Areas Around Morgan Hill</h2>
              <p>
                Blacark Limo is based in San Lorenzo, CA, and provides service
                across Northern California, including Morgan Hill. We do not
                have an office in Morgan Hill. Instead, we travel to you, so
                your chauffeur meets you at the address you choose.
              </p>
              <p>
                From Morgan Hill, we commonly help with trips to and from:
              </p>
            </div>

            <div className="why-grid">
              {[
                "San Martin and Gilroy",
                "San Jose, including downtown and business districts",
                "San Jose International Airport (SJC)",
                "Santa Clara Valley wineries and event venues",
                "Other South Bay and Bay Area destinations on request",
              ].map((item, index) => (
                <div className="why-card" key={index}>
                  <span className="number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p>{item}</p>
                </div>
              ))}
            </div>

            <p className="wide-copy" style={{ marginTop: 28 }}>
              We also serve airports and cities across the wider Bay Area,
              including San Francisco International Airport (SFO) and Oakland
              International Airport (OAK). If your trip starts or ends
              somewhere not listed here, send us the details, and we will
              confirm whether we can help.
            </p>
          </div>
        </section>

        {/* HOW TO BOOK */}
        <section className="section">
          <div className="container">
            <div className="section-heading center">
              <span className="section-label">SIMPLE BOOKING</span>
              <h2>How to Book</h2>
            </div>

            <div className="steps">
              <div className="step">
                <span className="step-number">01</span>
                <h3>Share Your Trip</h3>
                <p>
                  Tell us your pickup address, date, time, and destination.
                </p>
              </div>

              <div className="step">
                <span className="step-number">02</span>
                <h3>Passengers &amp; Service</h3>
                <p>
                  Share the number of passengers and the type of service you
                  want.
                </p>
              </div>

              <div className="step">
                <span className="step-number">03</span>
                <h3>Confirm Your Quote</h3>
                <p>
                  Receive your quote and confirm the details with us.
                </p>
              </div>

              <div className="step">
                <span className="step-number">04</span>
                <h3>Enjoy the Ride</h3>
                <p>
                  Meet your chauffeur at the agreed time and enjoy the ride.
                </p>
              </div>
            </div>

            <div className="booking-note">
              <p>
                We recommend booking as early as you can, especially for
                airport transfers, events, and full-day trips.
              </p>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="final-cta" id="book">
          <div className="final-cta-image" />

          <div className="container final-cta-content">
            <span className="section-label light-label">READY TO RIDE?</span>

            <h2>Ready to Book Your Ride?</h2>

            <p>
              If you want a calm, well-planned journey in Morgan Hill or
              anywhere in Northern California, Blacark Limo is ready to help.
              Share your trip details, and we will prepare a quote that fits
              your plans.
            </p>

            <div className="hero-buttons">
              <a
                href="mailto:blacarklimo@gmail.com"
                className="btn btn-primary"
              >
                Call Now to Reserve
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
              <h2>Frequently Asked Questions About Chauffeur Service</h2>
              <p>
                Answers to common questions about executive chauffeur service,
                hourly bookings, day hire, airport transfers, and pricing in
                Morgan Hill, CA.
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

                          {sub.nested && sub.nested.length > 0 && (
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
                      </ul>
                    ))}
                  </div>
                </details>
              ))}
            </div>

            <div className="faq-cta">
              <h3>Ready for a Private Ride in Morgan Hill?</h3>
              <p>
                Request your quote and let us know your pickup location,
                destination, date, time, passengers, and luggage.
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
  .morgan-hill-page {
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

  .morgan-hill-page * {
    box-sizing: border-box;
  }

 .morgan-hill-page .container {
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  padding-left: 32px;
  padding-right: 32px;
}

@media (max-width: 600px) {
  .morgan-hill-page .container {
    padding-left: 16px;
    padding-right: 16px;
  }
}

  /* HERO */
  .morgan-hill-page .hero {
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

  .morgan-hill-page .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(0, 0, 0, .48),
      rgba(0, 0, 0, .1)
    );
  }

  .morgan-hill-page .hero-content {
    position: relative;
    z-index: 2;
    padding: 90px 0;
  }

  .morgan-hill-page .hero-copy {
    max-width: 760px;
    color: var(--white);
  }

  .morgan-hill-page .eyebrow,
  .morgan-hill-page .section-label {
    display: inline-block;
    color: var(--gold);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2px;
    margin-bottom: 12px;
  }

  .morgan-hill-page .hero h1 {
    max-width: 820px;
    margin: 0 0 20px;
    color: var(--white);
    font-size: clamp(36px, 4.5vw, 58px);
    line-height: 1.08;
    letter-spacing: -1.5px;
    font-weight: 700;
  }

  .morgan-hill-page .hero-intro {
    max-width: 650px;
    margin: 0 0 26px;
    color: #dedee1;
    font-size: 15px;
    line-height: 1.65;
  }

  .morgan-hill-page .hero-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin: 22px 0;
  }

  .morgan-hill-page .btn {
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

  .morgan-hill-page .btn-primary {
    color: #111;
    background: var(--gold);
    border: 1px solid var(--gold);
  }

  .morgan-hill-page .btn-primary:hover {
    background: var(--gold-light);
    border-color: var(--gold-light);
    transform: translateY(-2px);
  }

  .morgan-hill-page .btn-outline {
    color: var(--white);
    background: transparent;
    border: 1px solid #77777b;
  }

  .morgan-hill-page .btn-outline:hover {
    color: #111;
    background: var(--gold);
    border-color: var(--gold);
  }

  .morgan-hill-page .hero-trust {
    display: flex;
    flex-wrap: wrap;
    gap: 18px;
    margin-top: 28px;
    color: #d0d0d3;
    font-size: 12px;
  }

  /* SECTION BASE */
  .morgan-hill-page .section {
    padding: 78px 0;
    background: var(--black);
    color: var(--text);
  }

  .morgan-hill-page .section-light {
    background: #101012;
  }

  .morgan-hill-page .section-heading {
    max-width: 820px;
    margin-bottom: 34px;
  }

  .morgan-hill-page .section-heading.center {
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }

  .morgan-hill-page h2 {
    margin: 0 0 18px;
    color: var(--white);
    font-size: clamp(28px, 3.3vw, 42px);
    line-height: 1.15;
    letter-spacing: -.7px;
    font-weight: 700;
  }

  .morgan-hill-page h3 {
    margin: 0 0 13px;
    color: var(--white);
    font-size: 20px;
    line-height: 1.25;
    font-weight: 600;
  }

  .morgan-hill-page p {
    margin: 0 0 16px;
    color: #c1c1c5;
    font-size: 14px;
    line-height: 1.65;
  }

  .morgan-hill-page .two-column {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 55px;
    align-items: center;
  }

  /* IMAGES */
  .morgan-hill-page .image-card {
    min-height: 420px;
    overflow: hidden;
    background: #19191c;
    border: 1px solid #2b2b2f;
    border-radius: 10px;
  }

  .morgan-hill-page .image-card.tall {
    min-height: 540px;
  }

  .morgan-hill-page .image-card img,
  .morgan-hill-page .corporate-image img {
    display: block;
    width: 100%;
    height: 100%;
    min-height: inherit;
    object-fit: cover;
  }

  /* TEXT LINKS / BUTTONS */
  .morgan-hill-page .text-cta {
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

  .morgan-hill-page .text-cta:hover {
    background: var(--gold-light);
    transform: translateY(-2px);
  }

  /* FEATURE LISTS */
  .morgan-hill-page .feature-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0 18px;
    margin: 26px 0;
    border-top: 1px solid var(--border);
  }

  .morgan-hill-page .feature-grid.two {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .morgan-hill-page .feature-item {
    display: flex;
    align-items: flex-start;
    gap: 11px;
    padding: 15px 8px 15px 0;
    color: #dedee1;
    border-bottom: 1px solid var(--border);
    font-size: 13px;
    line-height: 1.55;
  }

  .morgan-hill-page .check {
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

  .morgan-hill-page .wide-copy {
    max-width: 950px;
  }

  .morgan-hill-page .styled-list {
    margin: 18px 0 22px;
    padding-left: 20px;
    color: #d2d2d5;
  }

  .morgan-hill-page .styled-list li {
    margin: 8px 0;
    padding-left: 4px;
    font-size: 13px;
    line-height: 1.6;
  }

  .morgan-hill-page .styled-list li::marker {
    color: var(--gold);
  }

  .morgan-hill-page .service-detail {
    margin-top: 65px;
  }

  /* CORPORATE SECTION */
  .morgan-hill-page .dark-section {
    color: #d4d4d7;
    background: #151518;
  }

  .morgan-hill-page .dark-section h2,
  .morgan-hill-page .dark-section h3 {
    color: var(--white);
  }

  .morgan-hill-page .section-heading.light p {
    color: #c1c1c5;
  }

  .morgan-hill-page .corporate-layout {
    display: grid;
    grid-template-columns: .9fr 1.1fr;
    gap: 50px;
    align-items: center;
  }

  .morgan-hill-page .corporate-image {
    min-height: 440px;
    overflow: hidden;
    border-radius: 10px;
  }

  .morgan-hill-page .light-list {
    color: #dedee1;
  }

  .morgan-hill-page .reverse-mobile {
    direction: ltr;
  }

  .morgan-hill-page .reverse-mobile > * {
    direction: ltr;
  }

  /* VEHICLE TABLE */
  .morgan-hill-page .table-wrap {
    overflow-x: auto;
    background: #151518;
    border: 1px solid #303034;
    border-radius: 8px;
  }

  .morgan-hill-page table {
    width: 100%;
    min-width: 700px;
    border-collapse: collapse;
  }

  .morgan-hill-page th,
  .morgan-hill-page td {
    padding: 14px 16px;
    color: #d9d9dc;
    border-bottom: 1px solid #303034;
    border-right: 1px solid #303034;
    text-align: left;
    vertical-align: top;
    font-size: 13px;
  }

  .morgan-hill-page th {
    color: #111;
    background: var(--gold);
    font-size: 12px;
    font-weight: 700;
  }

  .morgan-hill-page tr:last-child td {
    border-bottom: 0;
  }

  .morgan-hill-page td:last-child,
  .morgan-hill-page th:last-child {
    border-right: 0;
  }

  .morgan-hill-page .fleet-note {
    margin: 20px 0 0;
    color: #aaaab0;
    font-size: 13px;
    font-style: italic;
  }

  /* WHY CHOOSE US */
  .morgan-hill-page .why-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
  }

  .morgan-hill-page .why-card {
    display: flex;
    gap: 16px;
    padding: 22px;
    background: var(--dark-card);
    border: 1px solid #29292d;
    border-radius: 8px;
  }

  .morgan-hill-page .why-card p {
    margin: 0;
    color: #d6d6d9;
    font-size: 13px;
  }

  .morgan-hill-page .number {
    color: var(--gold);
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 1px;
  }

  /* BOOKING STEPS */
  .morgan-hill-page .steps {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 14px;
  }

  .morgan-hill-page .step {
    min-height: 220px;
    padding: 24px;
    background: var(--dark-card);
    border: 1px solid #2b2b2f;
    border-radius: 8px;
  }

  .morgan-hill-page .step-number {
    display: block;
    margin-bottom: 25px;
    color: var(--gold);
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 1.5px;
  }

  .morgan-hill-page .step h3 {
    font-size: 17px;
  }

  .morgan-hill-page .step p {
    color: #bdbdc2;
    font-size: 13px;
  }

  .morgan-hill-page .booking-note {
    max-width: 900px;
    margin: 28px auto 0;
    padding: 22px 25px;
    background: #171719;
    border-left: 3px solid var(--gold);
    border-radius: 4px;
  }

  .morgan-hill-page .booking-note p {
    margin: 0;
    font-size: 13px;
  }

  /* FINAL CTA */
  .morgan-hill-page .final-cta {
    position: relative;
    display: flex;
    align-items: center;
    min-height: 570px;
    overflow: hidden;
    color: var(--white);
    background: #09090b;
  }

  .morgan-hill-page .final-cta-image {
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

  .morgan-hill-page .final-cta-content {
    position: relative;
    z-index: 2;
    max-width: 900px;
    padding-top: 75px;
    padding-bottom: 75px;
  }

  .morgan-hill-page .final-cta h2 {
    max-width: 760px;
    color: var(--white);
  }

  .morgan-hill-page .final-cta p {
    max-width: 740px;
    color: #d0d0d3;
    font-size: 14px;
  }

  .morgan-hill-page .final-cta .strong {
    color: var(--white);
    font-weight: 600;
  }

  .morgan-hill-page .light-label {
    color: var(--gold);
  }

  .morgan-hill-page .corporate-link {
    display: inline-block;
    margin-top: 10px;
    color: var(--gold);
    font-size: 13px;
    font-weight: 700;
    text-decoration: underline;
  }

  /* FAQ */
  .morgan-hill-page .faq-section {
    background: var(--black);
  }

  .morgan-hill-page .faq-container {
    max-width: 1000px;
  }

  .morgan-hill-page .faq-list {
    border-top: 1px solid var(--border);
  }

  .morgan-hill-page .faq-item {
    border-bottom: 1px solid var(--border);
  }

  .morgan-hill-page .faq-item summary {
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

  .morgan-hill-page .faq-item summary::-webkit-details-marker {
    display: none;
  }

  .morgan-hill-page .faq-plus {
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

  .morgan-hill-page .faq-item[open] .faq-plus {
    transform: rotate(45deg);
  }

  .morgan-hill-page .faq-answer {
    padding: 0 45px 22px 0;
    color: #bdbdc2;
  }

  .morgan-hill-page .faq-answer p,
  .morgan-hill-page .faq-answer li {
    color: #bdbdc2;
    font-size: 13px;
  }

  .morgan-hill-page .faq-answer ul {
    margin: 14px 0 0;
    padding-left: 20px;
  }

  .morgan-hill-page .faq-answer li {
    margin: 12px 0;
  }

  .morgan-hill-page .faq-answer strong {
    color: var(--white);
  }

  .morgan-hill-page .faq-cta {
    margin-top: 50px;
    padding: 38px;
    color: var(--white);
    background: #171719;
    border: 1px solid #29292d;
    border-radius: 10px;
    text-align: center;
  }

  .morgan-hill-page .faq-cta h3 {
    color: var(--white);
    font-size: 24px;
  }

  .morgan-hill-page .faq-cta p {
    max-width: 650px;
    margin: 0 auto 22px;
    color: #bdbdc2;
    font-size: 13px;
  }

  /* TABLET */
  @media (max-width: 900px) {
    .morgan-hill-page .hero {
      min-height: 560px;
    }

    .morgan-hill-page .two-column,
    .morgan-hill-page .corporate-layout {
      grid-template-columns: 1fr;
      gap: 35px;
    }

    .morgan-hill-page .feature-grid,
    .morgan-hill-page .feature-grid.two,
    .morgan-hill-page .why-grid {
      grid-template-columns: 1fr;
    }

    .morgan-hill-page .steps {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .morgan-hill-page .image-card,
    .morgan-hill-page .image-card.tall,
    .morgan-hill-page .corporate-image {
      min-height: 380px;
    }
  }

  /* MOBILE */
  @media (max-width: 600px) {
    .morgan-hill-page {
      font-size: 13px;
    }

    .morgan-hill-page .container {
      width: calc(100% - 28px);
    }

    .morgan-hill-page .section {
      padding: 58px 0;
    }

    .morgan-hill-page .hero {
      min-height: 590px;
      background-position: 65% center;
    }

    .morgan-hill-page .hero-content {
      padding: 65px 0;
    }

    .morgan-hill-page .hero h1 {
      font-size: 36px;
      line-height: 1.1;
      letter-spacing: -1px;
    }

    .morgan-hill-page .hero-intro {
      font-size: 14px;
    }

    .morgan-hill-page .hero-buttons {
      flex-direction: column;
      align-items: stretch;
    }

    .morgan-hill-page .btn {
      width: 100%;
    }

    .morgan-hill-page .hero-trust {
      display: grid;
      gap: 8px;
      font-size: 11px;
    }

    .morgan-hill-page h2 {
      font-size: 29px;
      line-height: 1.15;
    }

    .morgan-hill-page h3 {
      font-size: 18px;
    }

    .morgan-hill-page .feature-item {
      padding-right: 0;
      font-size: 12px;
    }

    .morgan-hill-page .steps {
      grid-template-columns: 1fr;
    }

    .morgan-hill-page .step {
      min-height: auto;
      padding: 22px;
    }

    .morgan-hill-page .why-card {
      padding: 18px;
    }

    .morgan-hill-page .faq-cta {
      padding: 28px 18px;
    }

    .morgan-hill-page .faq-answer {
      padding-right: 0;
    }

    .morgan-hill-page .faq-item summary {
      font-size: 13px;
    }

    .morgan-hill-page .image-card,
    .morgan-hill-page .image-card.tall,
    .morgan-hill-page .corporate-image {
      min-height: 290px;
    }

    .morgan-hill-page .final-cta {
      min-height: 580px;
    }

    .morgan-hill-page .final-cta p {
      font-size: 13px;
    }
  }
  /* Keep all Morgan Hill sections aligned to one content width */
.morgan-hill-page .container {
  width: 100%;
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 32px;
  padding-right: 32px;
}

/* Let section headings use the same container width */
.morgan-hill-page .section-heading {
  width: 100%;
  max-width: none;
}

/* FAQ should follow the same container alignment */
.morgan-hill-page .faq-container {
  width: 100%;
  max-width: 1024px;
}

/* Keep nested service content aligned with the main container */
.morgan-hill-page .service-detail {
  width: 100%;
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
}

/* Mobile spacing */
@media (max-width: 600px) {
  .morgan-hill-page .container,
  .morgan-hill-page .faq-container,
  .morgan-hill-page .service-detail {
    width: 100%;
    padding-left: 16px;
    padding-right: 16px;
  }
}
`}</style>    </>
  );
}
