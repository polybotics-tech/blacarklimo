
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luxury Chauffeur Service in San Lorenzo, CA | Blacark Limo",

  description:
    "Book a luxury chauffeur service in San Lorenzo, CA with Blacark Limo. Private airport transfers to SFO, OAK & SJC, corporate travel, and events. Get a quote.",

  alternates: {
    canonical:
      "https://www.blacarklimo.com/luxury-chauffeur-service-san-lorenzo-ca/",
  },

  openGraph: {
    title: "Luxury Chauffeur Service in San Lorenzo, CA | Blacark Limo",

    description:
      "Premium chauffeur and private transportation service in San Lorenzo, CA for airport transfers, corporate travel, events, and more.",

    url: "https://www.blacarklimo.com/luxury-chauffeur-service-san-lorenzo-ca/",

    siteName: "Blacark Limo",

    type: "website",

    images: [
      {
        url: "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=1200&q=85",
        width: 1200,
        height: 630,
        alt: "Luxury Chauffeur Service in San Lorenzo, CA - Blacark Limo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Luxury Chauffeur Service in San Lorenzo, CA | Blacark Limo",

    description:
      "Premium chauffeur and private transportation service in San Lorenzo, CA for airport transfers, corporate travel, events, and more.",

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
    question: "Who will be my chauffeur?",
    answer:
      "A licensed, insured, professionally dressed chauffeur assigned to your booking in advance.",
    subQuestions: [
      {
        question: "How is that different from a rideshare driver?",
        answer:
          "Booked for you, not app-matched. Plans the route, waits if you're delayed, and helps with bags.",
        nested: {
          question: "Same chauffeur all day?",
          answer:
            "Yes. One chauffeur and vehicle stay with you for the full hourly booking.",
        },
      },
    ],
  },
  {
    question: "How many passengers fit?",
    answer:
      "Sedan up to 3, SUV up to 6, stretch limousine up to 10, Sprinter van up to 14.",
    subQuestions: [
      {
        question: "Family of four flying out of SFO?",
        answer:
          "Book the SUV. A sedan seats four, but luggage space runs out fast.",
        nested: {
          question: "Child seats available?",
          answer:
            "Yes, on request. Tell us ages when you book.",
        },
      },
      {
        question: "Group over 14?",
        answer:
          "We run multiple vehicles on the same schedule.",
      },
    ],
  },
  {
    question: "Who books this service?",
    answer:
      "Business travelers, airport passengers, companies moving clients, and people booking weddings, proms, concerts, and events.",
    subQuestions: [
      {
        question: "Corporate accounts available?",
        answer:
          "Yes — recurring bookings and one consolidated bill.",
        nested: {
          question: "Is the ride private?",
          answer:
            "Yes. What's discussed in the car stays there.",
        },
      },
      {
        question: "Weddings and proms?",
        answer:
          "Yes. Book several weeks ahead for those dates.",
      },
    ],
  },
  {
    question: "How do trips to the airport work?",
    answer:
      "We cover SFO, OAK, and SJC. OAK is closest to San Lorenzo; SFO is over the San Mateo Bridge.",
    subQuestions: [
      {
        question: "What time will you pick me up?",
        answer:
          "We set it based on your flight time and real traffic, not a best-case guess.",
        nested: {
          question: "Flight lands late?",
          answer:
            "Send your flight number, and we'll adjust the pickup.",
        },
      },
      {
        question: "Where do we meet?",
        answer:
          "Curbside or a meet-and-greet inside — your choice.",
      },
    ],
  },
  {
    question: "What does it cost?",
    answer:
      "Depends on vehicle, distance, and time of day. Airport runs are usually a flat rate; events are hourly. You get the quote before you confirm.",
    subQuestions: [
      {
        question: "Hourly or per trip?",
        answer:
          "Point-to-point for transfers, hourly if the car waits between stops.",
        nested: {
          question: "Hourly minimum?",
          answer:
            "Yes, and it varies by vehicle and date. We'll tell you upfront.",
        },
      },
      {
        question: "Tipping?",
        answer:
          "Appreciated, never required. We'll say whether gratuity is already in your quote.",
      },
      {
        question: "How far ahead to book?",
        answer:
          "24–48 hours for most trips. Same-day is fine if a vehicle is free.",
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

export default function LuxuryChauffeurServiceSanLorenzoPage() {
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
              <span className="eyebrow">PRIVATE CHAUFFEUR SERVICE</span>

              <h1>Luxury Chauffeur Service in San Lorenzo, CA</h1>

              <p className="hero-intro">
                Premium private transportation for airport travel, corporate
                trips, special events, and everyday rides throughout San
                Lorenzo and the greater Bay Area.
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
              <span className="section-label">SAN LORENZO CHAUFFEUR</span>

              <h2>Luxury Chauffeur Service in San Lorenzo, CA</h2>

              <p>
                Blacark Limo is a chauffeur and limousine company based in San
                Lorenzo, California. We provide private, door-to-door
                transportation for airport travel, corporate trips, special
                events, and everyday rides across Alameda County, the East
                Bay, and the wider Northern California area.
              </p>

              <p>
                Our riders include business travelers heading to SFO before
                sunrise, families flying out of Oakland, companies moving
                executives and clients between meetings, and couples who simply
                want a comfortable car for an evening out. Every booking
                includes the same three things: a professional chauffeur, a
                clean, well-maintained vehicle, and pickup when we say it will.
              </p>

              <p>
                If you are looking for a luxury chauffeur service in San
                Lorenzo, CA that's simple and dependable, we are ready to help.
                Call or request a quote online, and we will confirm your ride
                with clear pricing and no guesswork.
              </p>

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
                alt="Luxury black chauffeur vehicle"
              />
            </div>
          </div>
        </section>

        {/* LUXURY CAR SERVICE */}
        <section className="section section-light">
          <div className="container">
            <div className="section-heading">
              <span className="section-label">PRIVATE CAR SERVICE</span>
              <h2>Luxury Car Service in San Lorenzo, CA</h2>
              <p>
                A luxury car service in San Lorenzo, CA should feel effortless.
                You book, we arrive, and you get where you need to be without
                traffic apps, parking garages, or rideshare surprises. Here is
                what that looks like with Blacark Limo:
              </p>
            </div>

            <div className="feature-grid">
              {[
                "A professional chauffeur who is licensed, well-presented, and familiar with Bay Area roads",
                "Clean, well-maintained vehicles that are inspected before every trip",
                "Comfortable seating with room to work, rest, or talk privately",
                "Door-to-door pickup and drop-off at your home, office, hotel, or terminal",
                "Private transportation — no shared rides and no unexpected stops",
                "Flexible scheduling for early mornings, late nights, and multi-stop trips",
                "Personalized service, including child seats, extra luggage space, or specific route preferences on request",
              ].map((item) => (
                <div className="feature-item" key={item}>
                  <span className="check">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <p className="wide-copy">
              The experience is meant to be calm rather than flashy. Your
              chauffeur confirms the pickup, helps with your bags, and drives
              smoothly so you arrive relaxed. If you have been searching for a
              luxury car service near me and want something more consistent than
              an app-based ride, this is the difference you will notice first.
            </p>

            <a
              href="https://www.blacarklimo.com/booking"
              className="text-cta"
            >
             Book Your Chauffeur Now →
            </a>
          </div>
        </section>

        {/* AIRPORT */}
        <section className="section">
          <div className="container two-column reverse-mobile">
            <div className="image-card">
              <img
                src="https://www.blacarklimo.com/assets/images/unnamed (5).jpg"
                alt="Airport transportation and private chauffeur service"
              />
            </div>

            <div>
              <span className="section-label">AIRPORT TRANSPORTATION</span>

              <h2>Luxury Airport Transportation From San Lorenzo</h2>

              <p>
                San Lorenzo sits in a convenient spot for Bay area air travel,
                and airport transfers are one of our most requested services.
                We provide private transportation to and from all three major
                regional airports:
              </p>

              <ul className="styled-list">
                <li>SFO — San Francisco International Airport</li>
                <li>OAK — Oakland International Airport</li>
                <li>SJC — San José Mineta International Airport</li>
              </ul>

              <p>
                Oakland is the closest option for most San Lorenzo residents,
                usually a short ride up I-880. SFO is typically reached over the
                San Mateo Bridge or up through the Peninsula, and SJC is an easy
                run south. We plan pickup times around your flight, the time of
                day, and realistic traffic — not a best-case estimate.
              </p>

              <a
                href="https://www.blacarklimo.com/booking"
                className="text-cta"
              >
               Reserve Your Airport Transfer →
              </a>
            </div>
          </div>

          <div className="container service-detail">
            <h3>Airport services we provide</h3>

            <div className="feature-grid two">
              {[
                "Departure transfers with pickup from your home, office, or hotel",
                "Arrival pickups with curbside or meet-and-greet service",
                "Luggage assistance from your door to the terminal",
                "Corporate airport transportation for visiting executives and clients",
                "Private airport transfers for families and small groups",
                "Round-trip bookings so your return ride is already arranged",
              ].map((item) => (
                <div className="feature-item" key={item}>
                  <span className="check">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <p>
              For arrivals, let us know your flight number, and we will
              coordinate the pickup around your landing time. Travelers who
              search for a “luxury chauffeur service near me” before a trip are
              usually trying to avoid one specific problem — standing at the
              curb with luggage, waiting on a ride that keeps getting
              reassigned. A pre-booked chauffeur removes that entirely.
            </p>
          </div>
        </section>

        {/* CORPORATE */}
        <section className="section dark-section">
          <div className="container">
            <div className="section-heading light">
              <span className="section-label">EXECUTIVE TRANSPORTATION</span>
              <h2>Corporate Chauffeur Service in San Lorenzo, CA</h2>

              <p>
                Business travel runs on schedules, and our corporate service is
                built around keeping them intact. We work with companies across
                the East Bay and Northern California that need reliable ground
                transportation for their teams, their clients, and their
                visitors.
              </p>
            </div>

            <div className="corporate-layout">
              <div className="corporate-image">
                <img
                  src="https://www.blacarklimo.com/assets/images/unnamed (6).jpg"
                  alt="Executive corporate chauffeur transportation"
                />
              </div>

              <div className="corporate-content">
                <ul className="styled-list light-list">
                  <li>
                    Executive travel between offices, meetings, and job sites
                  </li>
                  <li>Airport transfers for staff and incoming clients</li>
                  <li>
                    Client transportation where a professional first impression
                    matters
                  </li>
                  <li>Corporate events, conferences, and trade shows</li>
                  <li>
                    Business roadshows with multiple stops in a single day
                  </li>
                  <li>Employee transportation and group shuttles</li>
                </ul>

                <p>
                  Rear seating gives you space to take a call, review a deck,
                  or simply think before you walk into a meeting. Your
                  chauffeur handles the route, the parking, and the timing. For
                  companies that book often, we can set up recurring
                  reservations and consolidated billing so your team is not
                  filling expense receipts after every trip.
                </p>

                <p>
                  Confidentiality is part of the job. Conversations that happen
                  in the car stay in the car.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PRIVATE OCCASIONS */}
        <section className="section">
          <div className="container two-column">
            <div>
              <span className="section-label">PRIVATE OCCASIONS</span>

              <h2>Private Chauffeur Service for Every Occasion</h2>

              <p>
                Not every ride is about work. A good chauffeur service is just
                as useful on the days you want to enjoy yourself without
                worrying about driving, directions, or parking.
              </p>

              <ul className="styled-list">
                <li>Weddings, including transportation for the couple, family, and guests</li>
                <li>Anniversaries, birthdays, and date nights</li>
                <li>Concerts and shows in Oakland, San Francisco, and San Jose</li>
                <li>Sporting events across the Bay Area</li>
                <li>Proms, graduations, and school formals</li>
                <li>Wine country day trips to Napa, Sonoma, and Livermore</li>
                <li>Group outings and family celebrations</li>
                <li>Medical appointments and other trips where a steady, patient driver helps</li>
              </ul>

              <p>
                Tell us the occasion when you book. A wedding schedule, a
                concert letting out at midnight, and a full-day wine tour each
                need a different plan, and we will build the timing around
                yours.
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
                src="https://www.blacarklimo.com/assets/images/unnamed (7).jpg"
                alt="Luxury black car for private chauffeur transportation"
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

        {/* AREAS */}
        <section className="section">
          <div className="container two-column">
            <div className="image-card">
              <img
                src="https://www.blacarklimo.com/assets/images/unnamed (8).jpg"
                alt="Luxury vehicle serving San Lorenzo and Northern California"
              />
            </div>

            <div>
              <span className="section-label">LOCAL SERVICE AREA</span>

              <h2>Areas We Serve</h2>

              <p>
                Our office is in San Lorenzo, so local pickups are quick to
                arrange. Our San Lorenzo chauffeur service also provides
                private transportation to nearby East Bay communities including
                San Leandro, Hayward, Castro Valley, Oakland, Alameda, Union
                City, and Fremont.
              </p>

              <p>
                Beyond the immediate area, we handle longer trips throughout
                Northern California — San Francisco, the Peninsula, San Jose
                and the South Bay, the Tri-Valley and day trips to Napa,
                Sonoma, Monterey, and Sacramento. If your destination is not
                listed, call us, and we will tell you honestly whether we can
                cover it.
              </p>

              <p>
                We offer convenient pickup and drop-off throughout San Lorenzo
                and the surrounding East Bay, with the same service standards
                whether the ride is ten minutes or two hours.
              </p>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE */}
        <section className="section section-light">
          <div className="container">
            <div className="section-heading">
              <span className="section-label">WHY BLACARK LIMO</span>
              <h2>Why Choose Our Chauffeur Service?</h2>
            </div>

            <div className="why-grid">
              {[
                "Professional chauffeurs — licensed, insured, and presented the way you would expect for business or formal occasions",
                "Well-maintained vehicles — cleaned and checked before every trip",
                "Private, door-to-door transportation — no shared rides, no detours",
                "Convenient airport transfers — SFO, OAK, and SJC, planned around your flight",
                "Corporate accounts available — recurring bookings and simplified billing",
                "Flexible scheduling — early mornings, late nights, and multi-stop days",
                "Local knowledge — East Bay routes, traffic patterns, and airport terminals",
                "Straightforward booking — clear quotes and confirmed reservations",
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

        {/* HOW TO BOOK */}
        <section className="section">
          <div className="container">
            <div className="section-heading center">
              <span className="section-label">SIMPLE BOOKING</span>
              <h2>How to Book Your San Lorenzo Chauffeur</h2>
            </div>

            <div className="steps">
              <div className="step">
                <span className="step-number">01</span>
                <h3>Request a Quote</h3>
                <p>
                  Share your pickup location, destination, date, and time by
                  phone or through our online form.
                </p>
              </div>

              <div className="step">
                <span className="step-number">02</span>
                <h3>Choose Your Vehicle</h3>
                <p>
                  Pick the option that suits your passenger count, luggage,
                  and occasion. We are happy to recommend one.
                </p>
              </div>

              <div className="step">
                <span className="step-number">03</span>
                <h3>Confirm Your Ride</h3>
                <p>
                  You will receive a booking confirmation with your chauffeur
                  and pickup details.
                </p>
              </div>

              <div className="step">
                <span className="step-number">04</span>
                <h3>Enjoy Your Journey</h3>
                <p>
                  Your chauffeur arrives at the scheduled time and takes it
                  from there.
                </p>
              </div>
            </div>

            <div className="booking-note">
              <p>
                For airport departures and weekend events, booking a few days
                ahead is best. Same-day requests are welcome, and we will tell
                you right away whether a vehicle is available.
              </p>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="final-cta" id="book">
          <div className="final-cta-image" />

          <div className="container final-cta-content">
            <span className="section-label light-label">READY TO RIDE?</span>

            <h2>Book Your Ride in San Lorenzo Today</h2>

            <p>
              Whether you need an early flight to SFO, a chauffeur for a day of
              meetings, or a car for an evening you want to remember, Blacark
              Limo is ready to take the trip off your to-do list.
            </p>

            <p className="strong">
              Call now or request your quote online — we will confirm your
              chauffeur and pricing before you book.
            </p>

            <div className="hero-buttons">
              <a
                href="mailto:blacarklimo@gmail.com"
                className="btn btn-primary"
              >
                Get Your Free Quote
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
              <h2>Frequently Asked Questions</h2>
              <p>
                Answers to common questions about our San Lorenzo chauffeur
                service, airport transportation, vehicles, booking, and
                pricing.
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
              <h3>Ready for a Private Ride in San Lorenzo?</h3>
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
