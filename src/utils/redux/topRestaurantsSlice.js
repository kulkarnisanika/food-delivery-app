import { createSlice } from "@reduxjs/toolkit";

const topRestaurantsSlice = createSlice({
    name:"topRestaurants",
    initialState: [],
    reducers: ({
        addTopRestaurants: (state,action) => {
            return action.payload;
        }
    })
});

export const {addTopRestaurants} = topRestaurantsSlice.actions;
export default topRestaurantsSlice.reducer;