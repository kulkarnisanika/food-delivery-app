import { Box, Card, Grid, Stack, Typography } from '@mui/material'
import RestaurantCard from './RestaurantCard'

const RestaurantList = ({ data }) => {
    return (
        <Stack direction="column" spacing={3}>
            <Typography variant="h5" sx={{ fontWeight: "bold", fontFamily: "Gilroy", }} >Restaurants with online food delivery</Typography>
            <Grid container spacing={2} sm={1} md={2} lg={3} >
                {
                    data && data?.map((restaurant) => {
                        return (

                            <Grid item key={restaurant?.info?.id}>
                                <RestaurantCard cardData={restaurant?.info} />
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Stack>
    )
}

export default RestaurantList