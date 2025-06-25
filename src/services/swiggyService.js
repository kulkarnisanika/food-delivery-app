import axios from 'axios';

const getSwiggyRestaurantList = async (lat, lng) => {
  const url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch Swiggy data');
  const json = await res.json();
  return { cards: json?.data?.cards, csrfToken: json?.csrfToken, nextOffset: json?.data?.pageOffset?.nextOffset };
};

const fetchMoreRestaurants = async (payload) => {
  const res = await axios.post('http://localhost:5000/api/swiggy', payload);
  return res.data;
};

export {getSwiggyRestaurantList, fetchMoreRestaurants};