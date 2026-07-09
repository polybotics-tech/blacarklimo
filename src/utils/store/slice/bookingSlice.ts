import { BookingFormType } from "@/src/libs/types";
import { getLocalDateTimeString } from "@/src/utils/datetime";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type BookingSliceStateType = BookingFormType & {
  pendingOrderId: null | string;
};

const initialState: BookingSliceStateType = {
  tripChoice: "point-to-point",

  vehicle: null,
  numOfPassenger: 1,

  pickupLocation: null,
  dropoffLocation: null,
  isRoundTrip: false,

  datetime: getLocalDateTimeString(),

  extraStops: [],

  fullname: "",
  email: "",
  phone: "",
  message: "",

  pendingOrderId: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    __Action_updateBookingForm: (
      state,
      action: PayloadAction<Partial<BookingSliceStateType>>,
    ) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { __Action_updateBookingForm } = bookingSlice.actions;

export default bookingSlice;
