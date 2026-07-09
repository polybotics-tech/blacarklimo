"use client";

import constants from "@/src/libs/constants";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import React from "react";

const DefaultFooter = () => {
  //--states
  const [email, setEmail] = React.useState("");

  //--variables
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "About Us", url: "/about" },
    { name: "Our Fleet", url: "/fleet" },
    { name: "Contact Supprt", url: "/about/#contact-us" },
  ];

  //--functions
  function subscribeToNewsletter() {}

  return (
    <footer className="px-4 sm:px-6 lg:px-8 pt-4 max-md:pb-16 sm:pt-6 lg:pt-8 pb-4 bg-sec-bg">
      <div className="w-full max-w-5xl mx-auto space-y-4 md:space-y-8">
        <div className="w-full flex flex-col-reverse gap-8 md:flex-row md:justify-between">
          <div className="w-full md:w-1/2">
            <div className="space-y-8">
              <div className="space-y-1">
                <h3>
                  Blacark<span className="text-pri-gold">limo</span>
                </h3>

                <div className="mb-4">
                  <p>
                    {constants.companyEmail}
                    {"  ·  "}
                    {constants.companyAddress}
                  </p>
                </div>

                <p>
                  Our mission is to ensure you experience the luxury of a
                  premium chauffeur services at an affordable price.
                </p>
              </div>

              <ul className="flex items-center gap-4">
                {quickLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link href={link.url}>
                      <p className="text-pri-text font-medium">{link.name}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="w-full md:w-1/3 md:pl-4 space-y-4">
            <div className="w-full flex flex-col gap-1">
              <h4 className="text-center md:text-right">Join Our Newsletter</h4>
              <p className="text-center md:text-right">
                Don&apos;t miss out on exclusive offers and updates. Subscribe
                today to remain up-to-date.
              </p>
            </div>

            {/**SUBSCRIBE TO NEWSLETTER */}
            <form className="w-full p-2 pl-4 flex items-center gap-4 rounded-full bg-pri-bg">
              <input
                type="text"
                placeholder="Your email address"
                name="email"
                id="email"
                className="flex flex-1 placeholder:text-dim-text text-pri-text text-xs"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="h-8 px-4 rounded-full bg-pri-text"
              >
                <p className="text-pri-bg text-[10px] font-semibold">
                  Subscribe
                </p>
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 border-t-[0.3px] border-t-sec-text pt-2">
          <p className="">
            &copy; {currentYear} Blacarklimo. All Rights Reserved By Ark Limo.
          </p>

          <FooterSocials />
        </div>
      </div>
    </footer>
  );
};

export { DefaultFooter };

const FooterSocials = () => {
  const socials = [
    {
      icon: <Facebook size={14} strokeWidth={1.3} className="text-sec-text" />,
      url: "",
    },
    {
      icon: <Instagram size={14} strokeWidth={1.3} className="text-sec-text" />,
      url: "",
    },
    {
      icon: <Linkedin size={14} strokeWidth={1.3} className="text-sec-text" />,
      url: "",
    },
  ];

  return (
    <div className="flex items-center gap-3">
      {socials?.map((sc, idx) => (
        <div
          key={idx}
          className="w-6 h-6 rounded-full bg-card-bg flex items-center justify-center"
        >
          {sc.icon}
        </div>
      ))}
    </div>
  );
};
