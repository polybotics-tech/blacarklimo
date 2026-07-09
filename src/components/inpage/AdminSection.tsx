"use client";

import {
  formatDateFromISO,
  formatDateTimeFromISO,
  formatTimeFromISO,
} from "@/src/utils/datetime";
import {
  BookingOrderRecordType,
  DiscountRecordType,
  PaginationMetaType,
  TransactionRecordType,
} from "@/src/utils/db/types";
import {
  calculateTravelDuration,
  formatCurrency,
} from "@/src/utils/estimations";
import {
  ChevronLeft,
  ChevronRight,
  CircleSlash2,
  Copy,
  LogOut,
  Mail,
  Phone,
  RefreshCcw,
  Search,
  Trash2,
  X,
} from "lucide-react";
import React from "react";
import { SummaryLocationCard } from "../reuseable/CardComponent";
import { LocationType } from "@/src/libs/types";
import constants from "@/src/libs/constants";
import Image from "next/image";
import Link from "next/link";
import { useDebounce } from "@/src/hooks/useDebounce";
import { useAppDispatch } from "@/src/hooks/useStore";
import { useRouter } from "next/navigation";
import { __Action_updateAdmin } from "@/src/utils/store/slice/adminSlice";
import { ToggleSwitch } from "../reuseable/FormComponents";
import toast from "react-hot-toast";

const HeaderComponent = () => {
  //--hooks
  const dispatch = useAppDispatch();
  const router = useRouter();

  //--functions
  function logout() {
    dispatch(__Action_updateAdmin({ accessToken: null, isLogged: false }));

    toast.success("Logged out");
    router.replace("/admin");
  }

  return (
    <div className="w-full p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-sec-bg border-b border-b-dim-text">
      <div className="space-y-0.5">
        <h4>Admin Dashboard</h4>
        <p className="text-[10px]">
          Keep track of all booking and transaction records
        </p>
      </div>

      <button
        onClick={logout}
        className="py-2 px-4 max-sm:ml-auto rounded-lg centralize gap-2 bg-pri-bg group"
      >
        <p className="font-medium group-hover:text-red-400">Logout</p>
        <LogOut
          size={14}
          strokeWidth={1.3}
          className="text-sec-text group-hover:text-red-400"
        />
      </button>
    </div>
  );
};

