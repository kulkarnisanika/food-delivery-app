import { createSlice } from "@reduxjs/toolkit";

const whatsOnYourMindSlice = createSlice({
    name: "whatsOnYourMind",
    initialState: [],
    reducers: {
        addWhatsOnYourMind: (state, action) => {
            return action.payload;
        }
    }

})

export const { addWhatsOnYourMind } = whatsOnYourMindSlice.actions
export default whatsOnYourMindSlice.reducer;