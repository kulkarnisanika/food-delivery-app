import { Box } from '@mui/material'
import React from 'react'
import { IMG_URL } from "../utils/appConstants"

const Logo = () => {

    const { LOGO_URL } = IMG_URL;
    console.log(LOGO_URL)
    return (
        <Box
            sx={{
                width: 50,
                height: 50,
                borderRadius: 1,
                backgroundImage: `url(${LOGO_URL})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}
        />

    )
}

export default Logo