import  { useRef } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Stack,
  Card,
  CardMedia,
} from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

const ImageSlider = ({ items, title, renderItem }) => {
  const scrollRef = useRef();

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = 300;
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Header with Title + Arrows */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', fontFamily: 'Gilroy' }}>
          {title}
        </Typography>
        <Box>
          <IconButton onClick={() => scroll('left')}>
            <ArrowBackIos fontSize="small" />
          </IconButton>
          <IconButton onClick={() => scroll('right')}>
            <ArrowForwardIos fontSize="small" />
          </IconButton>
        </Box>
      </Stack>

      {/* Scrollable Row */}
      <Box
        ref={scrollRef}
        sx={{
          display: 'flex',
          gap: 2,
          overflowX: 'scroll',
          scrollBehavior: 'smooth',
          pb: 1,
          '&::-webkit-scrollbar': { display: 'none' },
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        }}
      >
        {items?.map((item, i) => (
          <Box key={i} sx={{ flexShrink: 0 }}>
            {renderItem ? (
              renderItem(item, i) // use custom renderer
            ) : (
              <Card sx={{ maxWidth: 200 }} elevation={0}>
                <CardMedia
                  component="img"
                  image={item}
                  alt={`item-${i}`}
                  sx={{ maxHeight: 360, objectFit: 'cover' }}
                />
              </Card>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ImageSlider;
