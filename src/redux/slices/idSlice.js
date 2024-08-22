import { createSlice } from "@reduxjs/toolkit";

export const idSlice = createSlice({
  name: "id",
  initialState: {
    value: null,
  },
  reducers: {
    assignId: (state, action) => {
      state.value = action.payload;
    },
    deleteId: (state) => {
      state.value = null;
    },
  },
});

export const { assignId, deleteId } = idSlice.actions;

export default idSlice.reducer;
