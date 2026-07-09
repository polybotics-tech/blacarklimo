"use client";

import {
  BookingGuideType,
  FaqsType,
  LocationType,
  TestimonialType,
  VehicleType,
} from "@/src/libs/types";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  CircleDot,
  Luggage,
  MapPin,
  Star,
  User2,
  Users2,
  Verified,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const FleetDefaultCard = ({
  inWrapLayout = false,
  vehicle,
}: FleetDefaultCardProps) => {
  //--variables
  const isPremium = vehicle.class === "premium";
  const isExecutive = vehicle.class === "executive";

  const specifications = [
    `No. of Passengers: ${vehicle.numOfPassenger}`,
    `No. of Luggages: ${vehicle.numOfLuggage}`,
    `Price per Hour: $${vehicle.pricePerHour}`,
    `Price per Mile: $${vehicle.pricePerMile}`,
  ];
  return (
    <div
      className={`${inWrapLayout ? "w-full min-w-full min-[548px]:min-w-62.5 min-[548px]:max-w-62.5 sm:min-w-70 sm:w-70 sm:max-w-70 md:min-w-72 md:w-72 md:max-w-72 lg:min-w-75 lg:w-75 lg:max-w-75" : "w-[90%] min-w-[90%] max-[480px]:min-w-[90%] min-[480px]:min-w-[70%] sm:min-w-96 max-w-96"} h-52 bg-card-bg rounded-2xl relative`}
    >
      <div className="absolute top-0 left-0 z-10 p-3">
        <h4 className="text-pri-text text-sm font-semibold">{vehicle.name}</h4>
        <div className="flex flex-col gap-1">
          <p className="text-sec-text">
            <span className="font-semibold text-pri-text">
              ${vehicle.pricePerHour}
            </span>
            /hour
          </p>

          {Boolean(isPremium || isExecutive) && (
            <div
              className={`${isPremium ? "bg-[#2A2414] border-[rgba(212,175,55,0.35)]" : "bg-[#1B2A41] border-[#34507A]"} border w-fit rounded-full py-0.5 px-1.5`}
            >
              <p
                className={`font-medium uppercase text-[10px] ${isPremium ? "text-[#D4AF37]" : "text-[#AFCBFF]"}`}
              >
                {vehicle.class}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 z-10 w-full p-3 flex justify-between">
        <div className="flex items-center gap-2 relative group hover:cursor-pointer">
          <div className="flex items-center gap-0.5">
            <p className="text-sm text-pri-text font-medium">
              {vehicle.numOfPassenger}
            </p>
            <Users2 size={14} strokeWidth={1.8} className="text-sec-text" />
          </div>

          <div className="h-2 w-[0.5px] bg-dim-text"></div>

          <div className="flex items-center gap-0.5">
            <Luggage size={14} strokeWidth={1.8} className="text-sec-text" />
            <p className="text-sm text-pri-text font-medium">
              {vehicle.numOfLuggage}
            </p>
          </div>

          {/**specifications on hover */}
          <div className="absolute z-5 bottom-8 left-0 w-35 bg-card-bg p-2 rounded-md hidden group-hover:flex flex-col gap-1 card-glow">
            <p className="text-sec-gold font-medium">Specifications</p>
            <ul className="space-y-0.5">
              {specifications.map((spec, idx) => (
                <li key={idx} className="flex items-center gap-1">
                  <CheckCircle
                    size={10}
                    strokeWidth={1.3}
                    className="text-sec-gold"
                  />
                  <span className="text-[9px] text-sec-text font-light font-poppins">
                    {spec}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Link
          href={`/booking/?vehicle_id=${vehicle.id}`}
          id={`button-${vehicle.id}`}
          className="flex items-center gap-2 bg-pri-text hover:bg-sec-text py-1 pr-1 pl-4 rounded-full group"
        >
          <p className="text-sec-bg group-hover:text-pri-bg">Book Vehicle</p>
          <div className="w-6 h-6 flex items-center justify-center rounded-full bg-sec-bg group-hover:bg-pri-bg">
            <ArrowUpRight
              size={16}
              strokeWidth={1.3}
              className="text-pri-text"
            />
          </div>
        </Link>
      </div>

      {Boolean(vehicle.uri) && (
        <div className="absolute top-0 left-0 z-3 w-full h-full centralize">
          <div className="overflow-hidden relative w-65 h-36.5">
            <Image
              src={vehicle.uri}
              alt="fleet-image"
              width={260}
              height={146}
              sizes="1920px"
              loading="eager"
              className="object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
};

const BookingGuideCard = ({
  tag,
  title,
  desc,
  list,
  icon,
  containerClass,
  isBgPrimary,
}: BookingGuideType & BookingGuideCardProps) => {
  return (
    <div
      className={`p-4 rounded-2xl space-y-4 ${isBgPrimary ? "bg-pri-gold" : "card-glow"} ${containerClass}`}
    >
      <div className="w-full flex items-center justify-between">
        <div>{icon}</div>

        <div
          className={`py-0.5 px-1.5 rounded-sm ${isBgPrimary ? "bg-card-bg" : "bg-pri-gold"}`}
        >
          <p
            className={`text-right font-medium text-[10px] ${isBgPrimary ? "text-sec-gold" : "text-pri-bg"}`}
          >
            {tag}
          </p>
        </div>
      </div>

      <div className="space-y-0.5">
        <h4
          className={`${isBgPrimary ? "text-pri-bg font-bold" : "text-sec-gold"}`}
        >
          {title}
        </h4>
        <p className={`${isBgPrimary ? "text-sec-bg" : "text-sec-text"}`}>
          {desc}
        </p>
      </div>

      {list?.length && (
        <ul className="space-y-2">
          {list?.map((li, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <Verified
                size={14}
                strokeWidth={1.3}
                className={`${isBgPrimary ? "text-pri-bg" : "text-sec-gold"}`}
              />
              <p className={`${isBgPrimary ? "text-sec-bg" : "text-sec-text"}`}>
                {li}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  const rating = [1, 2, 3, 4, 5];

  return (
    <div className="w-[90%] max-[480px]:min-w-[90%] min-[480px]:min-w-[70%] sm:min-w-96 max-w-96 rounded-2xl bg-card-bg p-4 flex flex-col justify-between gap-6">
      {/**STARS RATINGS */}
      <div className="flex items-center gap-1">
        {rating?.map((rt, idx) => {
          return (
            <div
              key={idx}
              className="w-4 h-4 rounded-xs bg-success flex items-center justify-center"
            >
              <Star
                size={14}
                strokeWidth={1.3}
                className="text-pri-text fill-pri-text"
              />
            </div>
          );
        })}
      </div>

      {/**COMMENT */}
      <p>{testimonial.comment}</p>

      {/**USER */}
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-full bg-sec-bg centralize">
          <User2 size={18} strokeWidth={1.3} className="text-dim-text" />
        </div>

        <div className="space-y-0.5">
          <p className="text-[11px] font-medium text-pri-text">
            {testimonial.user.fullname}
          </p>
          <p className="text-[9px]">
            posted on{" "}
            <span className="text-success capitalize">
              {testimonial.postOn}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

const FaqCard = ({ question, answer, foundHelpfulBy }: FaqsType) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="w-full">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full py-3 flex items-center justify-between gap-4"
      >
        <h4 className="text-sm text-left flex flex-1">{question}</h4>

        {isOpen ? (
          <ChevronUp size={18} strokeWidth={1.3} className="text-sec-text" />
        ) : (
          <ChevronDown size={18} strokeWidth={1.3} className="text-sec-text" />
        )}
      </button>

      <div
        className={`w-full px-3 bg-pri-bg rounded-lg flex flex-col gap-2 transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-125  py-3" : "max-h-0"}`}
      >
        <p>{answer}</p>

        <div
          className={`${!foundHelpfulBy && "hidden"} w-fit py-1 px-2 ml-auto rounded-full bg-sec-bg`}
        >
          <p className="text-[9px]">
            <span className="text-pri-text">{foundHelpfulBy}</span> found this
            helpful.
          </p>
        </div>
      </div>
    </div>
  );
};

const LongServiceCard = ({
  title,
  desc,
  isInverted = false,
  points,
  photo_uri,
}: ServiceCardProps & LongServiceCardProps) => {
  return (
    <div
      className={`w-full md:w-auto md:min-w-1/2 md:flex-1 h-80 max-md:h-auto p-4 rounded-2xl flex ${isInverted ? "flex-row-reverse max-md:flex-col" : "flex-row max-md:flex-col-reverse"}  gap-4 card-glow`}
    >
      <div className="flex flex-1 flex-col justify-between gap-12">
        <div className="space-y-4">
          <div className="w-8 h-8 rounded-full bg-pri-gold centralize">
            <ArrowUpRight size={18} strokeWidth={2.3} className="text-sec-bg" />
          </div>

          <h4 className="text-sec-gold font-semibold">{title}</h4>

          <p>{desc}</p>
        </div>

        <ul className="w-full space-y-2">
          {points?.map((point, idx) => (
            <li key={idx} className="flex items-start gap-1">
              <div className="w-2.5 h-2.5 rounded-xs bg-sec-text centralize">
                <Check size={10} strokeWidth={1.8} className="text-sec-bg" />
              </div>

              <p className="text-[10px]">{point}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full md:w-2/5 h-84 md:h-full rounded-xl bg-sec-bg overflow-hidden relative">
        <Image
          src={photo_uri}
          alt="service-image"
          fill
          sizes="240px"
          className="object-cover"
        />
      </div>
    </div>
  );
};

const ShortServiceCard = ({
  title,
  desc,
  link,
}: ServiceCardProps & ShortServiceCardProps) => {
  return (
    <div className="max-md:flex-1 md:w-1/3 h-80 max-md:h-auto p-4 rounded-2xl flex flex-col justify-between gap-12 bg-pri-gold">
      <div className="space-y-4">
        <div className="w-8 h-8 rounded-full bg-card-bg centralize">
          <ArrowUpRight size={18} strokeWidth={2.3} className="text-pri-gold" />
        </div>

        <h4 className="text-card-bg font-semibold">{title}</h4>
      </div>

      <div className="space-y-4">
        <p className="text-sec-bg">{desc}</p>

        {Boolean(link) && (
          <Link
            href={"/booking"}
            className="py-2 px-5 rounded-full bg-card-bg centralize gap-2"
          >
            <p>{link?.text}</p>
            <ArrowRight size={14} strokeWidth={1.3} className="text-sec-text" />
          </Link>
        )}
      </div>
    </div>
  );
};

const SummaryLocationCard = ({
  location,
  isLast,
  isStop,
  markerColor,
}: SummaryLocationCardProps) => {
  const icon = isStop ? (
    <CircleDot
      size={24}
      strokeWidth={1}
      fill={markerColor}
      className="text-pri-text"
    />
  ) : (
    <MapPin
      size={24}
      strokeWidth={1}
      fill={markerColor}
      className="text-pri-text"
    />
  );

  return (
    <div className="w-full flex items-start gap-2">
      <div className="flex flex-col items-center gap-2">
        <div>{icon}</div>
        {!isLast && (
          <div className="w-0 h-6 border-l border-dashed border-l-dim-text" />
        )}
      </div>

      <div>
        {Boolean(location?.name) && (
          <h4 className="text-[13px]">{location?.name}</h4>
        )}
        <p className="text-[10px]">{location?.address}</p>
      </div>
    </div>
  );
};

export {
  FleetDefaultCard,
  BookingGuideCard,
  TestimonialCard,
  FaqCard,
  LongServiceCard,
  ShortServiceCard,
  SummaryLocationCard,
};

interface FleetDefaultCardProps {
  inWrapLayout?: boolean;
  vehicle: VehicleType;
}

interface BookingGuideCardProps {
  icon?: React.ReactNode;
  tag: string;
  isBgPrimary?: boolean;
  containerClass?: string;
}

interface ServiceCardProps {
  title?: string;
  desc?: string;
}

interface ShortServiceCardProps {
  link?: { text: string; url?: string };
}

interface LongServiceCardProps {
  isInverted?: boolean;
  points: string[];
  photo_uri: string;
}

interface TestimonialCardProps {
  testimonial: TestimonialType;
}

interface SummaryLocationCardProps {
  location: LocationType;
  isLast?: boolean;
  isStop?: boolean;
  markerColor?: string;
}
