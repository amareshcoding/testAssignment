import React, { useState } from 'react';
import { Button, Divider, InputBase, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import FlexBetween from 'components/FlexBetween';
import UserImage from 'components/UserImage';
import WidgetWrapper from 'components/WidgetWrapper';
import { setPosts } from 'store';
import { Box } from '@mui/system';
import { backUri } from 'utils';

const MyPostWidget = () => {
  const dispatch = useDispatch();
  const [post, setPost] = useState('');
  const token = useSelector((state) => state.token);
  const { palette } = useTheme();

  const handlePost = async () => {
    const response = await fetch(`${backUri}/post`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content: post }),
    });
    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setPost('');
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: '100%',
            backgroundColor: palette.neutral.light,
            borderRadius: '2rem',
            padding: '1rem 2rem',
          }}
        />
      </FlexBetween>

      <Divider sx={{ margin: '1.25rem 0' }} />

      <Box display="flex" justifyContent="right">
        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            // color: palette.background.alt,
            color: 'black',
            backgroundColor: palette.primary.main,
            borderRadius: '3rem',
          }}
        >
          POST
        </Button>
      </Box>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
