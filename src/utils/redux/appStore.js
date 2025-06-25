import { configureStore } from "@reduxjs/toolkit";
import restaurantReducer  from "./restaurantsSlice"
import whatsOnYourMindReducer from "./whatsOnYourMindSlice"
import topRestaurantsReducer from "./topRestaurantsSlice"
import metaSliceReducer from "./metaSlice"

const appStore = configureStore({
    reducer: {
        whatsOnYourMind: whatsOnYourMindReducer,
        topRestaurants: topRestaurantsReducer,
        metaData: metaSliceReducer,
        restaurants: restaurantReducer
    },
});

export default appStore;