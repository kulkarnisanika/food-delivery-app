import { createSlice } from "@reduxjs/toolkit";

const restaurantSlice = createSlice({
    name: "restaurants",
    initialState: [],
    reducers: {
        addRestaurants: (state, action) => {
            return action.payload;
        }
    }

})

export const { addRestaurants } = restaurantSlice.actions
export default restaurantSlice.reducer;