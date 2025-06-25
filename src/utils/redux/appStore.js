import { configureStore } from "@reduxjs/toolkit";
import restaurantReducer  from "./restaurantsSlice"
import whatsOnYourMindReducer from "./whatsOnYourMindSlice"
import topRestaurantsReducer from "./topRestaurantsSlice"

const appStore = configureStore({
    reducer: {
        whatsOnYourMind: whatsOnYourMindReducer,
        topRestaurants: topRestaurantsReducer,
        restaurants: restaurantReducer
    },
});

export default appStore;