const RecordsComponent = () => {
  //--states
  const [isManageDiscountOpen, setIsManageDiscountOpen] = React.useState(false);
  const [searchQ, setSearchQ] = React.useState("");
  const [activeSection, setActiveSection] = React.useState("bookings");

  const [records, setRecords] = React.useState<
    BookingOrderRecordType[] | TransactionRecordType[]
  >([]);
  const [isFetchingRecords, setIsFetchingRecords] = React.useState(false);
  const [metaData, setMetaData] = React.useState<PaginationMetaType>({
    hasNextPage: false,
    hasPrevPage: false,
    page: 1,
    totalCount: 0,
    totalPage: 1,
  });
  const [errorMessage, setErrorMessage] = React.useState("");

  //--hooks
  const { debouncedValue } = useDebounce(searchQ, 500);

  //--variables
  const sections = ["bookings", "transactions"];

  const activeHeaders = React.useMemo(() => {
    const bookingRecordHeaders = [
      { name: "id", w: 300 },
      { name: "date", w: 200 },
      { name: "status", w: 150 },
      { name: "customer", w: 300 },
      { name: "type", w: 180 },
      { name: "vehicle", w: 350 },
    ];
    const transactionRecordHeaders = [
      { name: "id", w: 300 },
      { name: "date", w: 200 },
      { name: "amount", w: 150 },
      { name: "status", w: 150 },
      { name: "method", w: 180 },
      { name: "booking id", w: 300 },
    ];

    if (activeSection === "bookings") {
      return bookingRecordHeaders;
    } else {
      return transactionRecordHeaders;
    }
  }, [activeSection]);

  //--functions
  async function handleSectionChange(section: string) {
    setRecords([]);
    setMetaData({
      hasNextPage: false,
      hasPrevPage: false,
      page: 1,
      totalCount: 0,
      totalPage: 1,
    });

    setTimeout(() => {
      setActiveSection(section);
    }, 500);
  }

  async function fetchRecords(page: number, query = "") {
    if (isFetchingRecords) return;

    setIsFetchingRecords(true);
    setErrorMessage("");

    try {
      if (activeSection === "bookings") {
        const response = await fetch(
          `/api/booking/orders/?page=${page}&query=${query}`,
        );
        const data = await response.json();

        if (!response.ok || !data?.success) {
          setErrorMessage(data?.message ?? "Unable to load booking orders.");
        }

        setRecords(data.data?.orders);
        setMetaData(data.data?.meta);
      }

      if (activeSection === "transactions") {
        const response = await fetch(
          `/api/paypal/transactions/?page=${page}&query=${query}`,
        );
        const data = await response.json();

        if (!response.ok || !data?.success) {
          setErrorMessage(data?.message ?? "Unable to load transactions.");
        }

        setRecords(data.data?.transactions);
        setMetaData(data.data?.meta);
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error?.message : "Something went wrong",
      );
    } finally {
      setIsFetchingRecords(false);
    }
  }

  //--effects
  React.useEffect(() => {
    const updateRecords = async () => await fetchRecords(1, debouncedValue);
    updateRecords();
  }, [activeSection, debouncedValue]);

  return (
    <div className="py-4 sm:px-4 w-full flex flex-1 flex-col">
      {/**sections */}
      <div className="w-full max-sm:px-4 flex flex-col-reverse sm:flex-row sm:items-end justify-between gap-4">
        <div className="flex gap-2">
          {sections.map((section, idx) => {
            const isActive = section === activeSection;

            return (
              <button
                key={idx}
                onClick={() => handleSectionChange(section)}
                disabled={isFetchingRecords}
                className={`${isActive ? "bg-pri-bg" : "bg-transparent"} rounded-t-lg py-2 px-4`}
              >
                <p
                  className={`uppercase font-medium text-[10px] ${isActive ? "text-pri-text" : "text-dim-text"}`}
                >
                  {section}
                </p>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => setIsManageDiscountOpen(true)}
          className="h-8 px-4 max-sm:ml-auto sm:mb-4 rounded-full bg-pri-text hover:bg-sec-text"
        >
          <p className="font-medium text-[10px] text-sec-bg">
            Manage Discount Codes
          </p>
        </button>
      </div>

      {/**display */}
      <div className="w-full p-4 flex sm:flex-1 flex-col gap-4 bg-pri-bg sm:rounded-b-2xl sm:rounded-tr-2xl">
        <div className="w-full max-w-135 h-10 mt-4 px-4 bg-card-bg border border-dim-text rounded-lg flex items-center gap-2">
          <div className="w-4.5 centralize">
            <Search size={16} strokeWidth={1.3} className="text-sec-text" />
          </div>
          <div className="h-full flex flex-1">
            <input
              type="text"
              placeholder={`Paste ${activeSection} ID to search`}
              className="flex flex-1 text-pri-text placeholder:text-dim-text text-xs"
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
            />
          </div>

          {Boolean(searchQ) && (
            <button onClick={() => setSearchQ("")} className="w-4.5">
              <X size={16} strokeWidth={1.3} className="text-pri-text" />
            </button>
          )}
        </div>

        {/**results */}
        <div className="w-full h-full overflow-x-auto pb-4 pt-0 flex flex-col flex-1 gap-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-sec-text">
          {isFetchingRecords ? (
            <div className="w-full h-[50vh] centralize">
              <div className="w-12 h-12 rounded-full border-2 border-b-0 border-r-0 border-sec-text animate-spin" />
            </div>
          ) : (
            <>
              {Boolean(records.length) ? (
                <>
                  {/**HEADER */}
                  <ul className="w-fit flex items-center gap-1">
                    {activeHeaders.map((header, idx) => (
                      <li
                        key={idx}
                        className="h-8 px-2 bg-card-bg centralize"
                        style={{
                          width: header.w,
                          minWidth: header.w,
                        }}
                      >
                        <p className="text-center font-semibold text-pri-text uppercase">
                          {header.name}
                        </p>
                      </li>
                    ))}
                  </ul>

                  {/**LIST */}
                  {records?.map((record, idx) =>
                    activeSection === "bookings" ? (
                      <BookingRecordComponent
                        key={idx}
                        record={record as BookingOrderRecordType}
                      />
                    ) : (
                      <TransactionComponent
                        key={idx}
                        record={record as TransactionRecordType}
                      />
                    ),
                  )}
                </>
              ) : (
                <div className="w-full h-full centralize flex-col gap-6">
                  <CircleSlash2
                    size={64}
                    strokeWidth={0.5}
                    className="text-sec-text"
                  />

                  <div className="space-y-1">
                    <h4 className="text-center text-sec-text">
                      {errorMessage
                        ? "Oops! Something Went Wrong"
                        : "No Records Found"}
                    </h4>
                    <p className="text-center text-dim-text">
                      {errorMessage
                        ? errorMessage
                        : `It seems there were no ${activeSection} found.`}
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/**pagination */}
        <div className="w-full px-4 pb-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <p className="text-[10px]">
              Showing page {metaData.page} of {metaData.totalPage}
            </p>

            <button
              onClick={() => fetchRecords(metaData.page)}
              className="w-6 h-6 border border-dim-text rounded-lg"
            >
              <RefreshCcw
                size={12}
                strokeWidth={0.8}
                className="text-sec-text"
              />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => fetchRecords(Math.max(1, metaData.page - 1))}
              disabled={!metaData.hasPrevPage || isFetchingRecords}
              className="w-20 h-8 gap-1 rounded-lg bg-card-bg hover:bg-sec-bg disabled:bg-sec-bg group"
            >
              <ChevronLeft
                size={16}
                strokeWidth={1.8}
                className="text-pri-text group-disabled:text-dim-text"
              />
              <p className="font-medium text-pri-text group-disabled:text-dim-text">
                Prev
              </p>
            </button>

            <button
              onClick={() =>
                fetchRecords(Math.min(metaData.page + 1, metaData.totalPage))
              }
              disabled={!metaData.hasNextPage || isFetchingRecords}
              className="w-20 h-8 gap-1 rounded-lg bg-card-bg hover:bg-sec-bg disabled:bg-sec-bg group"
            >
              <p className="font-medium text-pri-text group-disabled:text-dim-text">
                Next
              </p>
              <ChevronRight
                size={16}
                strokeWidth={1.8}
                className="text-pri-text group-disabled:text-dim-text"
              />
            </button>
          </div>
        </div>
      </div>

      {/**MANAGE DISCOUNT MODAL */}
      {isManageDiscountOpen && (
        <ManageDiscountModal onClose={() => setIsManageDiscountOpen(false)} />
      )}
    </div>
  );
};

export { HeaderComponent, RecordsComponent };

/**
 * id - date - status - name - type - vehicle
 */
const BookingRecordComponent = ({
  record,
}: {
  record: BookingOrderRecordType;
}) => {
  //--states
  const [isDetailsOpen, setIsDetailsOpen] = React.useState(false);

  //--variables
  const booking = record.booking;
  const charges = record.charges;

  const subtotal = charges.subtotal;
  const discount = charges.discount;
  const discountPercentage = charges.discountPercentage;
  const tax = charges.tax;
  const taxPercentage = charges.taxPercentage;
  const gratuity = charges.gratuity;
  const total = charges.total;
  const estimatedDistance = charges.estimatedDistance;

  return (
    <>
      <div
        onClick={() => setIsDetailsOpen(true)}
        className="w-fit min-w-fit flex items-center gap-1 cursor-pointer"
      >
        <div
          className="h-8 px-2 bg-sec-bg centralize"
          style={{ width: 300, minWidth: 300 }}
        >
          <p className="text-[11px]">{record.id}</p>
        </div>

        <div
          className="h-8 px-2 bg-sec-bg centralize"
          style={{ width: 200, minWidth: 200 }}
        >
          <p className="text-[11px]">
            {formatDateTimeFromISO(record.createdAt)}
          </p>
        </div>

        <div
          className="h-8 px-2 bg-sec-bg centralize"
          style={{ width: 150, minWidth: 150 }}
        >
          <p className="text-[11px]">{record.orderStatus}</p>
        </div>

        <div
          className="h-8 px-2 bg-sec-bg centralize"
          style={{ width: 300, minWidth: 300 }}
        >
          <p className="text-[11px] truncate">{record.booking.fullname}</p>
        </div>

        <div
          className="h-8 px-2 bg-sec-bg centralize"
          style={{ width: 180, minWidth: 180 }}
        >
          <p className="text-[11px]">{record.booking.tripChoice}</p>
        </div>

        <div
          className="h-8 px-2 bg-sec-bg centralize"
          style={{ width: 350, minWidth: 350 }}
        >
          <p className="text-[11px]">{record.booking.vehicle?.name}</p>
        </div>
      </div>

      {isDetailsOpen && (
        <div className="w-full h-full fixed top-0 left-0 z-50 bg-pri-bg/80 centralize p-4">
          <div
            onClick={() => setIsDetailsOpen(false)}
            className="absolute -z-1 w-full h-full"
          ></div>

          <div className="w-full max-w-135 h-full bg-card-bg flex flex-col gap-4">
            <div className="p-4">
              <p className="text-sec-gold text-center">
                Blacarklimo Chauffuer Services
              </p>
              <h4 className="text-center">Booking Receipt</h4>
            </div>

            <div className="w-full flex flex-col flex-1 gap-4 px-4 pb-4 sm:px-6 sm:pb-6 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-sec-text">
              {/**SUMMARY */}
              <ul className="w-full p-4 rounded-2xl bg-sec-bg space-y-2">
                {/**BOOKING ORDER */}
                <li className="w-full flex items-center justify-between gap-4">
                  <p className="text-sec-text">Trip Choice</p>

                  <p className="text-pri-text font-medium uppercase">
                    {booking.tripChoice}
                  </p>
                </li>

                <li className="w-full flex items-center justify-between gap-4">
                  <p className="text-sec-text">Subtotal</p>

                  <p className="text-pri-text font-medium uppercase">
                    $ {formatCurrency(subtotal)}
                  </p>
                </li>

                <li className="w-full flex items-center justify-between gap-4">
                  <p className="text-sec-text">
                    Tax{" "}
                    <span className="text-[10px] text-dim-text">
                      ({taxPercentage}%)
                    </span>
                  </p>

                  <p className="text-pri-text font-medium uppercase">
                    $ {formatCurrency(tax)}
                  </p>
                </li>

                {Boolean(discount) && (
                  <li className="w-full flex items-center justify-between gap-4">
                    <p className="text-sec-text">
                      Discount{" "}
                      <span className="text-[10px] text-dim-text">
                        ({discountPercentage}%)
                      </span>
                    </p>

                    <p className="text-pri-text font-medium uppercase">
                      $ {formatCurrency(discount)}
                    </p>
                  </li>
                )}

                <li className="w-full flex items-center justify-between gap-4">
                  <p className="text-sec-text">
                    Gratuity{" "}
                    <span className="text-[10px] text-dim-text">(Tip)</span>
                  </p>

                  <p className="text-pri-text font-medium uppercase">
                    $ {formatCurrency(gratuity)}
                  </p>
                </li>

                <li className="w-full flex items-center justify-between gap-4 pt-2 border-t border-dashed border-dim-text">
                  <h4 className="font-medium text-sec-text">Total</h4>

                  <h4 className="font-medium text-sec-gold">
                    $ {formatCurrency(total)}
                  </h4>
                </li>
              </ul>

              <div className="w-full h-0 border-t border-dashed border-t-dim-text" />

              {/**DEPATURE TIME AND DATE */}
              <div className="w-full flex items-center justify-between gap-4 p-4 bg-sec-bg">
                <div className="space-y-0.5">
                  <p className="text-[10px]">Date</p>
                  <h4 className="text-[13px]">
                    {formatDateFromISO(booking.datetime)}
                  </h4>
                </div>

                <div className="space-y-0.5">
                  <p className="text-[10px] text-right">Time</p>
                  <h4 className="text-[13px] text-right">
                    {formatTimeFromISO(booking.datetime)}
                  </h4>
                </div>
              </div>

              {/**PICKUP-STOPS-DROPOFF */}
              <div className="w-full space-y-2">
                <SummaryLocationCard
                  location={booking.pickupLocation as LocationType}
                  markerColor={constants.locationColor.pickup}
                />
                {Boolean(booking.extraStops.length) &&
                  booking.extraStops?.map((stop, idx) => (
                    <SummaryLocationCard
                      key={idx}
                      location={stop as LocationType}
                      isStop
                      markerColor={constants.locationColor.stops}
                    />
                  ))}
                <SummaryLocationCard
                  location={booking.dropoffLocation as LocationType}
                  isLast
                  markerColor={constants.locationColor.dropoff}
                />
              </div>

              {/**ESTIMATED DISTANCE AND DURATION */}
              <div className="w-full flex items-center justify-between gap-4 p-4 bg-sec-bg">
                <div className="space-y-0.5">
                  <p className="text-[10px]">Estimated Distance</p>
                  <h4 className="text-[13px]">
                    {estimatedDistance.toFixed(1)} Miles
                  </h4>
                </div>

                <div className="space-y-0.5">
                  <p className="text-[10px] text-center">Round Trip</p>
                  <h4 className="text-[13px] text-center">
                    {booking.isRoundTrip ? "Yes" : "No"}
                  </h4>
                </div>

                <div className="space-y-0.5">
                  <p className="text-[10px] text-right">Travel Duration</p>
                  <h4 className="text-[13px] text-right uppercase">
                    ~ {calculateTravelDuration(estimatedDistance)}
                  </h4>
                </div>
              </div>

              {/**CHOSEN VEHICLE */}
              {Boolean(booking.vehicle) && (
                <div className="centralize flex-col gap-2">
                  <div>
                    <Image
                      src={booking.vehicle?.uri as string}
                      alt="vehicle-image"
                      width={240}
                      height={135}
                      sizes="1920px"
                      loading="eager"
                      className="object-cover"
                    />
                  </div>
                  <h4 className="text-[13px] text-center">
                    {booking.vehicle?.name}
                  </h4>
                </div>
              )}

              {/**NUMBER OF PASSENGERS*/}
              <div className="w-full flex items-center justify-between gap-4 p-4 bg-sec-bg">
                <div className="space-y-0.5">
                  <p className="text-[10px]">Number of Passenger(s)</p>
                  <h4 className="text-[13px]">{booking.numOfPassenger}</h4>
                </div>

                <div className="space-y-0.5">
                  <p className="text-[10px] text-right">Luggage Capacity</p>
                  <h4 className="text-[13px] text-right">
                    ~ {booking.vehicle?.numOfLuggage}
                  </h4>
                </div>
              </div>

              {/**CONTACT INFORMATION & MESSAGE */}
              <ul className="w-full p-4 rounded-2xl bg-sec-bg space-y-2">
                <li className="w-full flex items-center justify-between gap-4 max-sm:gap-2">
                  <p className="text-sec-text">Name of Primary Passenger</p>

                  <p className="text-pri-text font-medium">
                    {booking.fullname}
                  </p>
                </li>

                <li className="w-full flex max-sm:flex-col items-center max-sm:items-start justify-between gap-4 max-sm:gap-2">
                  <p className="text-sec-text">Email Address</p>

                  <Link
                    href={`mailto:${booking.email}`}
                    className="flex items-center max-sm:w-full max-sm:justify-end gap-2"
                  >
                    <p className="text-pri-text font-medium truncate">
                      {booking.email}
                    </p>

                    <button className="py-1 px-2 rounded-lg bg-pri-bg hover:bg-card-bg">
                      <p className="text-sec-text">Send Email</p>
                      <Mail
                        size={14}
                        strokeWidth={1.3}
                        className="text-sec-text"
                      />
                    </button>
                  </Link>
                </li>

                <li className="w-full flex max-sm:flex-col items-center max-sm:items-start justify-between gap-4 max-sm:gap-2">
                  <p className="text-sec-text">Contact Phone Number</p>

                  <Link
                    href={`tel:${booking.phone}`}
                    className="flex items-center max-sm:w-full max-sm:justify-end gap-2"
                  >
                    <p className="text-pri-text font-medium truncate">
                      {booking.phone}
                    </p>

                    <button className="py-1 px-2 rounded-lg bg-pri-bg hover:bg-card-bg">
                      <p className="text-sec-text">Call Now</p>
                      <Phone
                        size={14}
                        strokeWidth={1.3}
                        className="text-sec-text"
                      />
                    </button>
                  </Link>
                </li>

                {Boolean(booking.message) && (
                  <li className="w-full flex items-start justify-between gap-4">
                    <p className="text-sec-text">Additional Information</p>

                    <p className="text-pri-text">{booking.message}</p>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

/**
 * id - date - amount - status - method - booking id
 */
const TransactionComponent = ({
  record,
}: {
  record: TransactionRecordType;
}) => {
  //--states
  const [isDetailsOpen, setIsDetailsOpen] = React.useState(false);

  return (
    <>
      <div
        onClick={() => setIsDetailsOpen(true)}
        className="w-fit min-w-fit flex items-center gap-1 cursor-pointer"
      >
        <div
          className="h-8 px-2 bg-sec-bg centralize"
          style={{ width: 300, minWidth: 300 }}
        >
          <p className="text-[11px]">{record.id}</p>
        </div>

        <div
          className="h-8 px-2 bg-sec-bg centralize"
          style={{ width: 200, minWidth: 200 }}
        >
          <p className="text-[11px]">
            {formatDateTimeFromISO(record.createdAt)}
          </p>
        </div>

        <div
          className="h-8 px-2 bg-sec-bg centralize"
          style={{ width: 150, minWidth: 150 }}
        >
          <p className="text-[11px]">$ {formatCurrency(record.amount)}</p>
        </div>

        <div
          className="h-8 px-2 bg-sec-bg centralize"
          style={{ width: 150, minWidth: 150 }}
        >
          <p className="text-[11px] truncate">{record.status}</p>
        </div>

        <div
          className="h-8 px-2 bg-sec-bg centralize"
          style={{ width: 180, minWidth: 180 }}
        >
          <p className="text-[11px]">{record.paymentMethod}</p>
        </div>

        <div
          className="h-8 px-2 bg-sec-bg centralize"
          style={{ width: 300, minWidth: 300 }}
        >
          <p className="text-[11px]">{record.bookingId}</p>
        </div>
      </div>

      {isDetailsOpen && (
        <div className="w-full h-full fixed top-0 left-0 z-50 bg-pri-bg/80 centralize p-4">
          <div
            onClick={() => setIsDetailsOpen(false)}
            className="absolute -z-1 w-full h-full"
          ></div>

          <div className="w-full max-w-135 h-fit bg-card-bg flex flex-col gap-4">
            <div className="p-4">
              <p className="text-sec-gold text-center">
                Blacarklimo Chauffuer Services
              </p>
              <h4 className="text-center">Transaction Receipt</h4>
            </div>

            <div className="w-full flex flex-col flex-1 gap-4 px-4 pb-4 sm:px-6 sm:pb-6 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-sec-text">
              {/**SUMMARY */}
              <ul className="w-full p-4 rounded-2xl bg-sec-bg space-y-2">
                {/**TRANSACTION ORDER */}
                <li className="w-full flex items-center justify-between gap-4">
                  <p className="text-sec-text">Transaction ID</p>

                  <p className="text-pri-text font-medium uppercase">
                    {record.id}
                  </p>
                </li>

                <li className="w-full flex items-center justify-between gap-4">
                  <p className="text-sec-text">Booking ID</p>

                  <p className="text-pri-text font-medium uppercase">
                    {record.bookingId}
                  </p>
                </li>

                <li className="w-full flex items-center justify-between gap-4">
                  <p className="text-sec-text">Date</p>

                  <p className="text-pri-text font-medium uppercase">
                    {formatDateTimeFromISO(record.createdAt)}
                  </p>
                </li>

                <li className="w-full flex items-center justify-between gap-4">
                  <p className="text-sec-text">Status</p>

                  <p className="text-pri-text font-medium uppercase">
                    {record.status}
                  </p>
                </li>

                <li className="w-full flex items-center justify-between gap-4">
                  <p className="text-sec-text">Payment Method</p>

                  <p className="text-pri-text font-medium uppercase">
                    {record.paymentMethod}
                  </p>
                </li>

                <li className="w-full flex items-center justify-between gap-4 pt-2 border-t border-dashed border-dim-text">
                  <h4 className="font-medium text-sec-text">Amount</h4>

                  <h4 className="font-medium text-sec-gold">
                    $ {formatCurrency(record.amount)}
                  </h4>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const ManageDiscountModal = ({ onClose }: ManageDiscountModalProps) => {
  //--states
  const [isFixedPrice, setIsFixedPrice] = React.useState(false);
  const [value, setValue] = React.useState<number>(0);
  const [isCreating, setIsCreating] = React.useState(false);
  const [isFetching, setIsFetching] = React.useState(false);
  const [isDeletingId, setIsDeletingId] = React.useState("");
  const [error, setError] = React.useState("");

  const [discountCodes, setDiscountCodes] = React.useState<
    DiscountRecordType[]
  >([]);

  //--variables

  //--functions
  async function createDiscountCode() {
    if (!value) return;

    setError("");
    setIsCreating(true);

    try {
      const response = await fetch("/api/discount/codes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          value: Number(value),
          isFixedPrice,
        }),
      });
      const data = await response.json();

      if (!response.ok || !data?.success) {
        setError(data?.message ?? "Something went wrong");
        return;
      }

      toast.success("Discount code created");
      setDiscountCodes((prev) => [data.data?.discount, ...prev]);
      setValue(0);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsCreating(false);
    }
  }

  async function fetchDiscountCodes() {
    setError("");
    setIsFetching(true);

    try {
      const response = await fetch("/api/discount/codes");
      const data = await response.json();

      if (!response.ok || !data?.success) {
        setError(data?.message ?? "Something went wrong");
        return;
      }

      setDiscountCodes(data.data?.discounts);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsFetching(false);
    }
  }

  async function deleteDiscountCode(id: string) {
    if (!id) return;

    setError("");
    setIsDeletingId(id);

    try {
      const response = await fetch(`/api/discount/codes/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data?.message ?? "Something went wrong");
        return;
      }

      toast.success("Discount code deleted");
      setDiscountCodes((prev) => prev.filter((discount) => discount.id !== id));
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsDeletingId("");
    }
  }

  async function copyText(text: string) {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }

      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";

      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();

      const successful = document?.execCommand("copy");

      document.body.removeChild(textarea);

      toast.success("Copied Successfully");
      return successful;
    } catch (error) {
      toast.error(
        error instanceof Error ? error?.message : "Something went wrong",
      );
      return false;
    }
  }

  React.useEffect(() => {
    const updateDiscountCodes = async () => await fetchDiscountCodes();
    updateDiscountCodes();
  }, []);

  return (
    <div className="w-full h-full absolute z-50 top-0 left-0 centralize max-sm:items-end bg-pri-bg/80">
      <div
        onClick={onClose}
        className="w-full h-full -z-1 absolute top-0 left-0"
      />

      <div className="w-full max-w-120 p-4 sm:p-6 sm:rounded-2xl bg-card-bg space-y-4">
        <div className="w-full pb-2 border-b border-b-dim-text">
          <h4 className="text-[13px]">Manage Discount Codes</h4>
        </div>

        <div className="w-full h-60 max-h-60 overflow-y-auto space-y-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-sec-text">
          {isFetching ? (
            <div className="w-full h-full centralize">
              <div className="w-12 h-12 rounded-full border-2 border-b-0 border-r-0 border-sec-text animate-spin" />
            </div>
          ) : (
            <>
              {Boolean(discountCodes?.length) ? (
                discountCodes?.map((discount, _) => (
                  <div
                    key={discount.id}
                    className="w-full flex items-center gap-2"
                  >
                    <div className="flex flex-1 flex-col gap-0.5">
                      <div className="flex items-center gap-2">
                        <p>
                          Code:{" "}
                          <span className="font-semibold text-pri-text">
                            {discount.code}
                          </span>
                        </p>

                        <button onClick={() => copyText(discount.code)}>
                          <Copy
                            size={13}
                            strokeWidth={1.8}
                            className="text-pri-text"
                          />
                        </button>
                      </div>
                      <p>
                        Value: -{" "}
                        <span className="font-semibold text-pri-text">
                          {discount.value}
                          {discount.isFixedPrice ? " USD" : "%"}
                        </span>
                      </p>
                    </div>

                    <button
                      onClick={() => deleteDiscountCode(discount.id)}
                      className="w-6 h-6"
                    >
                      {isDeletingId === discount.id ? (
                        <div className="w-4.5 h-4.5 rounded-full border-2 border-b-0 border-r-0 border-red-400 animate-spin" />
                      ) : (
                        <Trash2
                          size={16}
                          strokeWidth={1.3}
                          className="text-red-400"
                        />
                      )}
                    </button>
                  </div>
                ))
              ) : (
                <div className="w-full h-full centralize flex-col gap-6">
                  <CircleSlash2
                    size={64}
                    strokeWidth={0.5}
                    className="text-sec-text"
                  />

                  <div className="space-y-1">
                    <p className="text-center font-semibold">
                      {error
                        ? "Oops! Something Went Wrong"
                        : "No Discount Found"}
                    </p>
                    <p className="text-center text-[10px] text-dim-text">
                      {error
                        ? error
                        : `It seems there were no discount codes found.`}
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div className="w-full space-y-4">
          <div className="w-full h-10 px-4 flex items-center gap-1 bg-pri-bg rounded-lg border border-dim-text">
            <div>
              <p className="font-medium text-pri-text">-</p>
            </div>

            <div className="h-full flex flex-1">
              <input
                type="number"
                placeholder={
                  isFixedPrice ? "Amount to discount" : "Discount percentage"
                }
                className="w-full h-full text-sm text-right text-pri-text placeholder:text-dim-text [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
              />
            </div>

            <div>
              <p className="font-medium text-pri-text">
                {isFixedPrice ? "USD" : "%"}
              </p>
            </div>
          </div>

          <div className="w-full flex items-center justify-between gap-4">
            <p>Set Fixed Discount Price</p>
            <ToggleSwitch
              id="fixed"
              status={isFixedPrice}
              onStatusChange={setIsFixedPrice}
            />
          </div>

          <button
            onClick={() => createDiscountCode()}
            className="w-full h-11 rounded-full bg-pri-text"
            disabled={isCreating}
          >
            <p className="text-pri-bg font-medium">Generate Code</p>
            {isCreating && (
              <div className="w-4 h-4 rounded-full border-pri-bg border-2 border-b-0 border-r-0 animate-spin" />
            )}
          </button>

          <button onClick={onClose} className="w-full">
            <p>Close</p>
          </button>
        </div>
      </div>
    </div>
  );
};

interface ManageDiscountModalProps {
  onClose: () => void;
}
