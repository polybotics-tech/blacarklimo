"use client";

import constants from "@/src/libs/constants";
import { ArrowUpRight, Check, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";

const ContactFormSection = () => {
  const contactInfo: {
    name: string;
    value: string;
    icon?: React.ReactNode;
    url: string;
  }[] = [
    {
      name: "Send An Email",
      value: constants.companyEmail,
      url: `mailto:${constants.companyEmail}`,
      icon: <Mail size={14} strokeWidth={1.3} className="text-pri-text" />,
    },
    {
      name: "Call Us Now",
      value: constants.companyPhone,
      url: `tel:${constants.companyPhone}`,
      icon: <Phone size={14} strokeWidth={1.3} className="text-pri-text" />,
    },
    {
      name: "Visit Our Location",
      value: constants.companyAddress,
      url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(constants.companyAddress)}`,
      icon: <MapPin size={14} strokeWidth={1.3} className="text-pri-text" />,
    },
  ];

  const qualities = [
    "Secure & Confidential Communication",
    "Personalized Travel Assistance",
    "Fast Response Time",
    "24/7 Customer Support",
    "Tranparent Booking Process",
    "Reliable Service Commitment",
    "Professional Reservation Specialists",
  ];

  //--states
  const [fullname, setFullname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [message, setMessage] = React.useState("");

  const [isSending, setIsSending] = React.useState(false);

  //--functions
  async function sendMessage() {
    if (!fullname) {
      toast.error("Provide a fullname");
      return;
    }

    if (!email) {
      toast.error("Provide an email");
      return;
    }

    if (!message) {
      toast.error("Provide a message/enquiry");
      return;
    }

    setIsSending(true);

    try {
      const response = await fetch("/api/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname,
          email,
          phone,
          message,
        }),
      });
      const data = await response.json();

      if (!response.ok || !data?.success) {
        toast.error(data?.message ?? "Something went wrong");
      }

      toast.success("Enquiry sent successfully");
      setFullname("");
      setEmail("");
      setPhone("");
      setMessage("");
      return;
    } catch (error) {
      toast.error(
        error instanceof Error ? error?.message : "Something went wrong",
      );
      return;
    } finally {
      setIsSending(false);
    }
  }

  return (
    <section
      about="Contact Us"
      id="contact-us"
      className="py-6 md:py-8 space-y-6"
    >
      <div className="w-full h-fit flex flex-col gap-6 md:flex-row md:gap-2 bg-card-bg rounded-2xl p-2">
        {/**contact info */}
        <div className="w-full md:w-1/2 p-4 flex flex-col justify-between gap-12 bg-pri-bg rounded-lg">
          <div className="flex flex-col gap-8">
            <div className="space-y-2">
              <h2>
                Get In <span className="text-pri-gold">Touch</span>
                <br />
                Let&apos;s Plan Your Journey
              </h2>

              <p>
                Have questions about our services or need help choosing the
                right vehicle? Our dedicated team is available to guide you
                through the booking process and ensure every detail of your
                journey is handled with care.
              </p>
            </div>

            <ul className="space-y-2">
              {qualities?.map((quality, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full centralize bg-pri-gold">
                    <Check
                      size={12}
                      strokeWidth={1.8}
                      className="text-pri-bg"
                    />
                  </div>

                  <p className="text-pri-text font-medium">{quality}</p>
                </li>
              ))}
            </ul>
          </div>

          <ul className="space-y-4">
            {contactInfo?.map((contact, idx) => (
              <li key={idx}>
                <Link href={contact.url} className="w-full flex gap-2 group">
                  <div className="w-8 h-8 centralize rounded-sm bg-card-bg">
                    {contact.icon}
                  </div>

                  <div className="flex flex-col flex-1 gap-0.5">
                    <p className="text-pri-text font-medium text-left group-hover:text-sec-gold">
                      {contact.name}
                    </p>
                    <p className="text-[10px] text-left group-hover:text-pri-text">
                      {contact.value}
                    </p>
                  </div>

                  <div className="w-6 h-6 rounded-full centralize">
                    <ArrowUpRight
                      size={14}
                      strokeWidth={1.8}
                      className="text-sec-text group-hover:text-pri-text"
                    />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/**contact form */}
        <div className="w-full flex flex-col md:flex-1 gap-4 px-2 pt-0 md:pt-4 pb-4">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="fullname"
              className="text-xs font-medium text-sec-text"
            >
              Full Name
              <span className="text-red-400"> *</span>
            </label>

            <input
              id="fullname"
              name="fullname"
              type="text"
              placeholder="eg. John Doe"
              className="w-full h-12 rounded-lg bg-pri-bg px-4 text-sm font-light placeholder:text-dim-text text-pri-text focus:outline focus:outline-sec-text"
              required
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="text-xs font-medium text-sec-text"
            >
              Email Address
              <span className="text-red-400"> *</span>
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="eg. yourmail@example.com"
              className="w-full h-12 rounded-lg bg-pri-bg px-4 text-sm font-light placeholder:text-dim-text text-pri-text focus:outline focus:outline-sec-text required:outline-red-400"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="phone"
              className="text-xs font-medium text-sec-text"
            >
              Phone Number
              <span className="text-dim-text text-[9px]"> (optional)</span>
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="eg. +1 (234) 567-890"
              className="w-full h-12 rounded-lg bg-pri-bg px-4 text-sm font-light placeholder:text-dim-text text-pri-text focus:outline focus:outline-sec-text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="message"
              className="text-xs font-medium text-sec-text"
            >
              How Can We Assist You?
              <span className="text-red-400"> *</span>
            </label>

            <textarea
              id="message"
              name="message"
              placeholder="Share your travel plans and any special requirements, and our team will assist you with a personalized solution"
              className="w-full h-50 rounded-lg bg-pri-bg p-4 text-sm font-light placeholder:text-dim-text text-pri-text focus:outline focus:outline-sec-text required:outline-red-400 resize-none"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <div className="mt-8">
            <button
              type="submit"
              disabled={isSending}
              onClick={sendMessage}
              className="w-full h-12 rounded-full centralize gap-2 bg-pri-text disabled:bg-sec-text group"
            >
              <p className="text-pri-bg group-disabled:text-sec-bg">
                {isSending ? "Sending..." : "Send Message"}
              </p>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { ContactFormSection };
