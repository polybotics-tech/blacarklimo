"use client";

import React from "react";
import { DefaultSectionHeader } from "../reuseable/SectionHeaderComponent";
import { TestimonialCard } from "../reuseable/CardComponent";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import { popularTestimonials } from "@/src/libs/testimonials";

const TestimonialSection = () => {
  //--refs
  const testimonialScrollerRef = React.useRef<HTMLDivElement>(null);

  //--functions
  function scrollTestimonial(direction: "left" | "right") {
    const testimonialScroller = testimonialScrollerRef.current;
    if (!testimonialScroller) return;

    const scrollDistance = Math.max(
      testimonialScroller.clientWidth * 0.85,
      280,
    );

    testimonialScroller.scrollBy({
      left: direction === "left" ? -scrollDistance : scrollDistance,
      behavior: "smooth",
    });
  }

  return (
    <section about="Testimonials" className="py-6 md:py-8 space-y-6">
      <div>
        <UsersPreviewGrid />

        <DefaultSectionHeader
          title="Testimonials"
          heading={
            <>
              Trusted By Elites <br />
              <span className="text-pri-gold">Great Remarks</span> From
              Executive Clients
            </>
          }
          subHeading="Our clients choose us for dependable luxury transportation, and a consistent first-class experience. Their 5-star reviews reflects the quality, care, and dedication we bring to every journey."
        />
      </div>

      <div className="space-y-4">
        <div
          ref={testimonialScrollerRef}
          className="flex gap-2 overflow-x-auto no-scrollbars"
        >
          {popularTestimonials?.map((testimonial, idx) => (
            <TestimonialCard key={idx} testimonial={testimonial} />
          ))}
        </div>

        <div className="w-full flex items-start justify-between gap-4">
          <div className="space-y-1">
            <p>
              <span className="font-semibold text-pri-text">5.0</span> rating
              based on 3,792 reviews
            </p>

            <div className="flex items-end gap-2">
              <p>from</p>
              <div className="flex items-center gap-1">
                <div className="w-5 h-5 rounded-sm bg-success centralize">
                  <Star
                    size={14}
                    strokeWidth={1.3}
                    className="text-pri-text fill-pri-text"
                  />
                </div>
                <h4 className="font-semibold">Trustpilot</h4>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 max-[380px]:hidden">
            <button
              onClick={() => scrollTestimonial("left")}
              className="w-6 h-6 rounded-full border border-sec-text hover:border-pri-text centralize"
            >
              <ArrowLeft
                size={14}
                strokeWidth={1.3}
                className="text-sec-text hover:text-pri-text"
              />
            </button>

            <button
              onClick={() => scrollTestimonial("right")}
              className="w-6 h-6 rounded-full border border-sec-text hover:border-pri-text centralize"
            >
              <ArrowRight
                size={14}
                strokeWidth={1.3}
                className="text-sec-text hover:text-pri-text"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;

const UsersPreviewGrid = () => {
  //--states
  const [cardWidth, setCardWidth] = React.useState<number>(0);
  const [hRatio, setHRatio] = React.useState<number>(0);
  const [marginT, setMarginT] = React.useState<number>(0);
  const [cards, setCards] = React.useState<{ h: number; preview: string[] }[]>(
    [],
  );

  const gap = 8;

  //--effects
  React.useEffect(() => {
    function handleWindowsResize(win: Window) {
      const winWidth = win.innerWidth;

      //--
      const isLargeScreen = winWidth >= 1024;
      const isMediumScreen = winWidth >= 640;
      const isSmallScreen = winWidth < 480;

      const dummyCards =
        isLargeScreen || isMediumScreen
          ? [
              {
                h: 80,
                preview: [
                  "",
                  "/assets/images/img13.jpg",
                  "/assets/images/img11.jpg",
                ],
              },
              {
                h: 50,
                preview: [
                  "",
                  "/assets/images/img6.jpg",
                  "/assets/images/img2.jpg",
                ],
              },
              {
                h: 100,
                preview: ["", "/assets/images/img19.jpg"],
              },
              { h: 50, preview: ["", "/assets/images/img27.jpg"] },
              {
                h: 80,
                preview: ["", "/assets/images/img25.jpg"],
              },
              { h: 50, preview: ["", "/assets/images/img26.jpg"] },
              {
                h: 100,
                preview: ["", "/assets/images/img23.jpg"],
              },
              {
                h: 50,
                preview: [
                  "",
                  "/assets/images/img1.jpg",
                  "/assets/images/img4.jpg",
                ],
              },
              {
                h: 80,
                preview: [
                  "",
                  "/assets/images/img9.jpg",
                  "/assets/images/img10.jpg",
                ],
              },
            ]
          : [
              {
                h: 120,
                preview: [
                  "/assets/images/img25.jpg",
                  "/assets/images/img11.jpg",
                ],
              },
              {
                h: 60,
                preview: [
                  "/assets/images/img27.jpg",
                  "/assets/images/img2.jpg",
                ],
              },
              {
                h: 90,
                preview: [
                  "/assets/images/img20.jpg",
                  "/assets/images/img19.jpg",
                ],
              },
              {
                h: 60,
                preview: [
                  "/assets/images/img26.jpg",
                  "/assets/images/img4.jpg",
                ],
              },
              {
                h: 120,
                preview: [
                  "/assets/images/img23.jpg",
                  "/assets/images/img10.jpg",
                ],
              },
            ];
      setCards(dummyCards);

      const numOfCardsPerRow = dummyCards.length;
      const mainPadding = isLargeScreen ? 32 : isMediumScreen ? 24 : 16;

      const containerWidth = isLargeScreen
        ? 1024 - Number(mainPadding * 2)
        : winWidth - Number(mainPadding * 2);

      const cW =
        Number(containerWidth - Number((numOfCardsPerRow - 1) * gap)) /
        numOfCardsPerRow;
      setCardWidth(cW);

      const hR = isLargeScreen
        ? 1
        : isMediumScreen
          ? 0.85
          : isSmallScreen
            ? 0.75
            : 0.9;
      setHRatio(hR);

      setMarginT(isLargeScreen ? -24 : isMediumScreen ? -16 : -8);
    }

    handleWindowsResize(window); //-- first render
    window.addEventListener("resize", function (this) {
      handleWindowsResize(this);
    });

    return () =>
      window.removeEventListener("resize", function (this) {
        handleWindowsResize(this);
      });
  }, []);

  return (
    <div className="flex relative" style={{ gap: gap, marginBottom: marginT }}>
      {cards?.map((cd, idx) => {
        const preview = cd.preview;

        return (
          <div
            key={idx}
            className="flex flex-col"
            style={{
              gap: gap,
              width: cardWidth,
            }}
          >
            {preview?.map((uri, idx) => {
              const isFirst = idx === 0;
              const hasUri = Boolean(uri);

              return (
                <div
                  key={idx}
                  className="bg-sec-bg/50 rounded-lg overflow-hidden relative"
                  style={{
                    width: cardWidth,
                    height: isFirst ? cd.h * hRatio : 140 * hRatio,
                  }}
                >
                  {hasUri && (
                    <Image
                      src={uri}
                      alt="testimonial-preview-image"
                      sizes="140px"
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
