import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Typography, useTheme } from '@mui/material';
import WidgetWrapper from 'components/WidgetWrapper';
import FlexBetween from 'components/FlexBetween';
import { items } from 'utils';

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
 
  return (
    <Carousel>
      {items.map((item, i) => {
        return (
          <WidgetWrapper key={ `${i}-post-Ad`}>
            <FlexBetween>
              <Typography color={dark} variant="h5" fontWeight="500">
                Sponsored
              </Typography>
              <Typography color={medium}>Remove Ad</Typography>
            </FlexBetween>
            <img
              width="100%"
              height="auto"
              src={item.image}
              alt="Advert"
              style={{ borderRadius: '0.75rem', margin: '0.75rem 0' }}
            />
            <FlexBetween>
              <Typography color={main}>{item.name}</Typography>
              <Typography color={medium}>{item.email}</Typography>
            </FlexBetween>

            <Typography color={medium} m="0.5rem 0">
              {item.description}
            </Typography>
          </WidgetWrapper>
        );
      })}
    </Carousel>
  );
};

export default AdvertWidget;
