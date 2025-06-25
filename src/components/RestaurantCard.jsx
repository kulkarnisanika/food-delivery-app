import {  Card, CardActionArea, CardContent, CardMedia, Divider, IconButton, Stack, Typography } from '@mui/material'
import StarBorderIcon from '@mui/icons-material/StarBorder';

const RestaurantCard = ({ cardData }) => {

    const { avgRatingString, name, cuisines, isOpen, sla: { deliveryTime, slaString }, veg, cloudinaryImageId } = cardData;
    return (
        <div>
            <Card elevation={0} sx={{ width: 350 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="150"
                        image={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cloudinaryImageId}`}
                        alt="green iguana"
                        sx={{
                            borderRadius: 3
                        }}
                    />
                    <CardContent>
                        <Stack>
                            <Stack>
                                <Typography variant='h6' sx={{ fontWeight: "bold", fontFamily: "Gilroy" }} >{name}</Typography>
                                <Stack direction="row" sx={{ alignItems: "center" }} divider={
                                    <Divider orientation="vertical" flexItem>
                                        <span>•</span>
                                    </Divider>
                                }>
                                    {avgRatingString !== "--" &&
                                        (
                                            <>
                                                <IconButton
                                                    sx={{
                                                        backgroundColor: 'green',     // light green bg
                                                        borderRadius: '50%',            // makes it circular
                                                        padding: 0.3,                     // size control
                                                        '&:hover': {
                                                            backgroundColor: '#c2efd4',   // hover effect
                                                        },
                                                    }}
                                                >
                                                    <StarBorderIcon sx={{ color: "white" }} />
                                                </IconButton>
                                                <Typography variant='h6' sx={{ fontWeight: "500", fontFamily: "Gilroy", paddingLeft: "4px" }}>{avgRatingString}</Typography>
                                            </>
                                        )
                                    }
                                    <Typography variant='h6' sx={{ fontWeight: "bold", fontFamily: "Gilroy" }}>{slaString}</Typography>
                                </Stack>
                            </Stack>
                            <Typography variant="body1" sx={{ color: "text.secondary", fontFamily: "Gilroy" }}>{cuisines?.join(", ")}</Typography>
                        </Stack>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    )
}

export default RestaurantCard