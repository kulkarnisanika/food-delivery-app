import React, { useEffect, useReducer, useState } from 'react'
import Header from './Header'
import { Box, Card, Grid, Stack } from '@mui/material'
import RestaurantList from './RestaurantList'
import { useDispatch, useSelector } from 'react-redux'
import { addRestaurants } from '../utils/redux/restaurantsSlice'


const FoodAppHome = () => {

    const [restaurantData, setRestaurantData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)

    const dispatch = useDispatch();
    const restaurantList = useSelector((store) => store?.restaurants);

    const getSwiggyRestaurantList = async (lat, lng) => {

        const url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch Swiggy data');
        const json = await res.json();
        console.log("json", json)
        return json?.data?.cards;
    }

    const setSwiggyData = (data) => {

        data?.forEach((restaurant) => {

            if (restaurant?.card?.card?.id === "restaurant_grid_listing_v2") {
                let restaurantList = restaurant?.card?.card?.gridElements?.infoWithStyle?.restaurants;
                dispatch(addRestaurants(restaurantList))
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
                    
                        <Grid container justifyContent="center" alignItems="center" sx={{ margin: 0, width: '100%' }}>
                            {isLoading ? <h1>Loading....</h1> :
                        !!error ? <h1>{error?.message}</h1> :
                            <RestaurantList data={restaurantList} />
                    } 
                        </Grid>
                    
                
                </Card>

            </Stack>
        </Box>
    )
}

export default FoodAppHome