import { configureStore } from "@reduxjs/toolkit";
import restaurantReducer  from "./restaurantsSlice"
const appStore = configureStore({
    reducer: {
        restaurants: restaurantReducer
    },
});

export default appStore;