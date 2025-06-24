import { configureStore } from "@reduxjs/toolkit";
import restaurantReducer  from "./restaurantsSlice"
import whatsOnYourMindReducer from "./whatsOnYourMindSlice"

const appStore = configureStore({
    reducer: {
        whatsOnYourMind: whatsOnYourMindReducer,
        restaurants: restaurantReducer
    },
});

export default appStore;