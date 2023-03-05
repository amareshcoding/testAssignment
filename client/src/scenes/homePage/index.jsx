import { Box, useMediaQuery } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from 'scenes/navbar';
import AdvertWidget from 'scenes/widgets/AdvertWidget';
import PostsWidget from 'scenes/widgets/PostsWidget';
import UserWidget from 'scenes/widgets/UserWidgets';

const HomePage = () => {
  const isNonMobileScreen = useMediaQuery('(min-width:1000px)');
  const { _id } = useSelector((state) => state.user);

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="1rem 6%"
        display={isNonMobileScreen ? 'flex' : 'block'}
        gap="0.5rem"
        justifyContent="space-between"
        position="sticky"
        zIndex={4}
      >
        {/* left */}
        <Box flexBasis={isNonMobileScreen ? '26%' : undefined}>
          <UserWidget userId={_id} />
        </Box>

        {/* middle */}
        <Box
          flexBasis={isNonMobileScreen ? '45%' : undefined}
          marginTop="-12px"
        >
          <PostsWidget userId={_id} />
        </Box>

        {/* right */}
        <Box flexBasis="26%">
          {isNonMobileScreen && (
            <Box style={{ position: 'sticky', top: 90, zIndex: 4 }}>
              <AdvertWidget />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
