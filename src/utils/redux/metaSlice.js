import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  csrfToken: null,
  nextOffset: null,
};

const metaSlice = createSlice({
  name: "meta",
  initialState,
  reducers: {
    updateMeta: (state, action) => {
      state.csrfToken = action.payload.csrfToken;
      state.nextOffset = action.payload.nextOffset;
    },
  },
});

export const { updateMeta } = metaSlice.actions;
export default metaSlice.reducer;
