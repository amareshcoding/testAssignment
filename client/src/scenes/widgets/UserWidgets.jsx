import React from 'react';
import { ManageAccountsOutlined, EditOutlined } from '@mui/icons-material';
import { Box, Divider, Typography, useTheme } from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import UserImage from 'components/UserImage';
import WidgetWrapper from 'components/WidgetWrapper';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserWidget = ({ userId }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  if (!user) {
    return null;
  }

  const { firstName, lastName, occupation, email } = user;
  return (
    <WidgetWrapper style={{ position: 'sticky', top: 0, zIndex: 4 }}>
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        {/* First Row */}
        <FlexBetween gap="1rem">
          <UserImage />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                '&:hover': {
                  color: palette.primary.light,
                  cursor: 'pointer',
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{occupation} </Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>
      <Divider />

      {/* Second Row */}
      <Box p="1rem 0">
        <Box display="flex" flexDirection="column" gap="0.1rem">
          <Typography color={medium}>Email</Typography>
          <Typography color={medium}>{email}</Typography>
        </Box>
      </Box>
      <Divider />
      {/* Third Row */}

      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}> Who's viewed your profile</Typography>
          <Typography color={main} fontWeight="500">
            {375}
          </Typography>
        </FlexBetween>
        <FlexBetween mb="0.5rem">
          <Typography color={medium}> Impressions of your post</Typography>
          <Typography color={main} fontWeight="500">
            {524}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}> Friends</Typography>
          <Typography color={main} fontWeight="500">
            10
          </Typography>
        </FlexBetween>
      </Box>
      <Divider />

      {/* Fourth Row */}
      <Box p="1rem 0">
        <Typography color={main} fontSize="1rem" fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="../assets/twitter.png" alt="twitter" />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src="../assets/linkedin.png" alt="linkedin" />
            <Box>
              <Typography color={main} fontWeight="500">
                LinkedIn
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
