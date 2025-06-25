import Header from './Header'
import { Box, Card, Divider, Stack } from '@mui/material'
import RestaurantList from './RestaurantList'
import { useDispatch, useSelector } from 'react-redux'
import ImageCarousel from './ImageCarousel'
import RestaurantCard from './RestaurantCard'
import { getSwiggyRestaurantList } from '../services/swiggyService'
import { parseAndDispatchSwiggyData } from '../logic/reduxController'
import axios from 'axios';
import { useEffect, useState } from 'react'


const FoodAppHome = () => {

    const [restaurantData, setRestaurantData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)
    const dispatch = useDispatch();

    const { restaurants: restaurantList, whatsOnYourMind, topRestaurants } = useSelector((store) => store);
    // const fetchMoreRestaurants = async () => {
    //     const url = 'https://www.swiggy.com/dapi/restaurants/list/update';

    //     const payload = {
    //         lat: '21.99740',
    //         lng: '79.00110',
    //         nextOffset: 'CJhlELQ4KIDg3NyVhJW2OjCnEzgC',
    //         widgetOffset: {
    //             NewListingView_category_bar_chicletranking_TwoRows: '',
    //             NewListingView_category_bar_chicletranking_TwoRows_Rendition: '',
    //             Restaurant_Group_WebView_SEO_PB_Theme: '',
    //             collectionV5RestaurantListWidget_SimRestoRelevance_food_seo: '9',
    //             inlineFacetFilter: '',
    //             restaurantCountWidget: '',
    //         },
    //         filters: {},
    //         seoParams: {
    //             seoUrl: 'https://www.swiggy.com/restaurants',
    //             pageType: 'FOOD_HOMEPAGE',
    //             apiName: 'FoodHomePage',
    //             businessLine: 'FOOD',
    //         },
    //         page_type: 'DESKTOP_WEB_LISTING',
    //         _csrf: csrfToken,
    //     };

    //     try {
    //         const res = await axios.post('http://localhost:5000/api/swiggy', payload);
    //         return response.data;
    //     } catch (error) {
    //         console.error('POST error:', error);
    //     }
    // };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                const response = await getSwiggyRestaurantList(21.99740, 79.00110);
                setRestaurantData(response);
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
        parseAndDispatchSwiggyData(restaurantData, dispatch);
    }, [restaurantData])

    const images = whatsOnYourMind?.map((item) => `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${item?.imageId}`)

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
                                <RestaurantCard cardData={restaurant?.info} />
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