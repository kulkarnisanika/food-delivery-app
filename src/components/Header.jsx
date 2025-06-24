import { Box, Button, Grid, Stack } from '@mui/material'
import React from 'react'
import Logo from './Logo'

const Header = () => {
  return (
    <Box
      sx={{
        position: 'sticky',
        backgroundColor: 'white',
        boxShadow: '0px 4px 6px -2px rgba(0,0,0,0.1)',
        padding: 2,
      }}
    >
      <Grid container >
        <Grid item size={4} display="flex" justifyContent="flex-start" alignItems="center">
          <Logo />
        </Grid>
        <Grid item size={8} display="flex" justifyContent="flex-end" alignItems="center">
          <Stack direction="row" spacing={3}>
            <Button>Home</Button>
            <Button>Restaurants</Button>
            <Button>Cart</Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Header