import React, { useEffect, useState } from 'react'
import Header from './Header'
import { Box, Card, Divider, Stack } from '@mui/material'
import RestaurantList from './RestaurantList'
import { useDispatch, useSelector } from 'react-redux'
import { addRestaurants } from '../utils/redux/restaurantsSlice'
import { addWhatsOnYourMind } from '../utils/redux/whatsOnYourMindSlice'
import ImageCarousel from './ImageCarousel'
import { addTopRestaurants } from '../utils/redux/topRestaurantsSlice'
import RestaurantCard from './RestaurantCard'

const FoodAppHome = () => {

    const [restaurantData, setRestaurantData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)

    const dispatch = useDispatch();
    const restaurantList = useSelector((store) => store?.restaurants);
    const whatsOnYourMind = useSelector((store) => store?.whatsOnYourMind);
    const topRestaurants = useSelector((store) => store?.topRestaurants);

    const images = whatsOnYourMind?.map((item) => `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${item?.imageId}`)
    const getSwiggyRestaurantList = async (lat, lng) => {

        const url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch Swiggy data');
        const json = await res.json();
        return json?.data?.cards;
    }

    const setSwiggyData = (data) => {

        data?.forEach((restaurant) => {


            if (restaurant?.card?.card?.id === "restaurant_grid_listing_v2") {
                let restaurantList = restaurant?.card?.card?.gridElements?.infoWithStyle?.restaurants;
                dispatch(addRestaurants(restaurantList))
            }
            if (restaurant?.card?.card?.id === "top_brands_for_you") {
                let restaurantList = restaurant?.card?.card?.gridElements?.infoWithStyle?.restaurants;
                dispatch(addTopRestaurants(restaurantList))
            }
            if (restaurant?.card?.card?.id === "whats_on_your_mind") {
                let dishes = restaurant?.card?.card?.gridElements?.infoWithStyle?.info;
                dispatch(addWhatsOnYourMind(dishes))
            }

        })

    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                const response = await getSwiggyRestaurantList(21.99740, 79.00110);
                setRestaurantData(response)
            }
            catch (e) {
                setError(e)
            }
            finally {
                setIsLoading(false)
            }
        }
        fetchData();
    }, []);



    useEffect(() => {
        setSwiggyData(restaurantData);
    }, [restaurantData])

    return (
        <Box padding={0.5}>
            <Stack display="flex" spacing={3}>
                <Header />
                <Card elevation={2} sx={{ padding: 2 }}>
                    <Stack spacing={3} divider={
                        <Divider orientation="horizontal" flexItem>
                        </Divider>
                    }>
                        <ImageCarousel items={images} title={"What's on your mind?"} />
                        <ImageCarousel
                            title="Top Restaurants"
                            items={topRestaurants}
                            renderItem={(restaurant, index) => (
                                <RestaurantCard cardData={restaurant?.info}/>
                            )}
                        />
                        {isLoading ? <h1>Loading....</h1> :
                            !!error ? <h1>{error?.message}</h1> :
                                <RestaurantList data={restaurantList} />

                        }
                    </Stack>
                </Card>
            </Stack>
        </Box>
    )
}

export default FoodAppHome