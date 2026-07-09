import { AdminStateType } from "@/src/libs/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AdminStateType = {
  accessToken: null,
  isLogged: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    __Action_updateAdmin: (
      state,
      action: PayloadAction<Partial<AdminStateType>>,
    ) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { __Action_updateAdmin } = adminSlice.actions;

export default adminSlice;
