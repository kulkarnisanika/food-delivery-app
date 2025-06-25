import { useDispatch } from "react-redux";
import { addRestaurants } from "../utils/redux/restaurantsSlice";
import { addTopRestaurants } from "../utils/redux/topRestaurantsSlice";
import { addWhatsOnYourMind } from "../utils/redux/whatsOnYourMindSlice";
import { updateMeta } from "../utils/redux/metaSlice";



const parseAndDispatchSwiggyData = (cards,dispatch) => {
  console.log("cards-->",cards)
  cards?.cards?.forEach((card) => {
    const id = card?.card?.card?.id;
    const data = card?.card?.card?.gridElements?.infoWithStyle;

    if (!id || !data) return;

    if (id === 'restaurant_grid_listing_v2') {
      dispatch(addRestaurants(data.restaurants));
    }

    if (id === 'top_brands_for_you') {
      dispatch(addTopRestaurants(data.restaurants));
    }

    if (id === 'whats_on_your_mind') {
      dispatch(addWhatsOnYourMind(data.info));
    }
  });

  dispatch(updateMeta({
    csrfToken: cards?.csrfToken,
    nextOffset: cards?.nextOffset
  }));
};

export {parseAndDispatchSwiggyData};
