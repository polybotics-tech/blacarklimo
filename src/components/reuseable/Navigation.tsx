"use client";

import constants from "@/src/libs/constants";
import { ArrowRight, ChevronLeft, Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const DefaultNavigation = () => {
  //--hooks
  const curPath = usePathname();

  //--states
  const [isMobileNavOpen, setIsMobileNavOpen] = React.useState<boolean>(false);

  //--variables
  const isBookingPage: boolean = curPath === "/booking";
  const navigationPaths: { name: string; url: string }[] = [
    { name: "Home", url: "/" },
    { name: "About Us", url: "/about" },
    { name: "Our Fleet", url: "/fleet" },
  ];

  return (
    <>
      <nav className="w-full  sticky top-0 left-0 z-50 bg-pri-bg/70 backdrop-blur-sm">
        <div className="w-full max-w-5xl mx-auto py-4 md:py-2 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <Link href={"/"}>
            <div className="flex items-center gap-1">
              <div className="w-5 h-5 rounded-sm bg-pri-gold"></div>
              <h4>
                Blacark<span className="text-sec-gold">limo</span>
              </h4>
            </div>
          </Link>

          <ul className="hidden sm:flex items-center gap-6">
            {navigationPaths.map((nav, idx) => {
              const isActive = curPath === nav.url;

              return (
                <li key={idx}>
                  <Link href={nav.url}>
                    <p
                      className={`${isActive ? "font-medium text-sec-gold" : "hover:text-pri-text"}`}
                    >
                      {nav.name}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden sm:flex items-center gap-2">
            <Link
              href={`tel:${constants.companyPhone}`}
              className="flex items-center gap-1 bg-transparent group"
            >
              <Phone
                size={14}
                strokeWidth={1.3}
                className="text-sec-text group-hover:text-pri-text"
              />
              <p className="text-[9px] group-hover:text-pri-text">
                {constants.companyPhone}
              </p>
            </Link>

            {!isBookingPage && (
              <Link
                href={"/booking"}
                className="hidden md:flex px-8 py-2 rounded-3xl bg-pri-text hover:bg-sec-text text-pri-bg text-xs font-medium"
              >
                Book A Ride
              </Link>
            )}
          </div>

          {/**MOBILE NAVIGATION BUTTON */}
          <button
            className="w-6 h-6 sm:hidden"
            onClick={() => setIsMobileNavOpen((prev) => !prev)}
          >
            {isMobileNavOpen ? (
              <X
                size={24}
                strokeWidth={1.3}
                className="text-sec-text hover:text-pri-text"
              />
            ) : (
              <Menu
                size={24}
                strokeWidth={1.3}
                className="text-sec-text hover:text-pri-text"
              />
            )}
          </button>
        </div>

        {/**MOBILE NAV BAR */}
        <div
          className={`sm:hidden w-full ${isMobileNavOpen ? "max-h-96" : "max-h-0"} overflow-hidden transition-all ease-in-out duration-300 absolute top-14 left-0 z-5 bg-pri-bg/95`}
        >
          <ul className="flex flex-col items-center gap-8 py-8 ">
            {navigationPaths.map((nav, idx) => {
              const isActive = curPath === nav.url;

              return (
                <li key={idx}>
                  <Link
                    href={nav.url}
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    <p className={`${isActive && "font-medium text-sec-gold"}`}>
                      {nav.name}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>

          <p className="text-center text-dim-text text-[10px] py-4 border-t border-dim-text border-dashed">
            Blacarklimo is proudly operated by Ark Limo.
          </p>
        </div>
      </nav>

      {/**MOBILE ACTION BUTTON */}
      {!isBookingPage && (
        <div className="w-full py-2 px-4 sm:py-4 flex items-center justify-center gap-2 fixed bottom-0 left-0 z-50 bg-pri-bg/90 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none md:hidden">
          <Link
            href={`tel:${constants.companyPhone}`}
            className=" sm:hidden w-10 h-10 rounded-full bg-card-bg flex items-center justify-center"
          >
            <Phone size={18} strokeWidth={1.3} className="text-pri-text" />
          </Link>

          <Link
            href={"/booking"}
            className="h-10 rounded-full flex flex-1 sm:flex-none items-center justify-center gap-2 bg-pri-text sm:bg-pri-gold sm:border sm:border-pri-bg sm:w-2/5 sm:drop-shadow-shadow-glow sm:drop-shadow-xl"
          >
            <p className="font-medium text-pri-bg">Book A Ride</p>

            <ArrowRight size={18} strokeWidth={1.3} className="text-pri-bg" />
          </Link>
        </div>
      )}
    </>
  );
};

const BookingNavigation = ({ children }: BookingNavigationProps) => {
  //--hooks
  const router = useRouter();
  const curPath = usePathname();

  //--functions
  function goBack() {
    const isBookingPage: boolean = curPath === "/booking";

    if (isBookingPage) {
      router.replace("/");
    } else {
      router.replace("/booking");
    }
  }

  return (
    <main className="w-full h-dvh">
      <div className="w-full h-full relative">
        <button
          onClick={goBack}
          className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-card-bg hover:bg-sec-bg group centralize absolute top-4 md:top-6 left-4 md:left-6 z-10"
        >
          <ChevronLeft
            size={24}
            strokeWidth={1.8}
            className="text-sec-text group-hover:text-pri-text"
          />
        </button>

        {children}
      </div>
    </main>
  );
};

export { DefaultNavigation, BookingNavigation };

interface BookingNavigationProps {
  children: React.ReactNode;
}
